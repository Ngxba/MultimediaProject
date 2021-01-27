import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PublishIcon from "@material-ui/icons/Publish";
import {
  getCannyEdgeDetectionInputImage,
  getCannyEdgeDetectionURL,
} from "../../Action/DetectionAction";
import {
  LinearProgress,
  Tabs,
  Tab,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  appDemo: {
    width: "518px",
    height: "694px",
    borderRadius: "4px",
    backgroundColor: "#f6f7fb",
    float: "left",
    padding: "20px",
  },
  appDemoContainer: {
    minWidth: "1140px",
    width: "1140px",
    margin: "0 auto",
    overflow: "hidden",
    padding: "70px 0 82px",
  },
  imageContainer: {
    width: "478px",
    height: "478px",
    margin: "0 auto 20px",
  },
  resultImageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  imageContainerResult: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  resultImage: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
    verticalAlign: "middle",
  },
  resultImageSplide: {
    // position: "absolute",
    left: "50%",
    top: "50%",
    // transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
    verticalAlign: "middle",
  },
  faceSwiper: {
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    marginBottom: "19px",
    position: "relative",
  },
  uploadContainer: {
    width: "478px",
    margin: "0 auto",
  },
  fileUpload: {
    float: "left",
    marginRight: "20px",
    width: "150px",
  },
  labelFile: {
    width: "150px",
    height: "36px",
    border: "1px solid lightgray",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // padding: "10px 20px",
  },
  inputURLSearch: {
    float: "left",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderRight: 0,
    height: "36px",
    width: "235px",
  },
  getURLResult: {
    float: "left",
    margin: 0,
    borderRadius: "0",
    borderTopRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    width: "70px",
    height: "36px",
    border: "1px solid #bbb",
    borderLeft: 0,
  },
  appResultContainer: {
    width: "600px",
    height: "694px",
    verticalAlign: "top",
    overflow: "hidden",
    float: "right",
    border: "1px solid #ddd",
    color: "#333",
  },
  returnResultJSON: {
    height: "472px",
    padding: "0 20px",
    overflow: "scroll",
  },
}));

