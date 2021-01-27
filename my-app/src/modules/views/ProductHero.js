import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const backgroundImage =
  "https://images.unsplash.com/photo-1526314114033-349ef6f72220?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2792&q=80";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
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
});

function ProductHero(props) {
  const { classes } = props;
  const context = React.useContext(UserContext);

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography
        data-aos="fade-right"
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
      >
        BOOST YOUR COMPANY
      </Typography>
      <Typography
        data-aos="fade-left"
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Enjoy our free AI product to apply to your daily lifestyle.
      </Typography>
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
            {"Getting Started"}
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="button"
          data-aos="fade-up"
        >
          <Link
            to="/user/sign-up/"
            style={{ textDecoration: "None", color: "inherit" }}
          >
            {"Register"}
          </Link>
        </Button>
      )}

      <Typography
        data-aos="fade-up"
        variant="body2"
        color="inherit"
        className={classes.more}
      >
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
