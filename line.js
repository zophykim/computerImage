var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
var x0 = 0
var y0 = 0
var gridX = 0
var gridY = 0
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
	var rows = parseInt(CANVAS_WIDTH/GRID_WIDTH)
	var cols = parseInt(CANVAS_HEIGHT/GRID_HEIGHT)
	for(var i = 0;i<rows;++i)
	{
		
		for(var j = 0;j < cols;++j)
		{
			
			drawRect(i,j,GRID_WIDTH,GRID_HEIGHT)
//			if(i==rows-1){
//				if(i<=rows/2){
//					context.strokeText(rows/2-j,i*GRID_WIDTH,j*GRID_HEIGHT);
//				}
//				else{
//					context.strokeText(j-rows/2,i*GRID_WIDTH,j*GRID_HEIGHT);
//				}
//			}
			
		}
		
	}
	drawAxis(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT)
	log('--------------init----------------')
	
	
}

function drawPoint(x,y){
	context.fillStyle = 'red';
    context.fillRect(x, y-GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
}
var j = 0

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
		selectedAlg[1](x1,y1,x2,y2,k)
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
		selectedAlg[0](x1,y1,x2,y2,k)
	}
	
	drawGrid(canvas.width,canvas.height,gridX,gridY)
}
function DDALine_x(x1,y1,x2,y2,k){
	j = y1
		
	for(let i = x1;i<=x2;i++){
		log('i:'+i)
		log('j:'+j)
		if(j<0){
			drawPoint(x0 + i*gridX,y0 - parseInt(parseFloat(j)-0.5)*gridY )
		}
		else{
			drawPoint(x0 + i*gridX,y0 - parseInt(parseFloat(j)+0.5)*gridY )
		}
		j = parseFloat(j) + parseFloat(k)
		log('draw point')
	}
}
function DDALine_y(x1,y1,x2,y2,k){
	j = x1
		
	for(let i = y1;i<=y2;i++){
		log('i:'+i)
		log('j:'+j)
		if(j<0){
			drawPoint(x0 + parseInt(parseFloat(j)-0.5)*gridX , y0 - i*gridY )
		}
		else{
			drawPoint(x0 + parseInt(parseFloat(j)+0.5)*gridX , y0 - i*gridY )
		}
		j = parseFloat(j) + parseFloat(k)
		log('draw point')
	}
		
}
function IntegerBresenhamline_x(x1,y1,x2,y2,k){
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dx
	for(let i = 0;i<= dx;i++){
		drawPoint(x0 + x*gridX,y0 - y*gridY )
		x++
		e += 2 * dy
		if(dy/dx>=0){
			if(e>=0){
				y++
				e-=2*dx
			}
		}
		else{
			if(e<=-2*dx){
				y--
				e+=2*dx
			}
		}
	}
}
function IntegerBresenhamline_y(x1,y1,x2,y2,k){
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dy
	
	for(let i = 0;i<= dy;i++){
		drawPoint(x0 + x*gridX,y0 - y*gridY )
		y++
		e += 2 * dx
		if(dx/dy>=0){
			if(e>=0){
				x++
				e-=2*dy
			}
		}
		else{
			if(e<=-2*dy){
				x--
				e+=2*dy
			}
		}
	}
}
function Midpoint_x(x1,y1,x2,y2,k){

	if(k>=0){
		a = y1-y2
		b = x2-x1
		d = 2*a+b
		d1 = 2*a
		d2 = 2*(a+b)
		x = x1
		y = y1
		drawPoint(x0+x*gridX,y0-y*gridY)
		while(x<x2){
			if(d<0){
				x++
				y++
				d+=d2
			}
			else{
				x++
				d+=d1
			}
			drawPoint(x0+x*gridX,y0-y*gridY)
		}
	}
	else{
		a = y1-y2
		b = x2-x1
		d = 2*a-b
		d1 = 2*a
		d2 = 2*(a-b)
		x = x1
		y = y1
		drawPoint(x0+x*gridX,y0-y*gridY)
		while(x<x2){
			if(d<0){
				x++
				d+=d1
			}
			else{
				x++
				y--
				d+=d2
			}
			drawPoint(x0+x*gridX,y0-y*gridY)
		}
	}
}
function Midpoint_y(x1,y1,x2,y2,k){
	if(k>=0){
		a = x1-x2
		b = y2-y1
		d = 2*a+b
		d1 = 2*a
		d2 = 2*(a+b)
		x = x1
		y = y1
		drawPoint(x0+x*gridX,y0-y*gridY)
		while(y<y2){
			if(d<0){
				x++
				y++
				d+=d2
			}
			else{
				y++
				d+=d1
			}
			drawPoint(x0+x*gridX,y0-y*gridY)
		}
	}
	else{
		a = x1-x2
		b = y2-y1
		d = 2*a-b
		d1 = 2*a
		d2 = 2*(a-b)
		x = x1
		y = y1
		drawPoint(x0+x*gridX,y0-y*gridY)
		while(y<y2){
			if(d<0){
				y++
				d+=d1
			}
			else{
				y++
				x--
				d+=d2
			}
			drawPoint(x0+x*gridX,y0-y*gridY)
		}
	}
}