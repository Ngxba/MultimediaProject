import withRoot from "../modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "../modules/components/Typography";
import AppForm from "../modules/views/AppForm";
import { email, required } from "../modules/form/validation";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import { signIn } from "../Action/UserAction";
import { Alert, AlertTitle } from "@material-ui/lab";
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

function SignIn() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = React.useState("");
  const context = React.useContext(UserContext);
  const [readyToGo, setReadyToGo] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email", "password"], values);

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
      const respond = await signIn(values.email, values.password);
      console.log(respond);
      if (respond.length === 0) {
        setTimeout(() => {
          setSent(false);
          setIsLoginSuccessful(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSent(false);
          setIsLoginSuccessful(true);
          context.onChangeContext(
            respond[0].firstName,
            respond[0].lastName,
            respond[0].email,
            respond[0].userPlan,
            respond[0]._id
          );
          localStorage.setItem("firstName", respond[0].firstName);
          localStorage.setItem("lastName", respond[0].lastName);
          localStorage.setItem("email", respond[0].email);
          localStorage.setItem("userPlan", respond[0].userPlan);
          localStorage.setItem("_id", respond[0].id);
        }, 1000);
        setTimeout(() => {
          setReadyToGo(true);
        }, 2400);
      }
      setTimeout(() => {
        setIsLoginSuccessful("");
        setReadyToGo(true);
      }, 2500);
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        setSent(false);
        setIsLoginSuccessful(false);
      }, 1000);
      setTimeout(() => {
        setIsLoginSuccessful("");
      }, 2500);
    }
  };

  return (
    <React.Fragment>
      {readyToGo && <Redirect to="/" />}
      {isLoginSuccessful === false && (
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
            Your information is incorrect or not valid —{" "}
            <strong>check it out!</strong>
          </Alert>
        </div>
      )}
      {isLoginSuccessful === true && (
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
            Login succesful — <strong>Wait for redirect!</strong>
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
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {"Not a member yet? "}
              <Link
                href="/user/sign-up/"
                align="center"
                underline="always"
              >
                Sign Up here
              </Link>
            </Typography>
          </React.Fragment>
          <Form onSubmit={handleSubmit} validate={validate}>
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
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
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? "In progress…" : "Sign In"}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/user/forgot-password">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
      </div>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
