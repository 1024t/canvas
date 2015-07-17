/* 
* @Author: wanghongxin
* @Date:   2015-07-17 14:28:48
* @Last Modified by:   wanghongxin
* @Last Modified time: 2015-07-17 17:33:17
*/
;(function(root,factory){
    //function Class(object prototype) or function Class(function prototype,string type,function init) 
    root.Class=factory.call(root);
}(this,function(){
    function initialize(){}
    function parent(){}
    return function(prototype,type,init){
        function Class(){
            this.initialize.apply(this,arguments);
        }
        if(typeof prototype==='function'){
            if(typeof type!='string'){
                throw new TypeError('Class():the second argument must be a string;')
            }
            parent.prototype=prototype.prototype;
            Class.prototype=new parent;
            Class.prototype.type=type;
            Class.prototype.constructor=Class;
            Class.prototype.initialize=init||Class.prototype.initialize;
            Class.prototype.super=prototype;
        }else{
            Class.prototype=prototype;
            prototype.constructor=Class;
            prototype.initialize=prototype.initialize||initialize;
            prototype.super=Object;
        }
        return  Class;
    }
}));
;(function(root,factory){
    var Class=root.Class;
    //object Sprite(string name,object painter,object behaviors);
    root.Sprite=factory.call(root,Class);
}(this,function(Class){
    function empty(){}
    return new Class({
        type:'Sprite',
        paint:function(){
            if(this.visibal){
                this.painter.paint(this,this.context);
            }
        },
        update:function(sprite,context,time){
            for(var i=0,len=this.behaviors.length;i<len;i++){
                this.behaviors[i].execute(sprite,context,time);
            }
        },
        fill:function(opts){
            for(var i in opts){
                if(opts.hasOwnProperty(i)){
                    this[i]=opts[i];
                }
            }
        },
        initialize:function(name,painter,behaviors){
            this.left=0;
            this.top=0;
            this.width=0;
            this.height=0;
            this.vx=0;
            this.vy=0;
            this.ax=0;
            this.ay=0;
            this.context=null;
            this.animating=false;
            this.visibal=true;
            this.name=name||'unnamedSprite';
            this.painter=painter||{
                paint:empty
            };
            this.behaviors=behaviors||[];
        }
    });
}));
;(function(root,factory){
    var Class=root.Class;
    //object ImagePainter(string url)
    root.ImagePainter=factory.call(root,Class);
}(this,function(Class){
    return new Class({
        type:'ImagePainter',
        initialize:function(url){
            var self=this;
            this.image=new Image();
            this.complete=false;
            this.image.onload=function(){
                self.complete=true;
            };
            this.image.src=url;
        },
        paint:function(sprite,context){
            if(this.complete){
                context.drawImage(this.image,sprite.left,sprite.top,sprite.width,sprite.height);
            }
        }
    });
}));
;(function(root,factory){
    var Class=root.Class;
    //object ImageSheetPainter(string url,array cells)
    root.ImageSheetPainter=factory.call(root,Class);
}(this,function(Class){
    return new Class({
        type:'ImageSheetPainter',
        initialize:function(url,cells){
            var self=this;
            this.image=new Image();
            this.complete=false;
            this.image.onload=function(){
                self.complete=true;
            };
            this.image.src=url;
            this.cells=cells||[];
            this.index=0;
        },
        advance:function(){
            if(this.cells.length===0){
                return;
            }
            if(this.index==this.cells.length-1){
                this.index=0
            }else{
                this.index++;
            }
        },
        paint:function(sprite,context){
            var cell=this.cells[this.index];
            if(this.complete){
                context.drawImage(this.image,cell.x,cell.y,cell.width,cell.height,sprite.left,sprite.top,sprite.width,sprite.height);
            }
        }
    });
}));
;(function(root,factory){
    var Class=root.Class;
    //object StopWatch()
    root.StopWatch=factory.call(root,Class);
}(this,function(Class){
    return new Class({
        type:'StopWatch',
        initialize:function(){
            this.startTime=0;
            this.elapsedTime=undefined;
            this.running=false;
        },
        start:function(){
            this.startTime=Date.now();
            this.running=true;
        },
        stop:function(){
            this.elapsedTime=Date.now()-this.startTime;
            this.running=false;
        },
        getElapsedTime:function(){
            if(this.running){
                return Date.now()-this.startTime
            }else{
                return this.elapsedTime;
            }
        },
        isRunning:function(){
            return this.running;
        }
    });
}));
;(function(root,factory){
    var Class=root.Class;
    var StopWatch=root.StopWatch;
    //object AnimatorTimer(double duration)
    root.AnimatorTimer=factory.call(root,Class,StopWatch);
}(this,function(Class,StopWatch){
    return new Class({
        type:'AnimatorTimer',
        stopWatch:new StopWatch(),
        initialize:function(duration){
            this.duration=duration;
        },
        start:function(){
            this.stopWatch.start();
        },
        stop:function(){
            this.stopWatch.stop();
        },
        getElapsedTime:function(){
            if(this.stopWatch.running){
                return Date.now()-this.stopWatch.startTime;
            }else{
                return this.stopWatch.elapsedTime;
            }
        },
        isRunning:function(){
            return this.stopWatch.running;
        },
        isOver:function(){
            return !this.stopWatch.running;
        }
    });
}));