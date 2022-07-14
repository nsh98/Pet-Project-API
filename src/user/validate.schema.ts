import ajvInstance from "src/util/ajv.instance";
import user from "src/validateBaseSchema/user";

const createNewUser = {
  type: "object",
  required: ["userName", "password"],
  properties: {
    userName: user.userName,
    password: user.password,
  },
  errorMessage: {
    required: {
      userName: "userName is required!",
      password: "password is required!",
    },
  },
};

const editUser = {
  type: "object",
  required: ["userId", "userName", "password"],
  properties: {
    userId: user.id,
    userName: user.userName,
    password: user.password,
  },
  errorMessage: {
    required: {
      userId: "userId is required!",
      userName: "userName is required!",
      password: "password is required!",
    },
  },
  additionalProperties: false,
};

const getUserById = {
  type: "object",
  required: ["id"],
  properties: {
    id: user.id,
  },
  errorMessage: {
    required: {
      id: "id is required!",
    },
  },
  additionalProperties: false,
};

const getUserByIdSchema = ajvInstance.compile(getUserById);
const createNewUserSchema = ajvInstance.compile(createNewUser);
const editUserSchema = ajvInstance.compile(editUser);

export { getUserByIdSchema, createNewUserSchema, editUserSchema };
