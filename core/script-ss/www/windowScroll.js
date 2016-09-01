    var _inited = {} 
		,__id = 0
    var _lastPos = 0  , _direction;
	
    var doc = document.documentElement || document.body
		, doc1 = document.body || document.documentElement 
		
    var forwardList = [],
        backwardList = [],
        bindList = {}
		, nokey = 0
	
	function getUid(wrapper){
		if (wrapper == window) return 0
	   var wrapperId = wrapper.getAttribute('id') || wrapper.getAttribute('uuid')
	   if (!wrapperId){
		   wrapperId =  ++__id
		   wrapper.setAttribute('uuid' , wrapperId)
		   }
		return wrapperId
		
		}
	function getScrollTop(container){
		return container ? container.scrollTop : (doc.scrollTop || doc1.scrollTop )
		}
    function  initScrollWatch(cid ,container){
		var wrapper = container || window
	    if ( _inited.hasOwnProperty(cid) ) return;
	   _inited[cid] = true;
			$(wrapper).on('scroll', function(){
           var nowPos = getScrollTop(container);
            _direction = nowPos - _lastPos > 0;
            _lastPos = nowPos; 
            execBinded(cid);
            if (0 === cid) execList(_direction );     
			})
        }

    function execList(goforward){
        var list , reserv_list , fntag;
        if ( goforward ){
            list =  forwardList ;
            reserv_list  = backwardList;
            fntag = 'gteFn';
         }else{
            list =  backwardList ;
            reserv_list  = forwardList;
            fntag = 'ltFn';
             }
        var list_size = list.length;
        for (var i =  list_size-1;i>=0 ; i--) {
            var event = list[i];           
			if (!event) continue;
			var y = event.y;
			if (event.dynamicY) y = y(); 
            if ( !goforward ^ y <= _lastPos) { 
                //console.log('now: ' + _lastPos + '; y:' + event.y + ';direct:' + goforward);
                list.splice(i,1);
                reserv_list.push(event);
                if ('function' == typeof event[fntag] ) event[fntag](_lastPos);
                }
            }
        }    

    function execBinded(cid){
		if (!bindList.hasOwnProperty(cid)) return;	
		var _list = bindList[cid]
		for(var i in _list){
			_list[i](_lastPos , _direction); 
		}
	}

	exports.property = function property(proname , container){
		switch (proname){
			case 'height':
				return container ? container.offsetHeight : doc.clientHeight;
			case 'scrollTop':
				return getScrollTop(container);
		}
	}

    exports.unBind = function(factor , container){
		var cid = getUid(container || window) 
		var _list = bindList[cid]
		if ('string' == typeof factor) {
			var key = factor
			if(_list && undefined != _list[key])
				delete _list[key]
		}else{
			for(var key in _list){
				if (factor == _list[key]) {
					delete _list[key]
					break; 
				}
			}
		}
	//	console.log('unbind', _list, factor)
	}
    exports.bind = function(factor ,key , container){
		var cid = getUid(container || window) 
		if (! _inited.hasOwnProperty(cid)) initScrollWatch(cid , container);
		bindList[cid] = bindList[cid] || {}
		var _list = bindList[cid]
		if (key){
			_list[key] = factor;
		}else{
			_list[nokey++] = factor;	
		}
	//	console.log('bind', _list, key)
	}
    /*
    *@param number scroll y
    *@param function call while >=y 
    *@param function 
    */
    exports.yIn = function(yVal , gteFn , ltFn  ){
       if (! _inited.hasOwnProperty(0)) initScrollWatch(0); 
       var e = {'y':yVal , 'gteFn' : gteFn , 'ltFn' :ltFn , 'dynamicY' : ('function' == typeof yVal)};
        _lastPos = getScrollTop();
       if (yVal > _lastPos){ 
           forwardList.push(e);
           ///ltFn && ltFn(); 
         } else{    
           backwardList.push(e);
           gteFn && gteFn(_lastPos);
         }
        }
