import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import ApplicationPageLayout from "../modules/views/ApplicationPageLayout";
import Typography from "../modules/components/TypographyApplication";

const backgroundImage =
  "https://www.collab2.co.za/wp-content/uploads/2017/06/contact-us-background.jpg";
const useStyles = makeStyles(() => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  grayBackground: {
    backgroundColor: "#dddddd",
    padding: "50px 0",
    marginBottom: "50px",
  },
}));
function Privacy() {
  const classes = useStyles();
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
            About Us
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            className={classes.more}
            data-aos="fade-up"
          >
            Where the best become better
          </Typography>
        </div>
      </ApplicationPageLayout>
      <Container style={{ marginTop: "60px", marginBottom: "60px" }}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          FPT Software – the Software Powerhouse
        </Typography>
        <br />
        <Grid container spacing={3} style={{ padding: "0 50px" }}>
          <Grid item xs={12} sm={9}>
            <ul>
              <li>
                Vietnam’s largest and one of the fastest growing software
                companies.
              </li>
              <li>
                Over 11,000 software outsourcing projects in the last 19 years.
              </li>
              <li>A broad presence in diverse global markets.</li>
              <li>
                Specialist in shaping world-class networks of global delivery
                centers.
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={3}>
            <img
              width="150"
              height="100"
              src="https://www.fpt-software.com/wp-content/uploads/sites/2/2015/07/Logo_FSOFT_Vertical.jpg"
              alt=""
            ></img>
          </Grid>
        </Grid>
        <br />
        <br />
        <div className={classes.grayBackground}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Our Vision
        </Typography>
        <br />
        <Typography variant="body1" align="center">
          <i>
            To be a company guided by technological innovations, committed to
            the highest level of customer satisfaction, contributing to national
            prosperity and providing its employees with the most favorable
            working environment possible, thus enabling them to reach their full
            potential in their professional careers as well as their morale.
          </i>
        </Typography>
        </div>
        <br />
        <br />
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Contact
        </Typography>
        <br />
        <Grid container spacing={3} style={{ padding: "0 50px"}}>
          <Grid item xs={4} sm={4}>
            <Typography variant="body1">
              <strong>Phone:</strong> 0123456789
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> Admin@admin
            </Typography>
            <Typography variant="body1">
              <strong>Supporter:</strong> Admin
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="body1">
              <strong>Phone:</strong> 0123456789
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> Admin@admin
            </Typography>
            <Typography variant="body1">
              <strong>Supporter:</strong> Admin
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="body1">
              <strong>Phone:</strong> 0123456789
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> Admin@admin
            </Typography>
            <Typography variant="body1">
              <strong>Supporter:</strong> Admin
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(Privacy);
