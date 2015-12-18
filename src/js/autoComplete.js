/**
 * Created by AlexLiu on 12/18/15.
 */

import extend from './utils/extend.js'
import single from './utils/single.js'
import throttle from './utils/throttle.js'
import ajax from './utils/ajax.js'
import serialize from './utils/serialize.js'
import _index from './utils/_index.js'
import Event from './utils/Event.js'
import EventUtil from './utils/EventUtil.js'
import {isFunc} from './utils/type.js'

export default class AutoComplete extends Event{
    constructor(){
        super();

        this.init.apply(this, arguments);
    }

    init(input, options){
        if(typeof input === 'string') input = document.querySelector(input)
        if(!input) throw new Error('no input')

        this.input = input;
        this.options = extend({}, this.defaultOptions, options);
        this.data = this.options.data || [];
        this.activeIndex = -1;
        this._create();
        this._event();
    
    }

    _create(){
        this._singleList(this.data);
    }



    _position(){
        var target = this.input;
        var rect = target.getBoundingClientRect();
        var left = rect.left + window.pageXOffset;
        var top = rect.bottom + window.pageYOffset;

        this.list.style.left = left;
        this.list.style.top = top;
        this.list.style.width = getComputedStyle(target, null).width;
    }

    _hide(el){
        this.list.style.display = 'none';
    }

    _show(el){
        el.style.display = 'block';
    }

    _showList(){
        this._show(this.list);
    }

    _hideList(){
        this._hide(this.list);
    }

    _itemData(i){

        if(typeof i === 'object'){
            i = _index(i);
        }
        if(i == undefined) i = this.activeIndex;

        return this.data[i];
    }

    _event(){
        var that = this;
        EventUtil.on(this.input, 'click', function(e){
            e.stopPropagation();

            if(that.data.length){
                that._showList();
            }
        });
        EventUtil.on(this.list,'click', '.autocomplete-item', function(e){
            e.stopPropagation();
            that.activeIndex = _index(this);
            this.value = that._itemData();
            that._enter(this.value);

        });

        EventUtil.on(this.list, 'mouseover', '.autocomplete-item', function(e){
            var i = _index(this);
            if(i !== that.activeIndex){
                this.classList.add('active');
            }
            that.trigger('over', this);
        });

        EventUtil.on(this.list, 'mouseout', '.autocomplete-item', function(e){
            var i = _index(this);
            if(i !== that.activeIndex){
                this.classList.remove('active');
            }
            that.trigger('out', this);
        });

        EventUtil.on(this.list, 'mouseover', '.autocomplete-item', function(e){
            this.classList.add('active');
        });

        EventUtil.on(this.input, 'keydown', function(e){
            var keyCode = e.which || e.keyCode;

            switch (keyCode){
                case 38:
                    if(that.data.length === 0) return;
                    if(that.activeIndex === -1){
                        that.activeIndex = that.data.length - 1;
                    }else {
                        that.activeIndex--;
                        if(that.activeIndex < 0 || that.activeIndex >= that.data.length ){
                            that.activeIndex = -1;
                            that.input.value = that.value;
                        }
                    }

                    that._activeItem();
                    e.preventDefault();
                    break;

                case 40:
                    if(that.data.length === 0) return;
                    if(that.activeIndex === -1){
                        that.activeIndex = 0;
                    }else{
                        that.activeIndex++;
                        if(that.activeIndex < 0 || that.activeIndex >= that.data.length){
                            that.activeIndex = -1;
                            that.input.value = that.value;
                        }
                    }
                    that._activeItem();
                    e.preventDefault();
                    break;

                case 13:
                    that._enter(this.value);
                    break;
                default:
                    that._throttle();


            }
        });

        EventUtil.on(this.input, 'focus', function(){
            if(that.data.length){
                that._activeItem();
                that._showList();
            }
        });
        EventUtil.on(document, 'click', function(e){
            if(!that.list.contains(e.target)){
                that._hideList();
            }

        });

    }

    _enter(value){
        if(this.activeIndex !== -1){
            this.value = value;
            this.input.value = this.value;
            var items = this.list.querySelectorAll('.autocomplete-item');
            items[this.activeIndex] && items[this.activeIndex].classList.remove('active');
            this.activeIndex = -1;
            this.trigger('choose', this.value);
        }

        this._hide(this.list);


    }

    _activeItem(){


        var items = this.list.querySelectorAll('.autocomplete-item'),
            length = items.length,
            activeItem;

        if(length === 0) return;

        for(var i=0; i<length; i++){
            if(i === this.activeIndex){
                items[i].classList.add('active');
            }else{
                items[i].classList.remove('active');
            }
        }
        activeItem = items[this.activeIndex];
        if(activeItem){
            this.input.value = this._itemData();
            this.trigger('changeItem', items[this.activeIndex]);
        }

    }

    _bindData(data){
        if(!data || !data.length) return;

        this.data = data;
        var innerArr = [];
        innerArr.push('<div class="autocomplete-list-inner">');
        for(var i=0; i<data.length; i++){
            innerArr.push('<div class="autocomplete-item">'+ data[i] +'</div>');
        }
        innerArr.push('</div>');
        this.list.innerHTML = innerArr.join('');
        if(data.length){
            this.activeIndex = -1;
            this._show(this.list);
            this.trigger('show');
        }
    }


}

AutoComplete.prototype._singleList = single(function(data){
    var list = document.createElement('div');
    list.className = 'autocomplete-list';
    document.body.appendChild(list);
    this.list = list;
    this._position();
    this.trigger('binddata', data);
    this._bindData(data);
    return this.list;
})

AutoComplete.prototype._throttle = throttle(function(){
    var that = this;
    this.value = this.input.value;
    var search = this.value;

    ajax({
        data: {
            name: search
        },
        url: '/test',
        success: function(data){
            //console.log('ajax success');
            if(isFunc(that.options.handleData)){
                data = that.options.handleData(data);
            }
            that._bindData(data);
        },

        fail: function(data){
            //console.log('ajax success');

            if(isFunc(that.options.handleData)){
                data = that.options.handleData(data);
            }
            that._bindData(data);
        }

    });




}, false, 200)
