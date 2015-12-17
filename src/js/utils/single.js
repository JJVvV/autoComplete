/**
 * Created by AlexLiu on 12/18/15.
 */



const single = (fn) => {
    var ret ;

    return function(){
        if(ret){
            return ret;
        }
        return ret = typeof fn === 'function' && fn.apply(this, arguments);
    }
}

export default single;