/**
 * Created by AlexLiu on 12/18/15.
 */



export default class Event{
    constructor(){
        this.callbacks = {};
    }

    on(type, fn){
        if(!this.callbacks[type]) this.callbacks[type] = [];
        this.callbacks[type].push(fn);

        return this;
    }

    trigger(type, data){
        var callbacks = this.callbacks[type];
        if(callbacks){
            for(var i =0, len=callbacks.length; i<len; i++){
                typeof callbacks[i] === 'function' && callbacks[i].call(this, data);
            }
        }

        return this;
    }

    off(type, handler){
        if(handler === undefined){
            delete this.callbacks[type];
        }else {
            for(var i= 0, len=callbacks.length; i<len; i++){
                if(callbacks[i] === handler){
                    callbacks.splice(1, i);
                    return this;
                }
            }

            return this;
        }

    }

    once(type, fn){
        var that = this;
        var wrapper = function(){
            fn.apply(that, arguments);
            that.off(type, wrapper);
        }

        this.on(type, wrapper);
    }
}