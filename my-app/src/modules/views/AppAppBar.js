import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
// import LinkMaterial from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar";
import Typography from "../components/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { UserContext } from "../../UserContext";
import Snackbar from "../components/Snackbar";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;
  const context = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleLogOut = () => {
    context.onChangeContext("", "", "", "");
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", "");
    localStorage.setItem("email", "");
    localStorage.setItem("userPlan", "");
    localStorage.setItem("_id", "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        {/* <Drawer/> */}
        <Snackbar
          open={open}
          onClose={handleClose}
          message="Log out successful, you still can continue to use our product!"
        />
        <div
          style={{
            display: "flex",
            alignItem: "center",
            height: "70px",
            width: "30vw",
            zIndex: "1111",
            position: "fixed",
            top: "0px",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            margin: "0 35vw"
          }}
        >
          <Typography
            variant="h2"
            underline="none"
            color="inherit"
            className={classes.title}
          >
            <Link to="/" style={{ textDecoration: "None", color: "inherit" }}>
              {"FACE++"}
            </Link>
          </Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          <span className={clsx(classes.rightLink, classes.linkSecondary)}>
            <DrawerMenu />
          </span>

          {context.userEmail !== "" ? (
            <div style={{ display: "flex" }}>
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                <Link
                  to="/user/information"
                  style={{ textDecoration: "None", color: "inherit" }}
                >
                  {context.firstName} {context.lastName}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                underline="none"
                className={clsx(classes.rightLink, classes.linkSecondary)}
                onClick={handleLogOut}
                style={{ cursor: "pointer" }}
              >
                {"Log Out"}
              </Typography>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                <Link
                  to="/user/sign-in/"
                  style={{ textDecoration: "None", color: "inherit" }}
                >
                  {"Sign In"}
                </Link>
              </Typography>
              <Typography
                variant="h6"
                underline="none"
                className={clsx(classes.rightLink, classes.linkSecondary)}
              >
                <Link
                  to="/user/sign-up/"
                  style={{ textDecoration: "None", color: "inherit" }}
                >
                  {"Sign Up"}
                </Link>
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <div className={classes.placeholder} /> */}
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const menuData = [
  {
    application: "Canny Edge Detection",
    link: "/application/CannyEdgeDetection",
    icon: "",
  },
];
function DrawerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const list = () => (
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <div style={{ textAlign: "center", width: "100%" }}>
            <Link to={"/"} style={{ textDecoration: "None", color: "inherit" }}>
              <strong>FACE++</strong>
            </Link>
            {/* <ListItemText primary={data.application} /> */}
          </div>
        </ListItem>
        <Divider />
        {menuData.map((data, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              <ArrowRightIcon />
            </ListItemIcon>
            <Link
              to={data.link}
              style={{ textDecoration: "None", color: "inherit" }}
            >
              {data.application}
            </Link>
            {/* <ListItemText primary={data.application} /> */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Sign In", "Sign Up", "Sign Out"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon color="secondary" />
        </Button>
        <Drawer
          anchor={"left"}
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default withStyles(styles)(AppAppBar);
