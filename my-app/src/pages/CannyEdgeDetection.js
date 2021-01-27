import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../modules/components/Button";
import Typography from "../modules/components/TypographyApplication.js";
import { Link } from "react-router-dom";
import ApplicationPageLayout from "../modules/views/ApplicationPageLayout";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ImageGallery from "../modules/views/ImageGalleryCannyEdgeDetection";
import {linkImageScence1, linkImageScence2 , linkIcon1, linkIcon2, linkIcon3, linkBanner3, linkIcon4} from "./dataStatic"

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${linkBanner3})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  grayBackground: {
    backgroundColor: "#dddddd",
    padding: "50px 0",
    marginBottom: "50px",
  },
  benefitImg: {
    width: "96px",
    height: "96px",
  },
});

function SkeletonDetection(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <ApplicationPageLayout backgroundClassName={classes.background}>
        <div>
          <Typography
            data-aos="fade-right"
            color="inherit"
            align="left"
            variant="h2"
            marked="left"
          >
            Canny Edge Detection
          </Typography>
          <Typography
            color="inherit"
            
            variant="h5"
            className={classes.h5}
            data-aos="fade-right"
          >
            Try Canny Edge Detection now by uploading a local image, or providing
            an image URL. 
          </Typography>
          <div>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className={classes.button}
              component="button"
              style={{ marginRight: "20px" }}
              data-aos="fade-up"
            >
              <Link
                to="/user/sign-up/"
                style={{ textDecoration: "None", color: "inherit" }}
              >
                {"Start Trial"}
              </Link>
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.button}
              component="button"
              data-aos="fade-left"
            >
              <Link
                to="/user/sign-up/"
                style={{ textDecoration: "None", color: "inherit" }}
              >
                {"Test"}
              </Link>
            </Button>
          </div>
          <Typography
            variant="body2"
            color="inherit"
            className={classes.more}
            data-aos="fade-up"
          >
            Multiple benefits in one
          </Typography>
        </div>
      </ApplicationPageLayout>
      <div className={classes.grayBackground}>
        <Typography color="inherit" align="center" variant="h4" marked="center">
          Benefits
        </Typography>
        <br />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img
                  alt=""
                  className={classes.benefitImg}
                  src={linkIcon1}
                />
                <br />
                Unlimited Number of FaceAlbums
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img
                  alt=""
                  className={classes.benefitImg}
                  src={linkIcon2}
                />
                <br />
                Fast and Accurate
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img
                  alt=""
                  className={classes.benefitImg}
                  src={linkIcon3}
                />
                <br />
                Intelligent Clustering
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <img
                  alt=""
                  className={classes.benefitImg}
                  src={linkIcon4}
                />
                <br />
                Milisecond Response
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Typography
        data-aos="fade-in"
        color="inherit"
        align="center"
        variant="h4"
        marked="center"
      >
        Demo
      </Typography>
      <br />
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.paper}
        data-aos="fade-in"
      >
        Try Canny Edge Detection now by uploading a local image, or providing an image URL.<br/>
This demo is built with Edge Detect API. If you have any specific technical requirements, check the index below or contact us.
      </Typography>
      <ImageGallery detectionKind="BodyDetection" data-aos="fade-in" />
      <div className={classes.grayBackground}>
        <Container>
          <Typography
            data-aos="fade-in"
            color="inherit"
            align="center"
            variant="h4"
            marked="center"
          >
            Related Product
          </Typography>
          <br />
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.paper}
            data-aos="fade-in"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            <br /> It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
            <br />
          </Typography>
        </Container>
      </div>
      <Container>
        <Typography
          data-aos="fade-in"
          color="inherit"
          align="center"
          variant="h4"
          marked="center"
        >
          Related Product
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid
            style={{ textAlign: "center" }}
            item
            xs={6}
            data-aos="fade-right"
          >
            <img
              src={linkImageScence1}
              alt="related1"
              style={{ width: "380px", height: "auto" }}
            />
            <Typography color="inherit" variant="h5" className={classes.paper}>
              Body-Based People Counting
            </Typography>
          </Grid>
          <Grid
            data-aos="fade-left"
            item
            xs={6}
            style={{ textAlign: "center" }}
          >
            <img
              src={linkImageScence2}
              alt="related2"
              style={{ width: "380px", height: "268.92px" }}
            />
            <Typography color="inherit" variant="h5" className={classes.paper}>
              Behavior Detection
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

SkeletonDetection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SkeletonDetection);
