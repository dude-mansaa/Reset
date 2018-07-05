load('api_pwm.js');
load('api_timer.js');
load('api_sys.js');
load('api_gpio.js');
let red = 4;
let green = 16;
let blue = 5;
let white = 19;
GPIO.set_mode(red,GPIO.MODE_OUTPUT);
GPIO.set_mode(green,GPIO.MODE_OUTPUT);
GPIO.set_mode(blue,GPIO.MODE_OUTPUT);
GPIO.set_mode(white,GPIO.MODE_OUTPUT);
let l = {"r":0,"g":0,"b":0,"w":0};
let s = JSON.stringify(l);
let n = JSON.parse(s);

let minimum=function(arr) {
  let min = arr[0], max = arr[0];
  for (let i = 1, len=arr.length; i < len; i++) {
    let v = arr[i];
    min = (v < min) ? v : min;
    max = (v > max) ? v : max;
  }
  return  min ;
};

let color = function(prev,args){
	let r,g,b,w=0;
	
	if(args.r === args.g === args.b){
		w = args.r;
		r =0;
		g =0;
		b =0;
		return animate(prev,r,g,b,w);
	}else{
		let min = minimum([args.r,args.g,args.b]);
		args.r = args.r-min;
		args.g = args.g-min;
		args.b = args.b-min;
	
	
		r = args.r - prev.r;
		g = args.g - prev.g;
		b = args.b - prev.b;
		w = min - prev.w;
		return animate(prev,r,g,b,w);		
	}

};


let step=25;

let animate = function(prev,r,g,b,w){
	for(let i=0 ; i<=step;i++){
		let pp = {r:0,g:0,b:0,w:0};
		pp.r = prev.r + ((r * i)/step);
		pp.g = prev.g + ((g * i)/step);
		pp.b = prev.b + ((b * i)/step);
		pp.w = prev.w + ((w * i)/step);
		PWM.set(red,1000,(pp.r/255));
		PWM.set(green,1000,(pp.g/255));
		PWM.set(blue,1000,(pp.b/255));
		PWM.set(white,1000,(pp.w/255));
		Sys.usleep(5);
		n = {r:0,g:0,b:0,w:0};
		n = pp;
	}
	return n;
};