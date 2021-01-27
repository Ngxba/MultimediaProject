from scipy import ndimage
from scipy.ndimage.filters import convolve
from scipy import misc
import numpy as np

# %pylab inline
import matplotlib.pyplot as plt 
import numpy as np
import matplotlib.image as mpimg
import os
import scipy.misc as sm
import skimage
import io
from PIL import Image, ImageDraw
import base64
import cv2
import utils.utils as utils

# shape: cao x rộng
def rgb2gray(rgb):

    r, g, b = rgb[:,:,0], rgb[:,:,1], rgb[:,:,2]
    gray = 0.2989 * r + 0.5870 * g + 0.1140 * b

    return gray

def convolution(image, kernel, average=False, verbose=False):
    if verbose:
        utils.visualize(image, 'gray')
        # plt.title("Image")
        # plt.show()

    image_row, image_col = image.shape
    kernel_row, kernel_col = kernel.shape

    output = np.zeros(image.shape)

    pad_height = int((kernel_row - 1) / 2)
    pad_width = int((kernel_col - 1) / 2)

    padded_image = np.zeros((image_row + (2 * pad_height), image_col + (2 * pad_width)))

    # set image for padded img
    padded_image[pad_height:padded_image.shape[0] - pad_height, pad_width:padded_image.shape[1] - pad_width] = image

    if verbose:
        utils.visualize(padded_image, 'gray', title = "Padded Image")
        # plt.title()
        # plt.show()

    for row in range(image_row):
        for col in range(image_col):
            output[row, col] = np.sum(kernel * padded_image[row:row + kernel_row, col:col + kernel_col])
            if average:
                output[row, col] /= kernel.shape[0] * kernel.shape[1]

    print("SHAPE CALCULATED : {}".format(output.shape))

    if verbose:
        utils.visualize(output, 'gray', title = "OUTPUT IMG {}GAUSSIAN {}KERNAL".format(kernel_row, kernel_col))
        # utils.title("OUTPUT IMG {}GAUSSIAN {}KERNAL".format(kernel_row, kernel_col))
        # plt.show()

    return output

