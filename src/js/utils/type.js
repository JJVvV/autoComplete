/**
 * Created by AlexLiu on 12/18/15.
 */

const isType = (type) =>{
    return (obj) =>{
        return Object.prototype.toString.call(obj) === '[object '+ type +']';
    }
}

export const isFunc = isType('Function');
export const isObj = isType('Object');
export const isBool = isType('Boolean');
export const isArr = isType('Array');

export const isPlainObject = (obj) =>{
    if(!isObj(obj) || obj.nodeType || isWindow(obj)){
        return false;
    }

    if(obj.constructor && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')){
        return false;
    }

    return true;
}

export const isWindow = (obj) =>{
    return obj != null && obj.window === obj;
}






