import os
import time

normal_display_path = os.path.join("Normal/Display")
fever_display_path = os.path.join("Fever/Display")
print('File Manager Running...')


while(True):
    normals_list = os.listdir(normal_display_path)
    ferver_list = os.listdir(fever_display_path)

    if(len(normals_list) > 12):
        sorted_list = sorted(ferver_list)
        os.remove(normal_display_path+'/'+sorted_list[0])
        os.remove(normal_display_path+'/'+sorted_list[1])

    if(len(ferver_list) > 2):
        sorted_list = sorted(ferver_list)
        os.remove(fever_display_path+'/'+sorted_list[0])
        os.remove(fever_display_path+'/'+sorted_list[1])

    time.sleep(0.3)

