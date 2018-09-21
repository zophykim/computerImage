import numpy as np
from matplotlib.pyplot import imshow
import time
from PIL import ImageGrab
from IPython.display import Image
def screen_shot(file_path,im_num,x1=0,y1=-0,x2=1536,y2=864,interval=0.5):
    for i in range(im_num):
        time.sleep(interval)
        im = ImageGrab.grab((x1,y1,x2,y2))
        im.save(file_path+'\\'+str(i)+'.jpg')
        Image(filename=file_path+'\\'+str(i)+'.jpg')
    return im_num

file_path = 'C:\\Users\\Administrator\\Desktop\\test'
screen_shot(file_path,20)
