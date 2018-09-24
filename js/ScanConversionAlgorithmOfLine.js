function DDALine_x_delay(x1,y1,x2,y2,k){
			setTimeout(function(){
				if(y1<0){
					drawPoint(x0 + x1*gridX,y0 - parseInt(parseFloat(y1)-0.5)*gridY )
				}
				else{
					drawPoint(x0 + x1*gridX,y0 - parseInt(parseFloat(y1)+0.5)*gridY )
				}
				y1 = parseFloat(y1) + parseFloat(k)
				log('draw point')
			x1++
			log("X1:"+x1+"Y1:"+y1)
			if(x1<=x2){
					DDALine_x_delay(x1,y1,x2,y2,k)
				}
			}
			,200)
		}
function DDALine_y_delay(x1,y1,x2,y2,k){
			setTimeout(function(){
				if(x1<0){
					drawPoint(x0 + parseInt(parseFloat(x1)-0.5)*gridX , y0 - y1*gridY )
				}
				else{
					drawPoint(x0 + parseInt(parseFloat(x1)+0.5)*gridX , y0 - y1*gridY )
				}
				x1 = parseFloat(x1) + parseFloat(k)
				log('draw point')
			y1++
			log("X1:"+x1+"Y1:"+y1)
			if(y1<=y2){
					DDALine_y_delay(x1,y1,x2,y2,k)
				}
			}
			,200)
		}
function DDALine_x(x1,y1,x2,y2,k){
//	j = x1
//	for(let i = x1;i<=x2;i++){
//				if(j<0){
//					doSetTimeout(x0 + i*gridX,y0 - parseInt(parseFloat(j)-0.5)*gridY,i)
//				}
//				else{
//					doSetTimeout(x0 + i*gridX,y0 - parseInt(parseFloat(j)+0.5)*gridY ,i)
//				}
//				j = parseFloat(j) + parseFloat(k)
//				log('draw point')
		DDALine_x_delay(x1,y1,x2,y2,k)
	
}
function DDALine_y(x1,y1,x2,y2,k){
//	j = x1
//		
//	for(let i = y1;i<=y2;i++){
//		if(j<0){
//			drawPoint(x0 + parseInt(parseFloat(j)-0.5)*gridX , y0 - i*gridY )
//		}
//		else{
//			drawPoint(x0 + parseInt(parseFloat(j)+0.5)*gridX , y0 - i*gridY )
//		}
//		j = parseFloat(j) + parseFloat(k)
//		log('draw point')
//	}
	DDALine_y_delay(x1,y1,x2,y2,k)
}
function IntegerBresenhamline_x(x1,y1,x2,y2,k){
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dx
	var i = 0
	function IntegerBresenhamline_x_delay(x1,y1,x2,y2,k){
		setTimeout(function(){
					drawPoint(x0 + x*gridX,y0 - y*gridY )
					log(i)
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
				i++
				if(i<=dx){
					IntegerBresenhamline_x_delay(x1,y1,x2,y2,k)
					}   
				}

				,200)
	}
	IntegerBresenhamline_x_delay(x1,y1,x2,y2,k)
//	for(let i = 0;i<= dx;i++){
//		drawPoint(x0 + x*gridX,y0 - y*gridY )
//		x++
//		e += 2 * dy
//		if(dy/dx>=0){
//			if(e>=0){
//				y++
//				e-=2*dx
//			}
//		}
//		else{
//			if(e<=-2*dx){
//				y--
//				e+=2*dx
//			}
//		}
//	}
	
}
function IntegerBresenhamline_y(x1,y1,x2,y2,k){
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dy
	var i = 0
	function IntegerBresenhamline_y_delay(x1,y1,x2,y2,k){
		setTimeout(function(){
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
					i++
					if(i<=dy){
						IntegerBresenhamline_y_delay(x1,y1,x2,y2,k)
						}   
					}

					,200)
		}
		IntegerBresenhamline_y_delay(x1,y1,x2,y2,k)

//	for(let i = 0;i<= dy;i++){
//		drawPoint(x0 + x*gridX,y0 - y*gridY )
//		y++
//		e += 2 * dx
//		if(dx/dy>=0){
//			if(e>=0){
//				x++
//				e-=2*dy
//			}
//		}
//		else{
//			if(e<=-2*dy){
//				x--
//				e+=2*dy
//			}
//		}
//	}
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
		function Midpoint_x_delay(){
		
		setTimeout(function(){
			drawPoint(x0+x*gridX,y0-y*gridY)
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
			if(x<x2){
				Midpoint_x_delay()
				log(x)
				}
			},200)
		
		}
		Midpoint_x_delay()	
	}
	else{
		a = y1-y2
		b = x2-x1
		d = 2*a-b
		d1 = 2*a
		d2 = 2*(a-b)
		x = x1
		y = y1
		function Midpoint_x_delay2(){
		setTimeout(function(){
		
			drawPoint(x0+x*gridX,y0-y*gridY)
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
				if(x<x2){
					Midpoint_x_delay2()
				}
			},200)
				
		}
		Midpoint_x_delay2()
	}
	
	
	
	
	
	
//	if(k>=0){
//		a = y1-y2
//		b = x2-x1
//		d = 2*a+b
//		d1 = 2*a
//		d2 = 2*(a+b)
//		x = x1
//		y = y1
//		drawPoint(x0+x*gridX,y0-y*gridY)
//		while(x<x2){
//			if(d<0){
//				x++
//				y++
//				d+=d2
//			}
//			else{
//				x++
//				d+=d1
//			}
//			drawPoint(x0+x*gridX,y0-y*gridY)
//		}
//	}
//	else{
//		a = y1-y2
//		b = x2-x1
//		d = 2*a-b
//		d1 = 2*a
//		d2 = 2*(a-b)
//		x = x1
//		y = y1
//		drawPoint(x0+x*gridX,y0-y*gridY)
//		while(x<x2){
//			if(d<0){
//				x++
//				d+=d1
//			}
//			else{
//				x++
//				y--
//				d+=d2
//			}
//			drawPoint(x0+x*gridX,y0-y*gridY)
//		}
//	}
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
		function Midpoint_y_delay(){
		
		setTimeout(function(){
		drawPoint(x0+x*gridX,y0-y*gridY)
		
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
			if(y<y2){
				Midpoint_y_delay()
			}
			},200)
		}
		Midpoint_y_delay()
	}
	else{
		a = x1-x2
		b = y2-y1
		d = 2*a-b
		d1 = 2*a
		d2 = 2*(a-b)
		x = x1
		y = y1
		function Midpoint_y_delay2(){
		
		setTimeout(function(){
		drawPoint(x0+x*gridX,y0-y*gridY)
		
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
			if(y<y2){
				Midpoint_y_delay2()
			}
		},200)
		}
		Midpoint_y_delay2()
	}
}