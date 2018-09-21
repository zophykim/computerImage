from pymouse import PyMouse
from pykeyboard import PyKeyboard
import time
m = PyMouse()
k = PyKeyboard()
'''# pressing a key
k.press_key('H')
# which you then follow with a release of the key
k.release_key('H')
# or you can 'tap' a key which does both
k.tap_key('e')
# note that that tap_key does support a way of     repeating keystrokes with a interval time between each
k.tap_key('l',n=2,interval=1) 
# and you can send a string if needed too
k.type_string('o World!')

k.press_key(k.alt_key)
k.tap_key(k.tab_key)
k.release_key(k.alt_key)
k.tap_key(k.function_keys[5]) # Tap F5
k.tap_key(k.numpad_keys['Home']) # Tap 'Home' on the numpad
k.tap_key(k.numpad_keys[5], n=3) # Tap 5 on the numpad, thrice
'''
'''
k.press_keys([k.windows_l_key,'d'])
x_dim, y_dim = m.screen_size()
time.sleep(0.5)
m.click(x_dim//2,y_dim//2,2,1)
time.sleep(0.5)
k.press_key('w')
time.sleep(0.5)
m.click(1100,580,1,2)
time.sleep(1)
m.click(768,488,1,1)
time.sleep(0.5)
k.type_string('Worldline')
k.tap_key(k.enter_key)
time.sleep(1)
k.tap_key(k.enter_key)
time.sleep(2)
k.type_string('hhh')
k.tap_key(k.space_key)
'''
if state=
    k.tap_key('c')
