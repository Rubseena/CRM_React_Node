import { all } from "@redux-saga/core/effects";


const endpointurl = `http://localhost:8090`;

const dataConstants = {
    getOrdersUrl: `${endpointurl}/api/orders`,
    postOrdersUrl: `${endpointurl}/api/orders`,
  // clientRegistrationUrl: `${endpointurl}/api/clientregister`,

    getClientDetailsUrl: `${endpointurl}/api/clientdetails`,
    getClientDetailsByIdUrl: `${endpointurl}/api/clientdetails`,
    postClientDetailsUrl: `${endpointurl}/api/register`,
    getCallDetailsUrl: `${endpointurl}/api/mycalls`,
    getCallDetailsByIdUrl: `${endpointurl}/api/mycalls`,
    postCallDetailsUrl: `${endpointurl}/api/mycalls`,
    putCallDetailsUrl: `${endpointurl}/api/mycalls`,

    

}

export default dataConstants;

export const textResources = {
  welcomeText: `Welcome to Care & Smile`,
  welcomeDescription: `Your Preferred Partner for Care Services`,
  addnewUser: `New User?`,
  emptyEmailMessage: `Enter your E-mail id`,
  emptyUsernameMessage: `Enter your Username`,
  emptyPasswordMessage: `Enter your Password`,
  emptyMobileNumMessage: `Enter your Mobile Number`,
  usernameFieldPlaceholder: `Username`,
  passwordFieldPlaceholder: `Password`,
  loginButtonName: `Login`,
  registerButtonName: `Register`,
  forgotPasswordLinkName: `Forgot Password?`,
  forgotPasswordTitle1: `Forgot`,
  forgotPasswordTitle2: `Password?`,
  forgotPasswordDescription: `Enter E-mail id and Mobile Number registered with your account`,
  emailIdPlaceholder: `E-mail ID`,
  mobileNumPlacerholder: `Mobile Number`,
  sendButtonName: `Submit`,
  newPasswordDescription: `Enter the new password of your account`,
  newPasswordTitle1: `New`,
  newPasswordTitle2: `Password?`,
  shortPasswordMessage: `Password must be at least 6 characters.`,
  doneButtonName: `Done`,
  newPasswordPlaceholder: `New Password`,
  confirmPasswordPlaceholder: `Confirm Password`,
  // completedRegistration: `Thank you for registering. You will get your login id and password through email.`,
  completedRegistration: `Thank you. You have succesfully completed registration request.`,
  completedRegistrationDialog: `You will recieve registration confirmation and Login Credentials through E-mail.`,
  gotoLoginButtonName: `Go to login`,
  saveButtonName: `Save`,
  submitButtonName: `Submit`,
  cancelButtonName: `Cancel`,
  exceptionMessage: `Something went wrong. Please contact your administrator.`,
};

export const callStatus = [
  { id: "0", name: "New" },
  { id: "1", name: "Pursuing" },
  { id: "2", name: "Positive" },
  { id: "3", name: "Parked" },
];
