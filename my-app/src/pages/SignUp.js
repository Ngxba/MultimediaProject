import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../modules/components/Typography";
import AppForm from "../modules/views/AppForm";
import { email, required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import { Alert, AlertTitle } from "@material-ui/lab";
import { signUp } from "../Action/UserAction";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = React.useState("");
  const context = React.useContext(UserContext);
  const [readyToGo, setReadyToGo] = React.useState(false);

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);
    try {
      const respond = await signUp(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      if (respond.length === 0) {
        setTimeout(() => {
          setSent(false);
          setIsSignUpSuccessful(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSent(false);
          setIsSignUpSuccessful(true);
          context.onChangeContext(
            respond.firstName,
            respond.lastName,
            respond.email,
            respond.userPlan,
            respond._id
          );
          localStorage.setItem("firstName", respond.firstName);
          localStorage.setItem("lastName", respond.lastName);
          localStorage.setItem("email", respond.email);
          localStorage.setItem("userPlan", respond.userPlan);
          localStorage.setItem("_id", respond.id);
        }, 1000);
      }
      setTimeout(() => {
        setReadyToGo(true);
        setIsSignUpSuccessful("");
      }, 2500);
    } catch (err) {
      setTimeout(() => {
        setSent(false);
        setIsSignUpSuccessful(false);
      }, 1000);
      setTimeout(() => {
        setIsSignUpSuccessful("");
      }, 2500);
    }
  };

  return (
    <React.Fragment>
      {readyToGo && <Redirect to="/" />}
      {isSignUpSuccessful === false && (
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
            Your email has been taken or not valid —{" "}
            <strong>check it out!</strong>
          </Alert>
        </div>
      )}
      {isSignUpSuccessful === true && (
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
            SignUp succesful — <strong>Wait for redirect!</strong>
          </Alert>
        </div>
      )}
      <div style={{ marginTop: "70px" }}>
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/user/sign-in/" underline="always">
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }}
            validate={validate}
          >
            {({ handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      autoFocus
                      component={RFTextField}
                      autoComplete="fname"
                      fullWidth
                      label="First name"
                      name="firstName"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={RFTextField}
                      autoComplete="lname"
                      fullWidth
                      label="Last name"
                      name="lastName"
                      required
                    />
                  </Grid>
                </Grid>
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "In progress…" : "Sign Up"}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
      </div>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
