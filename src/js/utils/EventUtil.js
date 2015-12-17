/**
 * Created by AlexLiu on 12/18/15.
 */




const EventUtil = {
    getEvent: function(e){
        return e || window.event;
    },

    getTarget: function(e){
        return e.target || e.srcElement;
    },

    on: function(el, type, child, fn){
        if(typeof child === 'function'){
            fn = child;
        }

        if(el.addEventListener){
            var wrapper;
            if(arguments.length === 4){
                wrapper = function(e){
                    var target = e.target;
                    while(target !== el){
                        if(target.matches(child)){
                            fn.call(target, e);
                            break;
                        }
                        target = target.parentNode;
                    }

                }
            }else {
                wrapper = fn;
            }
            el.addEventListener(type, wrapper, false);

            return wrapper;
        }else if(el.attachEvent) {
            var wrapper;

            if(arguments.length === 4){
                wrapper = function(){
                    var event = window.event;
                    event.target = event.srcElement;
                    var target = event.target;
                    while(target !== el){
                        if(target.matches(child)){
                            fn.call(target, event);
                            break;
                        }
                        target = target.parentNode;
                    }

                }
            }else{
                wrapper = function(e){
                    var event = window.event;
                    event.target = event.srcElement;
                    fn.call(el, event);
                }
            }

            el.attachEvent('on' + type, wrapper);

            return wrapper;
        }
    },

    off: function(el, type, fn){
        if(el.addEventListener){
            el.removeEventListener(type, fn, false);
        }else if(el.attachEvent){
            el.detachEvent('on' + type, fn);
        }
    },

    preventDefault: function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else if('returnValue' in e){
            e.returnValue = false;
        }
    },

    stopPropagation: function(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else if('cancelBubble' in e){
            e.cancelBubble = true;
        }
    }
}

export default EventUtil;