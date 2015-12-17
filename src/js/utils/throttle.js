/**
 * Created by AlexLiu on 12/18/15.
 */




const throttle = function(fn, firstTime, delay){
    if(typeof arguments[1] === 'number'){
        delay = firstTime;
    }

    if(firstTime === undefined || firstTime === null){
        firstTime = true;
    }

    if(delay === undefined){
        delay = 300;
    }

    var _timer;
    var _last;
    var args,
        _now;

    let done = function(){
        fn.apply(this, args);
        _last = _now;
        clearTimeout(_timer);
        _timer = null;
    }

    return function(){
        var that = this;
        args = arguments;
        _now = +new Date();

        if(firstTime){
            firstTime = false;
            fn.apply(this, args);
            return;
        }

        _last = _last || +new Date();

        if(delay*2 > _now - _last >= delay){
            done.apply(that, arguments);
            return;
        }

        if(_timer){
            return;
        }

        _timer = setTimeout(function(){
            done.apply(that, arguments);
        }, delay);
    }
}

export default throttle;