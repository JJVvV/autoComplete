/**
 * Created by AlexLiu on 12/18/15.
 */


const rsubmittable = /input|select|textarea/i;
const rsubmitterTypes = /button|submit|file|image|reset/i;
const rcheckedTypes = /checkbox|radio/i;

const makeArray = (likeArray) =>{
    if('length' in likeArray && typeof likeArray === 'object'){
        return Array.prototype.slice.call(likeArray);
    }
    return [];
}

const seri = (name, value) => {
    return encodeURIComponent(name + '=' + value);
}

const getVal = (elem) => {
    if(elem.nodeName.toUpperCase() === 'SELECT'){
        return makeArray(elem.selectedOptions).map(function(item){
            return item.value || item.textContent || item.innerText;
        });
    }

    return elem.value;
}


const serialize = function(ele){
    if(isPlainObject(ele)){
        var vArr = [];
        for(var p in ele){
            if(ele.hasOwnProperty(p)){
                vArr.push(encodeURIComponent(p) + '=' + encodeURIComponent(ele[p]));
            }
        }
        if(vArr.length){
            return vArr.join('&');
        }
        return null;
    }
    var elements = makeArray(ele.elements);
    var res = [];
    elements = elements.filter(function(item){
        var type = item.type;
        return item.name &&
            !item.disabled &&
            rsubmittable.test(item.nodeName) &&
            !rsubmitterTypes.test(item.type) &&
            (item.checked || !rcheckedTypes.test(item.type))

    });

    elements.forEach(function(elem, i){
        var val = getVal(elem);
        var name = elem.name;
        if(Array.isArray(val)){
            for(var i=0; i<val.length; i++){
                res.push(seri(name, val[i]));
            }
        }else{
            res.push(seri(name, val));
        }
    });

    return res.join('&');


}

export default serialize;





