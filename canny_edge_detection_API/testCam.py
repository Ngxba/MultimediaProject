import cv2
import canny_edge_detector as ced
import numpy as np

cap = cv2.VideoCapture(0)
while True:
    ret, img = cap.read()
    
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # blur = cv2.GaussianBlur(gray, (5, 5), 0)
    # canny = cv2.Canny(blur, 10, 70)
    # ret, mask = cv2.threshold(canny, 70, 255, cv2.THRESH_BINARY)
    detector = ced.cannyEdgeDetector([img], sigma=1.4, kernel_size=5, lowthreshold=0.09, highthreshold=0.17, weak_pixel=100, useCVConvolution=True)
    mask = detector.detect()
    print(mask)
    mask = np.array(mask, dtype=np.uint8)
    cv2.imshow('Video feed', mask)
    
    if cv2.waitKey(1) == 13:
        break
cap.release()
cv2.destroyAllWindows()