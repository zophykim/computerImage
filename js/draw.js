var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var x0 = 0
var y0 = 0
var gridX = 0
var gridY = 0
var fontsize = ""
var j = 0
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
	log(rows)
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
	log('--------------init----------------')
	
	
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
	log('index:'+index)
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
	var x1 = parseInt(document.getElementById("x1").value)
	var y1 = parseInt(document.getElementById("y1").value)
	var x2 = parseInt(document.getElementById("x2").value)
	var y2 = parseInt(document.getElementById("y2").value)
	var k = (y2-y1)/(x2-x1)
	
	log('x1:'+x1+',y1:'+y1+';x2:'+x2+',y2:'+y2+'; k:'+k)
	log('x0:'+x0+',y0'+y0)
	
	log(typeof x2)
	
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
		selectedAlg[1](x1,y1,x2,y2,k,50)
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
		selectedAlg[0](x1,y1,x2,y2,k,50)
	}
	
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
function drawCircle(){
	var c0 = parseInt(document.getElementById("x0").value)
	var c1 = parseInt(document.getElementById("y0").value)
	var r = parseInt(document.getElementById("r").value)
	context.clearRect(0,0,canvas.width,canvas.height)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
	MidPointCircle(c0,c1,r)
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
