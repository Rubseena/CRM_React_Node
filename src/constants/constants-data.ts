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

export const ServiceRequestStatus = {
  Initiated: 0,
  Approved: 1,
  Published: 2,
  Allocated: 3,
  Rejected: 4,
  OnHold: 5,
  Completed: 6,
  Cancelled: 7,
};

export const ServiceRequestStatusCode = {
  0: "Initiated",
  1: "Approved",
  2: "Published",
  3: "Allocated",
  4: "Rejected",
  5: "OnHold",
  6: "Completed",
  7: "Cancelled",
};

export const genderOptions = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
  { id: "U", name: "Transgender" },
  { id: "O", name: "Others" },
];

export const PendingRequestStatus = {
  Paid: 0,
  NotPaid: 1,
};

export const PendingRequestStatusCode = {
  0: "Paid",
  1: "Not Paid",
};

export const RegistrationRequestStatus = {
  Pending: "PENDING",
  Accepted: "ACCEPTED",
  Rejected: "REJECTED",
};

export const RegistrationRequestStatusCode = {
  0: "Pending",
  1: "Accepted",
};

export const RegistrationApproveStatusCode = {
  Accept: 1,
  Reject: 2,
};

export const UserStatus = {
  Inactive: 0,
  Active: 1,
  All: 2,
};
export const ProfessionalAllocationStatusCode = {
  Initiated: 0,
  Accepted: 1,
  Rejected: 2,
};

export const ProfessionalAllocationActionStatusCode = {
  Accepted: 1,
  Rejected: 2,
};

export const ManualAllocationStatus = {
  Allocate: 1,
  Reallocate: 0,
};

export const TimesheetStatus = {
  Raised: 0,
  Approved: 1,
  Rejected: 2,
  Correction: 3,
  Processing: 4,
  All: "all",
};

export const PaymentStatus = {
  NotPaid: 0,
  Paid: 1,
  All: 2,
};
