
import path from 'path'
// @ts-ignore
import stackTrace from 'stack-trace'
import chalk from 'chalk'
import { __legacy__objectToArray } from '../src'

interface Obj {
    data: any,
    params: any,
    stackTraceParams: any
}

interface optStack {
    activeColor: boolean,
    line: boolean,
    method: boolean,
    file: boolean,
    time: boolean,
}

interface opt {
    color: string,
    type: string
}

export default <obj extends Readonly<Obj>>(data: obj["data"], params?: obj["params"], stackTraceParams?: obj["stackTraceParams"]) => {
    let initData;
    initData = data

    let opt = <opt>{
        color: "green",
        type: "log"
    }
    let optStackTrace = <optStack>{
        line: false,
        method: true,
        file: false,
        time: true
    }

    const frame = stackTrace.get()[1]

    const stackTraceData = {
        time: new Date().toLocaleTimeString(),
        line: `(:${frame.getLineNumber()})`,
        file: path.basename(frame.getFileName()),
        method: `[${frame.getFunctionName()}]`
    }

    if (typeof (params) !== "undefined" || params != null) {
        // @ts-ignore
        __legacy__objectToArray(params).forEach((e: any) => {
            if (typeof (e.value) !== "undefined") {
                // @ts-ignore
                opt[e.key] = e.value
            }
        })
    }

    if (typeof (stackTraceParams) !== "undefined" || stackTraceParams != null) {
        // @ts-ignore
        __legacy__objectToArray(stackTraceParams).forEach((e: any) => {
            if (typeof (e.value) !== "undefined") {
                // @ts-ignore
                optStackTrace[e.key] = e.value
            }
        })
    }

    const stackTraceKeys = Object.keys(optStackTrace)
    const stackTraceLength = stackTraceKeys.length
    let modifyCount = 0
    let tmp

    for (let i = 0; i < stackTraceLength; i++) {
        const key = stackTraceKeys[i]
        // @ts-ignore
        const value = optStackTrace[stackTraceKeys[i]]
        const divisor = (i == (stackTraceLength - 1) ? " | " : " > ")
        // console.log(`[${key}] is the ${i == stackTraceLength? "last opt" : `n[${i}]` }`)
        // console.log(i, "/", stackTraceLength -1)
        // @ts-ignore
        if (typeof (stackTraceData[key]) !== "undefined" && value) {
            if (Array.isArray(initData)) {
                if (modifyCount == 0) {
                    // @ts-ignore
                    tmp = (chalk[opt.color](`${stackTraceData[key]}`) + divisor)
                } else {
                    // @ts-ignore
                    tmp = (chalk[opt.color](`${stackTraceData[key]}`) + divisor + tmp)
                }
                if (i == (stackTraceLength - 1)) {
                    data.unshift(tmp)
                }
            } else {
                // @ts-ignore
                data = (chalk[opt.color](`${stackTraceData[key]}`) + divisor + data)
            }
            modifyCount++
        }
    }

    if (Array.isArray(data)) {
        // @ts-ignore
        return console[opt.type](...data)
    }
    // @ts-ignore
    return console[opt.type](data)
}
