import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import UpdateIcon from '@material-ui/icons/Update';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import {Link} from "react-router-dom";
import { UserContext } from "../../UserContext";

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "rgb(211,211,211,0.35)",
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;
  const context = React.useContext(UserContext);

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography data-aos="fade-up" variant="h4" marked="center" className={classes.title} component="h2">
          How we works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid data-aos="fade-right" item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <UpdateIcon color="primary" className={classes.image} fontSize="large"/>
                <Typography variant="h5" align="center">
                  Daily update to get latest technology.
                </Typography>
              </div>
            </Grid>
            <Grid data-aos="zoom-in" item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <LocalOfferIcon color="primary" className={classes.image} fontSize="large"/>
                <Typography variant="h5" align="center">
                  First come, first served. Our offers are in limited quantities, so be quick.
                </Typography>
              </div>
            </Grid>
            <Grid data-aos="fade-left" item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <NewReleasesIcon color="primary" className={classes.image} fontSize="large"/>
                <Typography variant="h5" align="center">
                  New offers every week. New experiences, new surprises.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        {context.userEmail !== "" ? (
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="button"
          data-aos="fade-up"
          onClick={() => {
            const placeToGo = document.getElementById("explore");
            placeToGo.scrollIntoView({behavior: "smooth"});
          }}
        >
            {"Getting Started With Our Product"}
        </Button>
      ) : (
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="button"
          data-aos="fade-up"
        >
          <Link to="/user/sign-up/" style={{textDecoration: "None", color: "inherit"}}>{'Get started'}</Link>
        </Button>
      )}
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
