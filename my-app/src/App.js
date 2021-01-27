import React, {useEffect} from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";

// Layouts
import LayoutDefault from "./utils/LayoutDefault";
import AppRoute from "./utils/AppRoute";
// import './App.css';
// Views
import AOS from "aos";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserContextProvider from "./UserContext";
import PersonalInformation from "./pages/PersonalInformation"
import CannyEdgeDetection from "./pages/CannyEdgeDetection"
// import MyGallery from "./modules/views/ImageGalleryBodyDetection"

const App = () => {
  useEffect(() => {
    AOS.init({duration: 1500, once: true });
  },[]);
  return (
    <React.Fragment>
      <Router>

        <Switch>
          <UserContextProvider>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <AppRoute exact path="/user/forgot-password" component={ForgotPassword} layout={LayoutDefault} />
          <AppRoute exact path="/user/sign-in" component={SignIn} layout={LayoutDefault} />
          <AppRoute exact path="/user/sign-up" component={SignUp} layout={LayoutDefault} />
          <AppRoute exact path="/terms" component={Terms} layout={LayoutDefault} />
          <AppRoute exact path="/privacy" component={Privacy} layout={LayoutDefault} />
          <AppRoute exact path="/about-us" component={AboutUs} layout={LayoutDefault} />
          <AppRoute exact path="/application/CannyEdgeDetection" component={CannyEdgeDetection} layout={LayoutDefault} />
          <AppRoute exact path="/user/information" component={PersonalInformation} layout={LayoutDefault} />
          </UserContextProvider>
        </Switch>

      </Router>
    </React.Fragment>
  );
};

export default App;