function ImageGallery(props) {
  const [isInputImage, setIsInputImage] = useState(false);
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [inputImage, setInputImage] = useState("");
  const [outputImage, setOutputImage] = useState("");
  // const [returnResultSize, setReturnResultSize] = useState([]);
  const [returnResultJSON, setReturnResultJSON] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const primaryRef = React.createRef();
  const secondaryRef = React.createRef();

  const skeletonDetectionData = [
    {
      src:
        "https://www.faceplusplus.com/demo/images/demo-pic72.jpg",
      altImg: "result1",
      altThumb: "thumbnail1",
      detectionLocations: [
        {
          width: "113.764px",
          height: "331.732px",
          left: "241.868px",
          top: "112.808px",
        },
      ],
    },
    {
      src:
        "https://www.faceplusplus.com/demo/images/demo-pic69.jpg",
      altImg: "result2",
      altThumb: "thumbnail2",
      detectionLocations: [
        {
          width: "108.984px",
          height: "300.184px",
          left: "165.388px",
          top: "133.84px",
        },
        {
          width: "100.38px",
          height: "316.436px",
          left: "282.976px",
          top: "130.016px",
        },
      ],
    },
    {
      src:
        "https://www.faceplusplus.com/demo/images/demo-pic70.jpg",
      altImg: "result3",
      altThumb: "thumbnail3",
      detectionLocations: [
        {
          width: "154.872px",
          height: "418.728px",
          left: "86.04px",
          top: "55.448px",
        },
      ],
    },
    {
      src:
        "https://www.faceplusplus.com/demo/images/demo-pic71.jpg",
      altImg: "result4",
      altThumb: "thumbnail4",
      detectionLocations: [
        {
          width: "137.664px",
          height: "358.5px",
          left: "128.104px",
          top: "74.568px",
        },
      ],
    },
  ];

  const toggleLoading = (param) => {
    setLoading(param);
  };

  const primaryOptions = {
    type: "loop",
    width: 478,
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
  };

  const secondaryOptions = {
    type: "slide",
    width: "100%",
    rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: "center",
    isNavigation: true,
    updateOnMove: true,
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (selectorFiles) => {
    if (selectorFiles.length !== 0) {
      const file = selectorFiles[0];
      console.log(selectorFiles);
      const base64Image = await toBase64(file);
      setInputImage(base64Image);
      setIsInputImage(true);
      toggleLoading(true);
      let res;
      try {
        res = await getCannyEdgeDetectionInputImage(base64Image);
        if (res !== undefined) {
          setTimeout(() => {
            toggleLoading(false);
            setReturnResultJSON(res.size);
            setOutputImage("data:image/jpeg;base64," + res.base64Image);
          }, 1000);
          setIsUploadSuccess(true);
          setTimeout(() => {
            setIsUploadSuccess(false);
          }, 5000);
        }
      } catch {
        console.log("Erorr");
        setTimeout(() => {
          setIsInputImage(false);
          setInputImage("");
          setOutputImage("");
          setReturnResultJSON("");
          setLoading(false);
        }, 1000);
        setIsFileTooLarge(true);
        setTimeout(() => {
          setIsFileTooLarge(false);
        }, 5000);
      }
    } else {
      console.log("Error file input");
    }
  };

  useEffect(() => {
    primaryRef.current.sync(secondaryRef.current.splide);
    secondaryRef.current.sync(primaryRef.current.splide);
    // forthRef.current.sync(thirdRef.current.splide)
    toggleLoading(true);
    setTimeout(() => {
      toggleLoading(false);
    }, 1500);
  }, []);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  function checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  const handleImgURL = async () => {
    setIsInputImage(true);
    toggleLoading(true);
    let res;
    if (checkURL(imgURL)) {
      try {
        res = await getCannyEdgeDetectionURL(imgURL);
        setInputImage(imgURL);
        if (res !== undefined) {
          setTimeout(() => {
            toggleLoading(false);
            setOutputImage("data:image/jpeg;base64," + res.base64Image);
            setReturnResultJSON(res.size);
          }, 1000);
          setIsUploadSuccess(true);
          setTimeout(() => {
            setIsUploadSuccess(false);
          }, 5000);
        }
      } catch {
        setTimeout(() => {
          setIsInputImage(false);
          setInputImage("");
          setOutputImage("");
          setReturnResultJSON("");
          setLoading(false);
        }, 1000);
        setIsFileTooLarge(true);
        setTimeout(() => {
          setIsFileTooLarge(false);
        }, 5000);
      }
    } else {
      setTimeout(() => {
        setIsInputImage(false);
        setInputImage("");
        setOutputImage("");
        setReturnResultJSON("");
        setLoading(false);
      }, 1000);
      setIsFileTooLarge(true);
      setTimeout(() => {
        setIsFileTooLarge(false);
      }, 5000);
    }
  };
  // cần sửa

  const classes = useStyles();
  return (
    <React.Fragment>
      {isFileTooLarge && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            width: "100%",
            padding: "0 30%",
            zIndex: 3,
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Your image file is to large or not valid —{" "}
            <strong>check it out!</strong>
          </Alert>
        </div>
      )}
      {isUploadSuccess && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            width: "100%",
            padding: "0 30%",
            zIndex: 3,
          }}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is a success alert — <strong>check it out!</strong>
          </Alert>
        </div>
      )}
      <div className={classes.appDemoContainer}>
        {/* <img id="imgURLimg" src={imgURL} style={{ display: "none" }} /> */}
        <div className={classes.appDemo}>
          <div>
            <div className={classes.imageContainer}>
              <div className={classes.resultImageContainer}>
                <div className={classes.imageContainerResult}>
                  <div
                    className={loading ? "blurImg" : ""}
                    style={
                      isInputImage ? { display: "block" } : { display: "none" }
                    }
                  >
                    <img
                      className={classes.resultImage}
                      src={inputImage}
                      alt="bla"
                    />
                  </div>
                  <div
                    style={
                      isInputImage ? { display: "none" } : { display: "block" }
                    }
                  >
                    <div className={loading ? "blurImg" : ""}>
                      <Splide options={primaryOptions} ref={primaryRef} onChange={(e) => {console.log(e)}}>
                        {/* Map */}
                        {skeletonDetectionData.map((data, i) => (
                          <SplideSlide key={i}>
                            <img
                              className={classes.resultImageSplide}
                              src={data.src}
                              alt={data.altImg}
                            />
                            {!loading &&
                              data.detectionLocations.map((item, i) => (
                                <div
                                  key={"location" + i}
                                  style={{
                                    position: "absolute",
                                    outline: "rgb(74, 171, 232) solid 2px",
                                    zIndex: 1,
                                    transform: "rotateZ(0deg)",
                                    width: item.width,
                                    height: item.height,
                                    left: item.left,
                                    top: item.top,
                                  }}
                                ></div>
                              ))}
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classes.faceSwiper}
              onClick={() => {
                setIsInputImage(false);
                setInputImage("");
                setOutputImage("");
                setReturnResultJSON("");
              }}
            >
              <Splide options={secondaryOptions} ref={secondaryRef}>
                {skeletonDetectionData.map((data, i) => (
                  <SplideSlide key={i}>
                    <img src={data.src} alt={data.altThumb} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
            <div className={classes.uploadContainer}>
              <div className={classes.fileUpload}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <input
                    type={"file"}
                    id="file"
                    accept={"image/png, image/jpeg"}
                    style={{ display: "none" }}
                    // onChange={(e) => handleChange(e.target.files)}
                    onInput={(e) => handleChange(e.target.files)}
                  />
                  <label htmlFor="file" className={classes.labelFile}>
                    <PublishIcon style={{ marginRight: "10px" }} />
                    Upload file
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className={classes.inputURLSearch}
                  placeholder="  Image URL"
                  value={imgURL}
                  onChange={(event) => {
                    setImgURL(event.target.value);
                  }}
                />
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    className={classes.getURLResult}
                    onClick={handleImgURL}
                  >
                    GO
                  </button>
                </div>
              </div>
              <br />
              {loading && (
                <div>
                  <LinearProgress />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bên phải */}
        <div className={classes.appResultContainer}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Result" />
              <Tab label="Response JSON" />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            {loading && (
              <div>
                <LinearProgress />
              </div>
            )}
            <br />
            <hr />
            {loading ? (
              <div></div>
            ) : (
              <div
                className={classes.returnResultJSON}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {returnResultJSON === "" ? (
                  <Typography>
                    Please input your image to see possible{" "}
                    <strong>Edge(s) Detection</strong>
                  </Typography>
                ) : (
                  <>
                    <Typography>
                      <strong>Edge detected succesfull </strong>
                    </Typography>
                    <br/>
                    <div className={classes.resultImageContainer}>
                      <div className={classes.imageContainerResult} style={{display: "flex"}}>
                        <img
                          className={classes.resultImage}
                          src={outputImage}
                          alt="bla"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className={classes.returnResultJSON}>
              {loading ? (
                <div>
                  <LinearProgress />
                </div>
              ) : (
                <Typography variant="body1" component="h2">
                  <pre>{JSON.stringify(returnResultJSON, undefined, 2)}</pre>
                </Typography>
              )}
            </div>
          </TabPanel>
        </div>
      </div>
    </React.Fragment>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default ImageGallery;
