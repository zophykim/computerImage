var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')

function drawRect(i,j,GRID_WIDTH,GRID_HEIGHT){
	context.lineWidth=1
	context.strokeStyle = "#82a6f5"
	context.strokeRect(i*GRID_WIDTH,j*GRID_HEIGHT,GRID_WIDTH,GRID_HEIGHT)
}
function drawAxis(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT){
	var xAxis = parseInt(parseInt(CANVAS_WIDTH/GRID_WIDTH)/2)*GRID_WIDTH
	var yAxis = parseInt(parseInt(CANVAS_HEIGHT/GRID_HEIGHT)/2)*GRID_HEIGHT
	log(parseInt(CANVAS_WIDTH/GRID_WIDTH))
	log(parseInt(CANVAS_HEIGHT/GRID_HEIGHT))
	log(xAxis)
	log(yAxis)
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
		}
	}
	drawAxis(CANVAS_WIDTH,CANVAS_HEIGHT,GRID_WIDTH,GRID_HEIGHT)
}


function drawLine(){
	var x1 = document.getElementById("x1").innerHTML;
	var y1 = document.getElementById("y1").innerHTML;
	var x2 = document.getElementById("x2").innerHTML;
	var y2 = document.getElementById("y2").innerHTML;
	log(x1)
	log(y1)
}
