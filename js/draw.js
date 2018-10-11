var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var x0 = 0
var y0 = 0
var gridX = 0
var gridY = 0
var fontsize = ""
var j = 0



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
function drawGrid(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT){
	var cols = parseInt(CANVAS_WIDTH/GRID_WIDTH)
	var rows = parseInt(CANVAS_HEIGHT/GRID_HEIGHT)
	fontsize = GRID_HEIGHT/2+"px"
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
	log('------------init the grid------------')
	
	
}
function drawPoint(x,y){
	context.fillStyle = 'red';
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
function line(x1,y1,x2,y2,selectedAlg,timeBetweenPerPoint){
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
		selectedAlg[1](x1,y1,x2,y2,k,timeBetweenPerPoint)
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
		selectedAlg[0](x1,y1,x2,y2,k,timeBetweenPerPoint)
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

dotset = [[2,2],[2,8],[4,8],[10,2]]
function polyfill(dotset){
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



var points = new Array()
var canDraw = false


function drawSomePoint(){
	canDraw = true
}

function drawPolygon(){
	canDraw = false
	var n = points.length
	for(var i = 0;i<n;i++){
		
		line(points[i][0],points[i][1],
			 points[(i+1+n)%n][0],points[(i+1+n)%n][1],
			 [DDALine_x,DDALine_y],200)
		log(i)
	}
}

canvas.onmousedown = function(e){
	
	if(canDraw){
		var x = e.clientX
		var y = e.clientY

		var o1 = 600
		var o2 = 576

		x1 = Math.floor((x-o1)/gridX)
		y1 = Math.floor((o2-y)/gridY)
		
		points.push([x1,y1])

		log(points)
		log(x1+','+y1)
		
		
	}
	
	
}

