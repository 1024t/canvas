function Ball(size,color){
	size=size||40;
	color=color||'#000000';
	this.x=0;
	this.y=0;
	this.rotation=0;
	this.radius=size;
	this.color=color;
	this.scaleX=1;
	this.scaleY=1;
	this.lineWidth=1;
}

Ball.prototype.draw=function(context){
	context.save();
	context.translate(this.x,this.y);
	// context.rotate(this.rotation);
	// context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.fillStyle=this.color;
	context.beginPath();
	context.arc(0,0,this.radius,0,Math.PI*2,true);
	context.closePath();
	context.fill();
	context.restore();
};
var canvas=$('canvas');
// canvas.css({
// 	width:$(window).width(),
// 	height:$(window).height()
// });
canvas.get(0).width=$(window).width();
canvas.get(0).height=$(window).height();
var context=canvas.get(0).getContext('2d');
var ball=new Ball;
var vx=0;
var speed=0;
var angle=30;
var ax=2;
ball.x=100;
ball.y=100;
ball.draw(context);
!function drawFrame(){
	requestAnimationFrame(drawFrame);
	context.clearRect(0,0,canvas.width(),canvas.height())
	var vx=Math.cos(30*Math.PI/180)*speed;
	var vy=Math.sin(30*Math.PI/180)*speed;
	vx+=ax;
	ball.x+=vx;
	ball.draw(context);
}();