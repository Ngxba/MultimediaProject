var User = require("../models/user");

const userService = {
  signUp: async (firstName, lastName, email, password, userPlan) => {
    const result = await User.findOne({ email: email });
    if (!result) {
      const newUser = User({
        firstName,
        lastName,
        email,
        password,
        userPlan
      });
      await newUser.save();
      return newUser;
    } else {
      throw new Error("USER_EXISTED");
    }
  },
  signIn: async (email, password) => {
    let result = await User.find({ email, password });
    if (result) {
      return result;
    } else {
      throw new Error("error/User_not_found");
    }
  },
};

module.exports = userService;