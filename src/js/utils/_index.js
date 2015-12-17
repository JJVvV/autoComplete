/**
 * Created by AlexLiu on 12/18/15.
 */


export default function index(el){
    var i = 0,
        pre;
    while(pre = el.previousSibling){
        if(pre.nodeType === 1){
            i++
        }
        el = pre;
    }
    return i;
}