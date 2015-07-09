;(function(root,factory){
	var Class=factory.call(root);
}(this,function(){
	function initialize(){

	}
	return function(prototype){
		function Type(){
			this.initialize.apply(this,arguments);
		}
		Type.prototype=prototype;
		prototype.constructor=prototype.super=Type;
		prototype.initialize=prototype.initialize||initialize;
		return  Type;
	}
}));