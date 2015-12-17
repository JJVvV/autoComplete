/**
 * Created by AlexLiu on 12/18/15.
 */

import {isWindow, isPlainObject, isArr, isBool, isFunc, isObj} from './type.js'



export default function extend(){
    var args = arguments,
        i = 1,
        deep = false,
        target = args[0],
        length = args.length,
        p,
        clone,
        options,
        src,
        copyIsArray,
        copy;

    if(isBool(args[0])){
        deep = args[0];
        target = args[1];
        i++;
    }

    if(i === length){
        return args[0];
    }
    if(typeof target !== 'object' && !isFunc(target)){
        target = {}
    }
    for(; i<length; i++){
        if((options = args[i]) != null){
            for(p in options){
                src = target[p];
                copy = options[p];
                if(src === copy){
                    continue;
                }
                if(deep && copy && (isPlainObject(copy) || (copyIsArray = isArr(copy)))){
                    if(copyIsArray){
                        copyIsArray = false;
                        clone = src && isArr(src) ? src : [];
                    }else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[p] = extend(deep, clone, copy);
                }else {
                    target[p] = copy;
                }

            }
        }

    }

    return target;
}
