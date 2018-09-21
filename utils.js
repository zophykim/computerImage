var log = console.log.bind(console)
		var imageload = function(path){
			var img = new Image()
			img.src = path
			return img
		}
		var rectIntersects = function(a,b){
			
			if(b.x > a.x && b.x < a.x + a.imge.width){
					if(b.y > a.y && b.y < a.y + a.imge.height){
						log('bbbbbb')
						return true	
					}
				}						
					return false
			}  
		var rectIntersects2 = function(a,b){
			
			if(b.x + b.imge.width > a.x && b.x + b.imge.width < a.x + a.imge.width){
					if(b.y > a.y && b.y < a.y + a.imge.height){
						log('aaaaaaa')
						return true	 
					}
				}						
					return false
			} // JavaScript Document
		
		