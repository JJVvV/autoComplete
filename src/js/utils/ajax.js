/**
 * Created by AlexLiu on 12/18/15.
 */


import extend from './extend.js'

ajax.defaultOptions = {
    type: 'get',
    success: function(){},
    fail: function(){},
    data: {}
}

export default function ajax(options){
    var res = null;

    var opt = extend({}, ajax.defaultOptions, options);
    if(!opt.url){
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(opt.type, opt.url, false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300 || status === 304){
                opt.success(xhr.responseText);
            }else{
                opt.fail(xhr.status);
//                    throw new Error('返回异常 ' + xhr.status);
            }
        }
    }

    if(opt.type === 'post'){
        res = serialize(opt.data);
    }

    xhr.send(res);
}



