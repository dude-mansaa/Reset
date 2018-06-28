load('api_file.js');
load('api_rpc.js');
load('api_config.js');
load('api_sys.js');
load('api_timer.js');
load('color.js');

let doReset = function(){
	let obj = JSON.parse(File.read('conf9.json'));
	if(obj === null){
		Sys.reboot(0);
	}else{
		obj.wifi.sta.enable = false;
		obj.wifi.ap.enable = true;
		if(obj.bt.enable !== null){
		  obj.bt.enable = true;
		}
		obj.wifi.sta.ssid = "";
		obj.wifi.sta.pass = "";
		File.write(JSON.stringify(obj),'conf9.json');
		print('Reseting device to factory defaults');
		Sys.reboot(0);
	}
};

let l = {"r":0,"g":0,"b":0};
let s = JSON.stringify(l);
let prevColor = JSON.parse(s);

let isReset = function(){
		let reset = check();
		if(reset === 'true'){
			doReset();
		}
};

let check = function(){
	let s = File.read('userData.json');
	let bb = JSON.parse(s);
	Timer.set(10000,false,function(){
		let s = File.read('userData.json');
		let b = JSON.parse(s);
		b.count = 0;
		File.write(JSON.stringify(b),'userData.json');
		print('reseting to count 0');
	},null);
	if(bb.count === 0){
		bb.count = 1;
		File.write(JSON.stringify(bb),'userData.json');
		return 'false';
	}else if(bb.count === 1){
		bb.count = 2;
		File.write(JSON.stringify(bb),'userData.json');
		return 'false';
	}else if(bb.count === 2){
		bb.count = 0;
		File.write(JSON.stringify(bb),'userData.json');
		return 'true';//fix this ,it should not trigger when wifi is not configured.
	}
};

let r,g,b,w=0;

/* let RED = {"p":"rgb","r":255,"g":0,"b":0,"w":0};
let BLUE = {"p":"rgb","r":0,"g":0,"b":255,"w":0};
let GREEN = {"p":"rgb","r":0,"g":255,"b":0,"w":0};
let WHITE = {"p":"ct","r":0,"g":0,"b":0,"w":255}; */

let RED = {"r":255,"g":0,"b":0};
let BLUE = {"r":0,"g":0,"b":255};
let GREEN = {"r":0,"g":255,"b":0};
let WHITE = {"r":0,"g":0,"b":0};

let col = "red";

let Initcolor = function(){
  print('init color');
	if(Cfg.get('wifi.sta.enable')===true){
		let s = File.read('userData.json');
		let b = JSON.parse(s);
		let res = b.led;//JSON.parse(b.led);
		color(prevColor,res);
		prevColor =res;
		return prevColor;
	}
	if(Cfg.get('bt.enable')===true){
		
		Timer.set(1500,true,function(){
			if(col === "red"){
				col = "green";
				let val = JSON.stringify(RED);
				let res = JSON.parse(val);
				color(prevColor,res);
				prevColor = res;
			}else if(col === "green"){
				col = "blue";
				let val = JSON.stringify(GREEN);
				let res = JSON.parse(val);
				color(prevColor,res);
				prevColor = res;
			}else if(col === "blue"){
				col = "red";
				let val = JSON.stringify(BLUE);
				let res = JSON.parse(val);
				color(prevColor,res);
				prevColor = res;
			}
		},null);
		return null;
	}
};