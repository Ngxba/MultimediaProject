import axios from "axios";
import { backEndLink } from "../config.js";

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// Canny Edge Detection
export const getCannyEdgeDetectionInputImage = async (base64Image) => {
  const user_id = "testing_id";
  const res = await axios.post(
    `${backEndLink}/CannyEdgeDetection/handleBase64Image`,
    { base64Image, user_id }
  );
  if (res.status === 200) {
    return res.data;
  } else {
    console.log("can't reach API");
    throw new Error("Cannot reach API", res);
  }
};

export const getCannyEdgeDetectionURL = async (URLImage) => {
  const user_id = "testing_id";
  const res = await axios.post(
    `${backEndLink}/CannyEdgeDetection/handleURLImage`,
    { URLImage, user_id }
  );
  if (res.status === 200) {
    return res.data;
  } else {
    console.log("can't reach API");
    throw new Error("Cannot reach API", res);
  }
};