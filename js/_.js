/* 
* @Author: wanghongxin
* @Date:   2015-07-16 13:27:46
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-07-17 18:27:24
*/
;(function(root,factory){
    var _=factory.call(root);
}(this,function(){
    return {
        throttle:function(fn,delay,duration,context){
            var timer,
                start=0;
            return function(){
                var current=Date.now();
                var args=arguments;
                clearTimeout(timer);
                if(current-start>=duration){
                    fn.apply(context,args);
                    start=current;
                }else{
                    timer=setTimeout(function(){
                        fn.apply(context,args);
                    },delay);
                }
            }
        },
        each:function(array,fn){
            for(var i=0,l=array.length;i<l;l++){
                fn.call(array[i]);
            }
        },
        map:function(array,fn){
            var ret=[];
            this.each(array,function(item){
                ret.push(fn(item));
            });
            return ret;
        },
        reduce:function(array,base,combine){

            this.each(array,function(item){
                base=combine(base,item);
            });
            return base;
        },
        compose:function(f1,f2){
            return function(){
                return f1(f2.apply(null,arguments));
            };
        },
        partial:function(fn){
            var args=arguments;
            args.shift();
            return function(){
                return fn.apply(null,args);
            };
        },
        singleton:function(fn){
            var ret;
            return function(){
                return ret||(ret=fn.apply(null,arguments));
            }
        }
    }
}));