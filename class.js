;(function(root,factory){
	Class=factory.call(root);
}(this,function(){
	function initialize(){

	}
	return function(prototype,init){
		function Class(){
			if(arguments.length!=0){
				this.initialize.apply(this,arguments);
			}
		}
		if(typeof prototype==='function'){
			Class.prototype=new prototype;
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
var Mt=new Class({
	type:'Mt',
	initialize:function(name){
		this.name=name;
	}
});
var lmt=new Mt('lmt');
var S=new Class(Mt,function(sex){
	this.sex=sex;
});
var s=new S('female');