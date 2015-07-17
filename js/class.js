;(function(root,factory){
	var Class=factory.call(root);
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