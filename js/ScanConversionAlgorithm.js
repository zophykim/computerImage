var t = 0
//DDA
function DDALine_x_delay(x1,y1,x2,y2,k,interval){
			t = setTimeout(function(){
				if(y1<0){
					drawPoint(x0 + x1*gridX,y0 - parseInt(parseFloat(y1)-0.5)*gridY )
				}
				else{
					drawPoint(x0 + x1*gridX,y0 - parseInt(parseFloat(y1)+0.5)*gridY )
				}
				y1 = parseFloat(y1) + parseFloat(k)
				log('draw point: '+"X:"+x1+", Y:"+y1)
			x1++
			if(x1<=x2){
					DDALine_x_delay(x1,y1,x2,y2,k,interval)
				}
			}
			,interval)
		}
function DDALine_y_delay(x1,y1,x2,y2,k,interval){
			t = setTimeout(function(){
				if(x1<0){
					drawPoint(x0 + parseInt(parseFloat(x1)-0.5)*gridX , y0 - y1*gridY )
				}
				else{
					drawPoint(x0 + parseInt(parseFloat(x1)+0.5)*gridX , y0 - y1*gridY )
				}
				x1 = parseFloat(x1) + parseFloat(k)
				log('draw point: '+"X:"+x1+", Y:"+y1)
			y1++
			if(y1<=y2){
					DDALine_y_delay(x1,y1,x2,y2,k,interval)
				}
			}
			,interval)
		}
