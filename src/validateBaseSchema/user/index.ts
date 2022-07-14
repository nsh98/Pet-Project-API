const user = {
  id: {
    type: "number",
    minimum: 0,
    errorMessage: {
      _: "wrong data in field id!",
    },
  },
  userName: {
    type: "string",
    minLength: 1,
    errorMessage: {
      _: "wrong data in field userName!",
    }
  },
  password: {
    type: "string",
    minLength: 1,
    errorMessage: {
      _: "wrong data in field password!",
    }
  }
};

export default user;
