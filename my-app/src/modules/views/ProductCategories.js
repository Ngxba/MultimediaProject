import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import {Link} from "react-router-dom"

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://miro.medium.com/max/1000/1*BzZ0Ej1WASf3A-cgkHQehQ.jpeg',
      title: 'Face Detection',
      width: '30%',
      link: ""
    },
    {
      url:
      "https://www.geovision.com.tw/onepage/ai-face-searching-iscwest2019/images/M001.png",
      title: 'Face Searching',
      width: '30%',
      link: ""
    },
    {
      url:
      'https://miro.medium.com/max/1024/0*99GdbM7H3igOEKmq.jpg',
      title: 'Face Comparing',
      width: '40%',
      link: ""
    },
    {
      url:
        'https://paperswithcode.com/media/thumbnails/task/task-0000000441-86b0ab97_cVkVAHF.jpg',
      title: 'Canny Edge Detection',
      width: '38%',
      link: "/application/CannyEdgeDetection"
    },
    {
      url:
        'https://www.cyberlink.com/stat/technology/enu/img/ai_facial_engine.jpg',
      title: 'Face Attributes',
      width: '38%',
      link: ""
    },
    {
      url:
        'https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/faceplus-example.png',
      title: 'Emotion Recognition',
      width: '24%',
      link: ""
    },
    {
      url:
        'https://theaiorganization.com/wp-content/uploads/2019/10/144788057-Ekkasit-Keatsirikul-Dreamstime-e1570915210718.jpg',
      title: 'Body Detection',
      width: '40%',
      link: ""
    },
    {
      url:
        'https://www.learnopencv.com/wp-content/uploads/2018/05/OpenPose.jpg',
      title: 'Skeleton Detection',
      width: '20%',
      link: ""
    },
    {
      url:
        'https://futureoflife.org/wp-content/uploads/2018/08/bostrom-grants-article_hand-globe.jpg?x59035',
      title: 'Body Outlining',
      width: '40%',
      link: ""
    },
  ];

  return (
    <Container className={classes.root} component="section" id={"explore"}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all Technology and all Best Performance
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase 
          data-aos= {"flip-left"}
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                <Link to={image.link} style={{textDecoration: "None", color: "inherit"}}>{image.title}</Link>
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
