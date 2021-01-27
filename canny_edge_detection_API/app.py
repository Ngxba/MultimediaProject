from flask import Flask, request
import canny_edge_detector as ced
from utils import utils
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/CannyEdgeDetection', methods=["GET", "POST"])
def CannyEdgeDetection():
    if request.method == 'POST':
        data = request.get_json()
        # print(data)
        x = data["base64Image"].split(",")
        base64_img = x[1]
        size, imgs = utils.load_singleImage(base64_img)
        detector = ced.cannyEdgeDetector(imgs, sigma=1.4, kernel_size=5, lowthreshold=0.09, highthreshold=0.17, weak_pixel=100)
        imgs_final, base64_img_string = detector.detect(convertBase64=True)
        return_dict = {
            "base64Image": base64_img_string,
            "size": size
        }
        print("OK")
        # print(locations)
    return(json.dumps(return_dict))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)