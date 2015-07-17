;(function(root,factory){
	var Matrix=factory.call(root);
}(this,function(){
	function Matrix() {
	    var args = (arguments.length>0) ? Array.prototype.slice.call(arguments) : [1,0,0,1,0,0];
	   	args.forEach(function(item,index,list){
	   		this[index]=item;
	   	},this);
	   this.length=args.length;
	}
	// Array.prototype.forEach.call(new Matrix,function(item,index){
	// 	console.log(item,index);
	// });
	Matrix.prototype = {
		constructor:Matrix,
	    rotate:function (r) {
	        var cos = Math.cos(r),
	            sin = Math.sin(r),
	            mx = this,
	            a = mx[0] * cos + mx[2] * sin,
	            b = mx[1] * cos + mx[3] * sin,
	            c = -mx[0] * sin + mx[2] * cos,
	            d = -mx[1] * sin + mx[3] * cos;
	        this[0] = a;
	        this[1] = b;
	        this[2] = c;
	        this[3] = d;
	        return this;
	    },
	    skew: function(x,y) {
	        var tanX=Math.tan(x),
	            tanY=Math.tan(y),
	            mx0=this[0],
	            mx1=this[1];
	        this[0] += tanY*this[2]; 
	        this[1] += tanY*this[3]; 
	        this[2] += tanX*mx0; 
	        this[3] += tanX*mx1;
	        return this;
	    },
	    translate: function(x,y) {
	        this[4] += this[0] * x + this[2] * y;
	        this[5] += this[1] * x + this[3] * y;
	        return this;
	    },
	    scale:function (x,y) {
	        var mx = this;
	        this[0] *= x;
	        this[1] *= x;
	        this[2] *= y;
	        this[3] *= y;
	        return this;
	    }
	}
	return Matrix;
}));