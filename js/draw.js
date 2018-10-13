var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var x0 = 0
var y0 = 0
var xAxis = 0
var yAxis = 0

var cols = 0
var rows = 0
var fontsize = ""
var j = 0
var point_colored = []

var points = new Array()
var canDraw = false
var chooseSeed = false
var seed_x = 0
var seed_y = 0

var isdrawBorder = false
var border = new Array()

function turnoff(obj){
	document.getElementById(obj).style.visibility='hidden'
}
function drawRect(i,j,GRID_WIDTH,GRID_HEIGHT){
	context.lineWidth=1
	context.strokeStyle = "#82a6f5"
	context.strokeRect(i*GRID_WIDTH,j*GRID_HEIGHT,GRID_WIDTH,GRID_HEIGHT)
}
function drawAxis(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT){
	var xAxis = parseInt(parseInt(CANVAS_WIDTH/GRID_WIDTH)/2)*GRID_WIDTH
	var yAxis = parseInt(parseInt(CANVAS_HEIGHT/GRID_HEIGHT)/2)*GRID_HEIGHT
	x0 = xAxis
	y0 = yAxis
//	log(x0+','+y0)
	gridX = GRID_WIDTH
	gridY = GRID_HEIGHT
	context.strokeStyle = "#000"
	context.lineWidth = 2
	context.moveTo(0,yAxis)
	context.lineTo(CANVAS_WIDTH,yAxis)
	context.stroke()
	context.moveTo(xAxis,0)
	context.lineTo(xAxis,CANVAS_HEIGHT)
	context.stroke()
}
function drawGrid(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT,initPointColor=1){
	cols = parseInt(CANVAS_WIDTH/GRID_WIDTH)
	rows = parseInt(CANVAS_HEIGHT/GRID_HEIGHT)
	log(point_colored)
	
	fontsize = GRID_HEIGHT/2+"px"
	
	initPointColor = initPointColor || 1
	
	if(initPointColor==1){
		log('-----point_colored init-------')
		point_colored = []
		for(var i = 0;i<rows;i++){
			point_colored.push([])
			for(var j = 0;j < cols;j++){
				point_colored[i].push(0)
			}
			
		}
		
	}
	
	for(var i = 0;i<cols;i++)
	{
		
		for(var j = 0;j <= rows;j++)
		{
			
			drawRect(i,j,GRID_WIDTH,GRID_HEIGHT)
			
			if(i==cols-1){
					context.strokeStyle = "#CCBED4"
					context.font = fontsize+" Bold"
					context.strokeText(rows/2-j,i*GRID_WIDTH+3,j*GRID_HEIGHT-2)
			}
			if(j==rows&&i!=cols-1){
					context.strokeStyle = "#A39F93"
					context.font = fontsize+" Bold"
					context.strokeText(i-cols/2,i*GRID_WIDTH+3,j*GRID_HEIGHT-2)
			}
		}
	}
	drawAxis(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT)
	log('---------init the grid---------')
	
	
}
function drawPoint(x,y,color){
	color = color || "red"
	context.fillStyle = color;
    context.fillRect(x, y-GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
}
function drawLine(){
	var Sel = document.getElementById("Sel-1")
	var index = Sel.selectedIndex
	var algorithm = [[DDALine_x,DDALine_y],
					 [Midpoint_x,Midpoint_y],
					 [IntegerBresenhamline_x,IntegerBresenhamline_y]]
	var selectedAlg = []
	switch(index)
	{
		case 0:
		  selectedAlg = algorithm[0]
		  break;
		case 1:
		  selectedAlg = algorithm[1]
		  break;
		case 2:
		  selectedAlg = algorithm[2]
		  break;
		default:
	}
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
	var x1 = parseInt(document.getElementById("x1").value)
	var y1 = parseInt(document.getElementById("y1").value)
	var x2 = parseInt(document.getElementById("x2").value)
	var y2 = parseInt(document.getElementById("y2").value)
	
	line(x1,y1,x2,y2,selectedAlg,50)
	
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
function line(x1,y1,x2,y2,selectedAlg,time){

	var k = (y2-y1)/(x2-x1)
	
	log('x1:'+x1+', y1:'+y1+'; x2:'+x2+', y2:'+y2+'; k:'+k)
	
	if(Math.abs(k)>1){
		
		k = 1/k
		if(y2<y1){
			var swap = y1
			y1 = y2
			y2 = swap
			swap = x1
			x1 = x2 
			x2 = swap
		}
		selectedAlg[1](x1,y1,x2,y2,k,time)
		// DDALineY(x1,y1,x2,y2,k,color)
	}
	else{
		if(x1>x2){
			var swap = x1
			x1 = x2
			x2 = swap
			swap = y1
			y1 = y2 
			y2 = swap
		}
		selectedAlg[0](x1,y1,x2,y2,k,time)
		// DDALineX(x1,y1,x2,y2,k,color)
	}
}
function line2(x1,y1,x2,y2,color){

	var k = (y2-y1)/(x2-x1)
	
	log('x1:'+x1+', y1:'+y1+'; x2:'+x2+', y2:'+y2+'; k:'+k)
	
	if(Math.abs(k)>1){
		
		k = 1/k
		if(y2<y1){
			var swap = y1
			y1 = y2
			y2 = swap
			swap = x1
			x1 = x2 
			x2 = swap
		}
		
		DDALineY(x1,y1,x2,y2,k,color)
	}
	else{
		if(x1>x2){
			var swap = x1
			x1 = x2
			x2 = swap
			swap = y1
			y1 = y2 
			y2 = swap
		}

		DDALineX(x1,y1,x2,y2,k,color)
	}
}
function drawCircle(){
	var Sel = document.getElementById("Sel-2")
	var index = Sel.selectedIndex
	var algorithm = [MidPointCircle,BersenhamCircle]
	var selectedAlg = []
	switch(index)
	{
		case 0:
		  selectedAlg = algorithm[0]
		  break;
		case 1:
		  selectedAlg = algorithm[1]
		  break;
		default:
	}
	var c0 = parseInt(document.getElementById("x0").value)
	var c1 = parseInt(document.getElementById("y0").value)
	var r = parseInt(document.getElementById("r").value)
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
	selectedAlg(c0,c1,r)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
function drawEllipse(){
	var c2 = parseInt(document.getElementById("x0").value)
	var c3 = parseInt(document.getElementById("y0").value)
	var a = parseInt(document.getElementById("a").value)
	var b = parseInt(document.getElementById("b").value)
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
	MidPointEllipse(c2,c3,a,b)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}

function Fill_Boundary_4Connnected(x, y){
// (x,y) 种子像素的坐标；
// BoundaryColor 边界像素颜色； InteriorColor 需要填充的内部像素颜色
	if(point_colored[parseInt(rows/2)-y][parseInt(cols/2)+x] != 1  && 
	   point_colored[parseInt(rows/2)-y][parseInt(cols/2)+x] != 2 ){
   	 // GetPixel(x,y): 返回像素(x,y)颜色
		
		drawPoint(x0 + x*gridX, y0 - y*gridY, 'yellow') // 将像素(x, y)置成填充颜色
		point_colored[parseInt(rows/2)-y][parseInt(cols/2)+x] = 2 
    	Fill_Boundary_4Connnected(x, y+1)
		Fill_Boundary_4Connnected(x, y-1)
		Fill_Boundary_4Connnected(x-1, y)
		Fill_Boundary_4Connnected(x+1, y)
	
	}
//	log(point_colored)
}
function polyfill_seed(){
	chooseSeed = false
	Fill_Boundary_4Connnected(seed_x, seed_y)
	drawGrid(canvas.width,canvas.height,gridX,gridY,2)
}
function polyfill(){
	dotset = points
	if(dotset.length>3){
		
	
		var max_y = dotset[0][1]
		var min_y = dotset[0][1]
		for(var i=0;i<dotset.length;i++){
			if(dotset[i][1]>max_y){
				max_y = dotset[i][1]
			}
			if(dotset[i][1]<min_y){
				min_y = dotset[i][1]
			}
		}


		var n = dotset.length
		var aet = new Array()
		for(var i = min_y;i<=max_y;i++){
			for(var j=0;j<n;j++){
				if(dotset[j][1]==i){
					var bool1 = (dotset[(j-1+n)%n][1])>(dotset[j][1])
	//				log('判断bool_1值：',bool1)
					if(bool1){
	//						log(dotset[(j-1+n)%n][1]+'>'+dotset[j][1])
	//						log('通过if判断的bool_1值',bool1)
							// x  y_max  y_min   dx
							aet.push([dotset[j][0],
									  dotset[(j-1+n)%n][1],
									  dotset[j][1],
									 (dotset[(j-1+n)%n][0]-dotset[j][0])/(dotset[(j-1+n)%n][1]-dotset[j][1])
									 ])


					}
					var bool2 = (dotset[(j+1+n)%n][1])>(dotset[j][1])
	//				log('判断bool_2值：',bool2)
					if(bool2){
	//						log(dotset[(j+1+n)%n][1]+'>'+dotset[j][1])
	//						log('通过if判断的bool_2值',bool2)
							// x  y_max  y_min   dx
							aet.push([dotset[j][0],
									  dotset[(j+1+n)%n][1],
									  dotset[j][1],
									 (dotset[(j+1+n)%n][0]-dotset[j][0])/(dotset[(j+1+n)%n][1]-dotset[j][1])
									 ])	
					}	

				}

			}
		}
		log(aet)
		for(var i = min_y;i<=max_y;i++){

		}
	
	
	}
}
function drawSomePoint(){//记录canvas上的点
	canDraw = true
	points = []
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
function drawPolygon(){ //显示多边形
	canDraw = false
	chooseSeed = true
	var n = points.length
	for(var i = 0;i<n;i++){
		line2(points[i][0],points[i][1],
			 points[(i+1+n)%n][0],points[(i+1+n)%n][1])
	}
	drawGrid(canvas.width,canvas.height,gridX,gridY,2)
}
canvas.addEventListener("click", function(event) {
    getMousePos(canvas, event);
});
function getMousePos(canvas, event) { //鼠标监听
	
	var rect = canvas.getBoundingClientRect()
	if(canDraw){
		
		//1
		
		//2
		var x = event.clientX - rect.left * (canvas.width / rect.width)
		var y = event.clientY - rect.top * (canvas.height / rect.height)
//		console.log("canvas: x:"+x+",y:"+y)
		
		x1 = Math.floor((x-x0)/gridX)
		y1 = Math.floor((y0-y)/gridY)
		
		points.push([x1,y1])

//		log(points)
		log(x1+','+y1)
		
		
	}
	if(chooseSeed){
		var x = event.clientX - rect.left * (canvas.width / rect.width)
		var y = event.clientY - rect.top * (canvas.height / rect.height)
//		console.log("canvas: x:"+x+",y:"+y)
		
		seed_x = Math.floor((x-x0)/gridX)
		seed_y = Math.floor((y0-y)/gridY)
		
		log('seed: '+seed_x+','+seed_y)
	}
    
	if(isdrawBorder){
		var x = event.clientX - rect.left * (canvas.width / rect.width)
		var y = event.clientY - rect.top * (canvas.height / rect.height)
//		console.log("canvas: x:"+x+",y:"+y)
		if(border.length<3){
			
			X = Math.floor((x-x0)/gridX)
			Y = Math.floor((y0-y)/gridY)
			log('border_X: '+X+',border_Y: '+Y)
			border.push(X)
			border.push(Y)

		}

		XL = border[0]
		XR = border[2]
		YT = border[1]
		YB = border[3]
		
		if(XL>XR){
			var temp = XL
			XL = XR
			XR = temp
		}
		if(YB>YT){
			var temp = YB
			YB = YT
			YT = temp
		}
		line2(XL,YT,XR,YT,"yellow")
		line2(XL,YB,XR,YB,"yellow")
		line2(XL,YT,XL,YB,"yellow")
		line2(XR,YT,XR,YB,"yellow")
	}
	
}
function DDALineX(x1,y1,x2,y2,k,color){
	color = color || "red"
	if(y1<0){
			var x = x0 + x1*gridX
			var y = y0 - parseInt(parseFloat(y1)-0.5)*gridY 
			drawPoint(x,y,color)
			point_colored[parseInt(parseInt(rows/2)-parseInt(parseFloat(y1)-0.5))][parseInt(parseInt(cols/2)+x1)] = 1
		}
		else{
			var x = x0 + x1*gridX
			var y = y0 - parseInt(parseFloat(y1)+0.5)*gridY
			drawPoint(x,y,color)
			
			point_colored[parseInt(parseInt(rows/2)-parseInt(parseFloat(y1)+0.5))][parseInt(parseInt(cols/2)+x1)] = 1
		}
		y1 = parseFloat(y1) + parseFloat(k)
		x1++
	if(x1<=x2){
			DDALineX(x1,y1,x2,y2,k,color)
		}
}
function DDALineY(x1,y1,x2,y2,k,color){
	color = color || "red"
	if(x1<0){
			var x = x0 + parseInt(parseFloat(x1)-0.5)*gridX
			var y = y0 - y1*gridY 
			drawPoint(x , y ,color)
			
			point_colored[parseInt(parseInt(rows/2)-y1)][parseInt(parseInt(cols/2)+parseInt(parseFloat(x1)-0.5))] = 1
		}
		else{
			var x = x0 + parseInt(parseFloat(x1)+0.5)*gridX 
			var y = y0 - y1*gridY
			drawPoint(x, y ,color)
			
			point_colored[parseInt(parseInt(rows/2)-y1)][parseInt(parseInt(cols/2)+parseInt(parseFloat(x1)+0.5))] = 1
		}
		x1 = parseFloat(x1) + parseFloat(k)
		y1++
	if(y1<=y2){
			DDALineY(x1,y1,x2,y2,k,color)
		}
}

var LEFT = 1
var RIGHT = 2
var BOTTOM = 4
var TOP = 8

function CS_LineClip(x1,y1,x2,y2,XL,XR,YB,YT){
	
	function encode(x,y){
		var c = 0
		if(x<XL){c|=LEFT}
		if(x>XR){c|=RIGHT}
		if(y<YB){c|=BOTTOM}
		if(y>YT){c|=TOP}
		return c
	}
	code1 = encode(x1,y1)
	code2 = encode(x2,y2)
	code3 = encode(2,2)

	while(code1!=0||code2!=0){
		if((code1&code2)!=0){
			return
		}
		code = code1
		log('code:'+code) 
		if(code1==0){code = code2}
		if((LEFT&code)!=0){
			x = XL
			y = y1+Math.round((y2-y1)*(XL-x1)/(x2-x1))
			log('left:'+x+','+y+'code:'+code)
		}
		else if((RIGHT&code)!=0){
			x = XR
			y = y1+Math.round((y2-y1)*(XR-x1)/(x2-x1))
			log('right:'+x+','+y+'code:'+code)
		}
		else if((BOTTOM&code)!=0){
			y = YB
			x = x1+Math.round((x2-x1)*(YB-y1)/(y2-y1))
			log('bottom:'+x+','+y+'code:'+code)
		}
		else if((TOP&code)!=0){
			y = YT
			x = x1+Math.round((x2-x1)*(YT-y1)/(y2-y1))
			log('top:'+x+','+y+'code:'+code)
		}
		if(code == code1){
			x1 = x
			y1 = y
			code1 = encode(x,y)
			log('code1:'+code1)
		}
		else{
			x2 = x
			y2 = y
			code2 = encode(x,y)
			log('code2:'+code2)
		}
		
	}
	line2(x1,y1,x2,y2)
	
}
function drawborder(){
	if(!isdrawBorder){
		border = []
		isdrawBorder = true
		var a = document.getElementById("cut").value = "确认"
	}
	else{
		isdrawBorder = false
		var a = document.getElementById("cut").value = "裁剪"
		var x1 = parseInt(document.getElementById("x1").value)
		var y1 = parseInt(document.getElementById("y1").value)
		var x2 = parseInt(document.getElementById("x2").value)
		var y2 = parseInt(document.getElementById("y2").value)
		
		XL = border[0]
		XR = border[2]
		YT = border[1]
		YB = border[3]
		
		if(XL>XR){
			var temp = XL
			XL = XR
			XR = temp
		}
		if(YB>YT){
			var temp = YB
			YB = YT
			YT = temp
		}
		context.clearRect(0,0,canvas.width,canvas.height)
		CS_LineClip(x1,y1,x2,y2,XL,XR,YB,YT)
		line2(XL,YT,XR,YT,"yellow")
		line2(XL,YB,XR,YB,"yellow")
		line2(XL,YT,XL,YB,"yellow")
		line2(XR,YT,XR,YB,"yellow")
		drawGrid(canvas.width,canvas.height,gridX,gridY,2)
	}
	
	
}
