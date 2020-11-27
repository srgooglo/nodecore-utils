import babel from '@babel/core'
import yParser from 'yargs-parser'
import { join, extname, sep } from 'path'
import { existsSync, statSync, readdirSync } from 'fs'
import assert from 'assert'
import { verbosity } from './index'
import slash from 'slash2'
import rimraf from 'rimraf'
import vfs from 'vinyl-fs'
import through from 'through2'
import chokidar from 'chokidar'

const cwd = process.cwd();

let pkgCount = Number;

function getBabelConfig(isBrowser, path) {
  const targets = isBrowser
    ? {
      browsers: ['last 2 versions', 'IE 10'],
    }
    : { node: 6 };
  return {
    presets: [
      [
        require.resolve('@babel/preset-typescript'),
        {},
      ],
      [
        require.resolve('@babel/preset-env'),
        {
          targets,
          ...(isBrowser ? { modules: false } : {}),
        },
      ],
      ...(isBrowser ? [require.resolve('@babel/preset-react')] : []),
    ],
    plugins: [
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-class-properties'),
    ],
  }
}

function addLastSlash(path:String) {
  return path.slice(-1) === '/' ? path : `${path}/`;
}

interface TransformTypes {
    content: any;
    path: any;
    pkg: any;
    root: any;
}

function transform(opts = {}) {
  const { content, path, pkg, root } = <TransformTypes> opts;
  assert(content, `opts.content should be supplied for transform()`);
  assert(path, `opts.path should be supplied for transform()`);
  assert(pkg, `opts.pkg should be supplied for transform()`);
  assert(root, `opts.root should be supplied for transform()`);
  assert(['.js', '.ts'].includes(extname(path)), `extname of opts.path should be .js, .ts or .tsx`);

  const { browserFiles } = pkg.umiTools || {};
  const isBrowser = browserFiles && browserFiles.includes(slash(path).replace(`${addLastSlash(slash(root))}`, ''));
  const babelConfig = getBabelConfig(isBrowser, path);
  verbosity(`transform > ${slash(path).replace(`${cwd}/`)} `)
  // @ts-expect-error
  return babel.transform(content, {
    ...babelConfig,
    filename: path,
  }).code;
}

interface BuildTypes {
    cwd: any;
    watch: any;
}

function build(dir, opts = {}) {
  const { cwd, watch } = <BuildTypes> opts;
  assert(dir.charAt(0) !== '/', `dir should be relative`);
  assert(cwd, `opts.cwd should be supplied`);

  const pkgPath = join(cwd, dir, 'package.json');
  assert(existsSync(pkgPath), 'package.json should exists');
  const pkg = require(pkgPath);
  const libDir = join(dir, 'lib');
  const srcDir = join(dir, 'src');

  // clean
  rimraf.sync(join(cwd, libDir));

  function createStream(src) {
    assert(typeof src === 'string', `src for createStream should be string`);
    return vfs
      .src([
        src,
        `!${join(srcDir, '**/fixtures/**/*')}`,
        `!${join(srcDir, '**/.umi/**/*')}`,
        `!${join(srcDir, '**/.umi-production/**/*')}`,
        `!${join(srcDir, '**/*.test.js')}`,
        `!${join(srcDir, '**/*.e2e.js')}`,
      ], {
        allowEmpty: true,
        base: srcDir,
      })
      .pipe(through.obj((f, env, cb) => {
        if (['.js', '.ts'].includes(extname(f.path)) && !f.path.includes(`${sep}templates${sep}`)) {
          f.contents = Buffer.from(
              // @ts-ignore
            transform({
              content: f.contents,
              path: f.path,
              pkg,
              root: join(cwd, dir),
            }),
          );
          f.path = f.path.replace(extname(f.path), '.js');
        }
        cb(null, f);
      }))
      .pipe(vfs.dest(libDir));
  }

  const stream = createStream(join(srcDir, '**/*'));
  stream.on('end', () => {
    // @ts-expect-error
    pkgCount -= 1;

    // @ts-expect-error
    if (pkgCount === 0 && process.send) {
      process.send('BUILD_COMPLETE');
    }
    // watch
    if (watch) {
      verbosity(`++ pending start watch > ${srcDir}`)
      const watcher = chokidar.watch(join(cwd, srcDir), {
        ignoreInitial: true,
      });
      watcher.on('all', (event, fullPath) => {
        const relPath = fullPath.replace(join(cwd, srcDir), '');
        verbosity(`** watch > [${event}] ${join(srcDir, relPath)}`)
        if (!existsSync(fullPath)) return;
        if (statSync(fullPath).isFile()) {
          createStream(fullPath);
        }
      });
    }
  });
}
// @ts-ignore
function isLerna(cwd) {
  return existsSync(join(cwd, 'lerna.json'));
}

// Init
const args = yParser(process.argv.slice(3));
const watch = args.w || args.watch;
if (isLerna(cwd)) {
  const dirs = readdirSync(join(cwd, 'packages'))
    .filter(dir => dir.charAt(0) !== '.');
        // @ts-expect-error

  pkgCount = dirs.length;
  dirs.forEach(pkg => {
    build(`./packages/${pkg}`, {
      cwd,
      watch,
    });
  });
} else {
        // @ts-expect-error

  pkgCount = 1;
  build('./', {
    cwd,
    watch,
  });
}