class cannyEdgeDetector:
    def __init__(self, imgs, sigma=1, kernel_size=5, weak_pixel=75, strong_pixel=255, lowthreshold=0.05, highthreshold=0.15, useCVConvolution = False):
        # if (len(self.imgs) > 1):
        #     self.imgs = imgs
        self.imgs = imgs
        self.imgs_final = []
        self.img_smoothed = None
        self.gradientMat = None
        self.thetaMat = None
        self.nonMaxImg = None
        self.thresholdImg = None
        self.weak_pixel = weak_pixel
        self.strong_pixel = strong_pixel
        self.sigma = sigma
        self.kernel_size = kernel_size
        self.lowThreshold = lowthreshold
        self.highThreshold = highthreshold
        self.useCVConvolution = useCVConvolution
        return 
    
    def gaussian_kernel(self, size, sigma=1):
        size = int(size) // 2
        x, y = np.mgrid[-size:size+1, -size:size+1]
        normal = 1 / (2.0 * np.pi * sigma**2)
        g =  np.exp(-((x**2 + y**2) / (2.0*sigma**2))) * normal
        return g
    
    def sobel_filters(self, img):
        Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], np.float32)
        Ky = np.array([[1, 2, 1], [0, 0, 0], [-1, -2, -1]], np.float32)

        Ix = ndimage.filters.convolve(img, Kx)
        Iy = ndimage.filters.convolve(img, Ky)

        G = np.hypot(Ix, Iy)
        G = G / G.max() * 255
        theta = np.arctan2(Iy, Ix)
        return (G, theta)
    

    def non_max_suppression(self, img, D):
        M, N = img.shape
        Z = np.zeros((M,N), dtype=np.int32)
        angle = D * 180. / np.pi    
        angle[angle < 0] += 180

        # heigh
        for i in range(1,M-1):
            # row size
            for j in range(1,N-1):
                try:
                    q = 255
                    r = 255
                    # Sai số quanh 22.5
                   #angle 0
                    if (0 <= angle[i,j] < 22.5) or (157.5 <= angle[i,j] <= 180):
                        q = img[i, j+1]
                        r = img[i, j-1]
                    #angle 45
                    elif (22.5 <= angle[i,j] < 67.5):
                        q = img[i+1, j-1]
                        r = img[i-1, j+1]
                    #angle 90
                    elif (67.5 <= angle[i,j] < 112.5):
                        q = img[i+1, j]
                        r = img[i-1, j]
                    #angle 135
                    elif (112.5 <= angle[i,j] < 157.5):
                        q = img[i-1, j-1]
                        r = img[i+1, j+1]

                    if (img[i,j] >= q) and (img[i,j] >= r):
                        Z[i,j] = img[i,j]
                    else:
                        Z[i,j] = 0


                except IndexError as e:
                    pass

        return Z

    def threshold(self, img):

        highThreshold = img.max() * self.highThreshold
        lowThreshold = highThreshold * self.lowThreshold

        M, N = img.shape
        res = np.zeros((M,N), dtype=np.int32)

        weak = np.int32(self.weak_pixel)
        strong = np.int32(self.strong_pixel)

        strong_i, strong_j = np.where(img >= highThreshold) #trả ra hàng i cột j tương ứng
        zeros_i, zeros_j = np.where(img < lowThreshold)

        weak_i, weak_j = np.where((img <= highThreshold) & (img >= lowThreshold))

        res[strong_i, strong_j] = strong
        res[weak_i, weak_j] = weak

        return (res)

    def hysteresis(self, img):

        M, N = img.shape
        weak = self.weak_pixel
        strong = self.strong_pixel

        for i in range(1, M-1):
            for j in range(1, N-1):
                if (img[i,j] == weak):
                    try:
                        if ((img[i+1, j-1] == strong) or (img[i+1, j] == strong) or (img[i+1, j+1] == strong)
                            or (img[i, j-1] == strong) or (img[i, j+1] == strong)
                            or (img[i-1, j-1] == strong) or (img[i-1, j] == strong) or (img[i-1, j+1] == strong)):
                            img[i, j] = strong
                        else:
                            img[i, j] = 0
                    except IndexError as e:
                        pass

        return img
    
    def detect(self, convertBase64 = False):
        if(len(self.imgs) == 1):
            if convertBase64:
                img = rgb2gray(self.imgs[0]) #convert to gray
                if self.useCVConvolution:
                    self.img_smoothed = convolve(img, self.gaussian_kernel(self.kernel_size, self.sigma))
                else:
                    self.img_smoothed = convolution(img, self.gaussian_kernel(self.kernel_size, self.sigma), average=True, verbose=False)
                self.gradientMat, self.thetaMat = self.sobel_filters(self.img_smoothed)
                self.nonMaxImg = self.non_max_suppression(self.gradientMat, self.thetaMat)
                self.thresholdImg = self.threshold(self.nonMaxImg)
                img_final = self.hysteresis(self.thresholdImg)
                self.imgs_final.append(img_final)
                # print("OK")
                # background = Image.new("RGB", img_final.size, (255, 255, 255))
                # background.paste(img_final, mask=img_final.split()[3]) # 3 is the alpha channel

                pil_img = Image.fromarray(img_final)
                pil_img = pil_img.convert("L")
                buff = io.BytesIO()
                pil_img.save(buff, format="PNG")
                new_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")

                return self.imgs_final, new_image_string
            else:
                img = rgb2gray(self.imgs[0]) #convert to gray
                if self.useCVConvolution:
                    self.img_smoothed = convolve(img, self.gaussian_kernel(self.kernel_size, self.sigma))
                else:
                    self.img_smoothed = convolution(img, self.gaussian_kernel(self.kernel_size, self.sigma), average=True, verbose=False)
                self.gradientMat, self.thetaMat = self.sobel_filters(self.img_smoothed)
                self.nonMaxImg = self.non_max_suppression(self.gradientMat, self.thetaMat)
                self.thresholdImg = self.threshold(self.nonMaxImg)
                img_final = self.hysteresis(self.thresholdImg)
                return img_final

        else:
            for i, img in enumerate(self.imgs): 
                img = rgb2gray(img) #convert to gray
                if self.useCVConvolution:
                    self.img_smoothed = convolve(img, self.gaussian_kernel(self.kernel_size, self.sigma))
                else:
                    self.img_smoothed = convolution(img, self.gaussian_kernel(self.kernel_size, self.sigma), average=True, verbose=False)
                self.gradientMat, self.thetaMat = self.sobel_filters(self.img_smoothed)
                self.nonMaxImg = self.non_max_suppression(self.gradientMat, self.thetaMat)
                self.thresholdImg = self.threshold(self.nonMaxImg)
                img_final = self.hysteresis(self.thresholdImg)
                self.imgs_final.append(img_final)
            return self.imgs_final
            

        # arr = np.array()
        


