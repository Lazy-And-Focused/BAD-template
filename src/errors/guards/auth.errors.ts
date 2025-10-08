import ErrorConstructor from "../constructor";

export const authErrors = new ErrorConstructor("User blocked", <const>{
  hashParseError: "Hash parse error",
  userNotFund: "User not found",
  profileIdError: "Profile id is not equals",
  profileNotFound: "Profile not found",
  tokenError: "Token is not equals",
}).execute();

export default authErrors;
