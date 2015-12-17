/**
 * Created by AlexLiu on 12/9/15.
 */

import autoComplete from './js/autoComplete.js'
import _index from './js/utils/_index.js'


let autoInput = new autoComplete('#test', {
    handleData: function(data){
        var data = ['九月', '且听风吟', '傻子才悲伤', '她在睡梦中', '在希望的田野上'];
        return data;
    }
});

function onchoose(data){
    console.log(data);
}

function oncheck(data){
    console.log(data);
}
function onover(data){
    console.log(_index(data));
}
autoInput.
    on('choose', onchoose).
    on('over', onover);