function DDALine_x(x1,y1,x2,y2,k,interval=100){
	log("DDA")
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
		clearTimeout(t)
		DDALine_x_delay(x1,y1,x2,y2,k,interval)
	
}
function DDALine_y(x1,y1,x2,y2,k,interval=100){
	log("DDA")
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
	clearTimeout(t)
	DDALine_y_delay(x1,y1,x2,y2,k,interval)
}
//Bresenham
function IntegerBresenhamline_x(x1,y1,x2,y2,k,interval=100){
	log("Bresenham")
	clearTimeout(t)
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dx
	var i = 0
	function IntegerBresenhamline_x_delay(){
		t = setTimeout(function(){
					log('draw point: '+"X:"+x+", Y:"+y)
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
				i++
				if(i<=dx){
					IntegerBresenhamline_x_delay()
					}   
				}

				,interval)
	}
	IntegerBresenhamline_x_delay()
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
function IntegerBresenhamline_y(x1,y1,x2,y2,k,interval=100){
	log("Bresenham")
	clearTimeout(t)
	var y = y1
	var x = x1
	var dx = x2-x1
	var dy = y2-y1
	var e = -dy
	var i = 0
	function IntegerBresenhamline_y_delay(){
		t = setTimeout(function(){
					drawPoint(x0 + x*gridX,y0 - y*gridY )
					log('draw point: '+"X:"+x+", Y:"+y)
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
						IntegerBresenhamline_y_delay()
						}   
					}

					,interval)
		}
		IntegerBresenhamline_y_delay()

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
//MidPoint Line
function Midpoint_x(x1,y1,x2,y2,k,interval=100){
	log("Midpoint")
	clearTimeout(t)
	if(k>=0){
		a = y1-y2
		b = x2-x1
		d = 2*a+b
		d1 = 2*a
		d2 = 2*(a+b)
		x = x1
		y = y1
		function Midpoint_x_delay(){
		
		t = setTimeout(function(){
			log('draw point: '+"X:"+x+", Y:"+y)
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
//			drawPoint(x0+x*gridX,y0-y*gridY)
			if(x<=x2){
				Midpoint_x_delay()
				}
			},interval)
		
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
		t = setTimeout(function(){
			log('draw point: '+"X:"+x+", Y:"+y)
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
//				drawPoint(x0+x*gridX,y0-y*gridY)
				if(x<=x2){
					Midpoint_x_delay2()
				}
			},interval)
				
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
function Midpoint_y(x1,y1,x2,y2,k,interval=100){
	log("Midpoint")
	clearTimeout(t)
	if(k>=0){
		a = x1-x2
		b = y2-y1
		d = 2*a+b
		d1 = 2*a
		d2 = 2*(a+b)
		x = x1
		y = y1
		function Midpoint_y_delay(){
		
		t = setTimeout(function(){
			log('draw point: '+"X:"+x+", Y:"+y)
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
//			drawPoint(x0+x*gridX,y0-y*gridY)
			if(y<=y2){
				Midpoint_y_delay()
			}
			},interval)
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
		
		t = setTimeout(function(){
			log('draw point: '+"X:"+x+", Y:"+y)
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
//			drawPoint(x0+x*gridX,y0-y*gridY)
			if(y<=y2){
				Midpoint_y_delay2()
			}
		},interval)
		}
		Midpoint_y_delay2()
	}
}
//MidPoint Circle
function MidPointCircle(c0=0,c1=0,r){
	c0 = c0 || 0
	c1 = c1 || 0
	log("MidpointCircle")
	var x = 0
	var y = -r
	var d = 1.25-r
	drawPoint(c0*gridX + (x*gridX+x0) , -c1*gridY + (y*gridY+y0)) //1
//	drawPoint(-y*gridX+x0,-x*gridY+y0) //2
	drawPoint(c0*gridX + (-y*gridX+x0), -c1*gridY + (x*gridY+y0)) //3
//	drawPoint(x*gridX+x0,-y*gridY+y0) //4
	drawPoint(c0*gridX + (-x*gridX+x0), -c1*gridY + (-y*gridY+y0)) //5
//	drawPoint(y*gridX+x0,x*gridY+y0) //6
	drawPoint(c0*gridX + (y*gridX+x0) , -c1*gridY + (-x*gridY+y0)) //7
//	drawPoint(-x*gridX+x0,y*gridY+y0) //8
	while(x<-y){
		if(d<0){
			d+=2*x+3
		}
		else{
			d+=2*(x+y)+5
			y++
		}
		x++
		drawPoint(c0*gridX +  (x*gridX+x0) , -c1*gridY + (y*gridY+y0 )) //1
		drawPoint(c0*gridX +  (-y*gridX+x0), -c1*gridY + (-x*gridY+y0)) //2
		drawPoint(c0*gridX +  (-y*gridX+x0), -c1*gridY + (x*gridY+y0 )) //3
		drawPoint(c0*gridX +  (x*gridX+x0) , -c1*gridY + (-y*gridY+y0)) //4
		drawPoint(c0*gridX +  (-x*gridX+x0), -c1*gridY + (-y*gridY+y0)) //5
		drawPoint(c0*gridX +  (y*gridX+x0) , -c1*gridY + (x*gridY+y0 )) //6
		drawPoint(c0*gridX +  (y*gridX+x0) , -c1*gridY + (-x*gridY+y0)) //7
		drawPoint(c0*gridX +  (-x*gridX+x0), -c1*gridY + (y*gridY+y0 )) //8
	}
}
function BersenhamCircle(c0=0,c1=0,r){
	c0 = c0 || 0
	c1 = c1 || 0
	log("BersenhamCircle")
    x=0;
    y=r;
    delta = 2*(1-r);
    while(y>=0){
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        if(delta<0){
            delta1 = 2*delta+2*y-1;
            if(delta1<=0)   direction = 1;
            else direction = 2;
        }
        else if(delta>0){
            delta2 = 2*(delta-x)+1;
            if(delta2<=0)   direction = 2;
            else direction = 3;
        }
        else direction = 2;
        switch(direction){
            case 1:
                x++;
                delta+=2*x+1;
                break;
            case 2:
                x++;
                y--;
                delta+=2*(x-y)+2;
                break;
            case 3:
                y--;
                delta+=1-2*y;
                break;
        }
    }
}

function MidPointEllipse(c0=0,c1=0,a,b){
	c0 = c0 || 0
	c1 = c1 || 0
    x=0;
    y=b;
    d1=b*b+a*a*(-b+0.25);
    while(b*b*(x+1)<a*a*(y-0.5)){
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        if(d1<0){
            d1+=b*b*(2*x+3);
            x++;
        }
        else{
            d1+=b*b*(2*x+3)+a*a*(-2*y+2);
            x++;
            y--;
        }
    }
    d2=Math.pow(b*(x+0.5),2)+Math.pow(a*(y-1),2)-Math.pow(a*b,2);
    while(y>=0){
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + ( y*gridY+y0))
        drawPoint(c0*gridX + (-x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        drawPoint(c0*gridX + ( x*gridX+x0),-c1*gridY + (-y*gridY+y0))
        if(d2<0){
            d2+=b*b*(2*x+2)+a*a*(-2*y+3);
            x++;
            y--;
        }
        else{
            d2+=a*a*(-2*y+3);
            y--;
        }
    }
} 

