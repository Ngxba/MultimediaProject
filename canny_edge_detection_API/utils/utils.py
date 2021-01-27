import numpy as np
import skimage
import matplotlib.pyplot as plt 
import matplotlib.image as mpimg
import os
import scipy.misc as sm
from PIL import Image, ImageDraw
import base64
import io

def rgb2gray(rgb):

    r, g, b = rgb[:,:,0], rgb[:,:,1], rgb[:,:,2]
    gray = 0.2989 * r + 0.5870 * g + 0.1140 * b

    return gray

def load_data(dir_name = 'faces_imgs'):    
    '''
    Load images from the "faces_imgs" directory
    Images are in JPG and we convert it to gray scale images
    '''
    imgs = []
    for filename in os.listdir(dir_name):
        if os.path.isfile(dir_name + '/' + filename):
            if filename == '.DS_Store':
                continue
            # img = mpimg.imread(dir_name + '/' + filename)
            # img = rgb2gray(img)
            # imgs.append(img)
            image = Image.open(dir_name + '/' + filename)
            image = np.array(image)
            try:
                w, h, d = image.shape
            except: 
                continue
            img_size = Image.fromarray(image)
            size = img_size.size
            print(size)
            imgs.append(image)
    return imgs

def load_singleImage(base64_img):
    imgs = []
    base64_decoded = base64.b64decode(base64_img)
    image = Image.open(io.BytesIO(base64_decoded))
    image = np.array(image)
    img_size = Image.fromarray(image)
    size = img_size.size
    imgs.append(image)
    return size, imgs

def visualize(imgs, format=None, gray=False, title=""):
    plt.figure(figsize=(20, 40))
    for i, img in enumerate(imgs):
        if gray:
            img = rgb2gray(img) #convert to gray
        if img.shape[0] == 3:
            img = img.transpose(1,2,0)
        plt_idx = i+1
        plt.subplot(2, 2, plt_idx)
        plt.imshow(img, format)
    if title != "":
        plt.title(title)
    plt.show()


    