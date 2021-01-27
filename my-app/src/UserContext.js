import React, { createContext, Component } from "react";

export const UserContext = createContext(null);

class UserContextProvider extends Component {
  state = {
    firstName: "",
    lastName: "",
    userEmail: "",
    userPlan: "",
    _id: "",
  };

  onChangeContext = (firstName, lastName, email, userPlan, _id) => {
    this.setState({ firstName: firstName, lastName: lastName, userEmail: email, userPlan: userPlan, _id: _id });
  };

  componentDidMount(){
    console.log(this.state)
    const userFirstName = localStorage.getItem('firstName');
    const userLastName = localStorage.getItem('lastName');
    const userEmail = localStorage.getItem("email");
    const userPlan = localStorage.getItem("userPlan");
    const _id = localStorage.getItem("_id");
    if (userFirstName && userEmail){
      this.onChangeContext(userFirstName, userLastName, userEmail, userPlan, _id)
    }
  }

  render() {
    return (
      <UserContext.Provider
        value={{ ...this.state, onChangeContext: this.onChangeContext }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
