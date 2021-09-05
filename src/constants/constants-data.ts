import { all } from "@redux-saga/core/effects";


const endpointurl = `http://localhost:8090`;

const dataConstants = {
    getOrdersUrl: `${endpointurl}/api/orders`,
    postOrdersUrl: `${endpointurl}/api/orders`,
  // clientRegistrationUrl: `${endpointurl}/api/clientregister`,

    getClientDetailsUrl: `${endpointurl}/api/clientdetails`,
    getClientDetailsByIdUrl: `${endpointurl}/api/clientdetails`,
    postClientDetailsUrl: `${endpointurl}/api/register`,

}
// const endpointurl = `http://18.135.59.230:8080`;

// const dataConstants = {
//   clientRegistrationUrl: `${endpointurl}/csb/client/register`,
//   professionalRegistrationUrl: `${endpointurl}/csb/prof/register`,
//   clientRegTypesUrl: `${endpointurl}/csb/common/client-types`,
//   profRegTypesUrl: `${endpointurl}/csb/common/prof-category-list`,
//   clientProfielUpdateUrl: `${endpointurl}/csb/client/update`,
//   professionalProfielUpdateUrl: `${endpointurl}/csb/prof/update`,

//   clientLoginURL: `${endpointurl}/csb/common/authenticate`,
//   resetPasswordURL: `${endpointurl}/csb/common/reset-password`,
//   resetPasswordFirstLoginURL: `${endpointurl}/csb/common/change-password-on-reset`,
//   resetPasswordValicationURL: `${endpointurl}/csb/common/reset-password=`, //{token}

//   getUserInfoURL: `${endpointurl}/csb/common/user-info`,
//   getNewServiceRequestProfUrl: `${endpointurl}/csb/prof/get-queued-sr`,
//   acceptServiceRequestUrl: `${endpointurl}/csb/prof/mark-service-request`,
//   nextServiceRequestUrl: `${endpointurl}/csb/prof/next-service-request`,
//   getServicesOfDateUrl: `${endpointurl}/csb/prof/sr-by-date/`,
//   getActiveServiceRequestsUrl: `${endpointurl}/csb/prof/active-timesheet-sr`,
//   submitTimesheetsUrl: `${endpointurl}/csb/prof/timesheet-submission`,

//   getCurrentServiceRequestStatusUrl: `${endpointurl}/csb/common/get-latest-sr-status/`,
//   getClientServiceRequestsUrl: `${endpointurl}/csb/common/get-service-request/`,
//   getAllClientServiceRequestsUrl: `${endpointurl}/csb/common/get-service-request/`,
//   getAllocationDetailsServiceRequestUrl: `${endpointurl}/csb/common/get-sr-prof-details/`,
//   postNewServiceRequestUrl: `${endpointurl}/csb/client/new-service-request`,

//   getIncomeUrl: `${endpointurl}/csb/common/get-invoice/0`,
//   getPendingPaymentUrl: `${endpointurl}/csb/common/get-invoice/0`,

//   getRegistrationAllRequestUrl: `${endpointurl}/csb/admin/user-record/3`,
//   getRegistrationClientRequestUrl: `${endpointurl}/csb/admin/client-record/3`,
//   getRegistrationProfessionalRequestUrl: `${endpointurl}/csb/admin/prof-record/3`,
//   getAllPendingRegistrationRequestUrl: `${endpointurl}/csb/admin/user-record/0`,
//   postSubmitPaymentRefUrl: `${endpointurl}/csb/admin/submit-payment-ref`,
//   putNewPendingPaymentRequestUrl: `${endpointurl}/csb/admin/invoice-payment-status-update/`,
//   getUserCateogryWiseUsersUrl: `${endpointurl}/csb/admin/prof-record/`, // {cat_id}/{status}
//   getBillingRateSRUrl: `${endpointurl}/csb/admin/get-sr-rate/`, // {sr_id}

//   getInvoiceListUrl: `${endpointurl}/csb/common/get-invoice/`,
//   getPaySlipListUrl: `${endpointurl}/csb/common/get-payslip/`,
//   getAdminClientUrl: `${endpointurl}/csb/admin/user-list/C/`,
//   getAdminProfUrl: `${endpointurl}/csb/admin/user-list/P/1`,
//   getAdminServiceRequestUrl: `${endpointurl}/csb/common/get-service-request/`, //${status}
//   getAdminInvoiceUrl: `${endpointurl}/csb/common/get-invoice/?paymentStatus=`, // {status}

//   getAllServiceRequestsUrl: `${endpointurl}/csb/common/get-service-request/`,
//   getServiceRequestDetailsUrl: `${endpointurl}/csb/common/get-service-request`,
//   approveServiceRequestUrl: `${endpointurl}/csb/admin/update-sr-status/`,
//   updateServiceRequestRateUrl: `${endpointurl}/csb/admin/update-sr-rate`,
//   publishServiceRequestUrl: `${endpointurl}/csb/admin/publish-sr`,
//   publishServiceRequesByCategorytUrl: `${endpointurl}/csb/admin/publish-sr-all`,
//   approveRegistrationRequestUrl: `${endpointurl}/csb/admin/registration-approval`,
//   getDefaultCurrencyUrl: `${endpointurl}/csb/admin/config-data/default.currency`,
//   getAllProfesionalAllocationUrl: `${endpointurl}/csb/admin/sr-prof-list/`,
//   confirmProfesionalAllocationUrl: `${endpointurl}/csb/admin/sr-prof-confirm/`,
//   directProfesionalAllocationUrl: `${endpointurl}/csb/admin/sr-prof-allocate`,
//   getTimesheetListUrl: `${endpointurl}/csb/admin/timesheet-list/`, // {status}
//   postTimesheetApproveUrl: `${endpointurl}/csb/admin/timesheet-update`,
//   getTotalRevenue:`${endpointurl}/csb/admin/get-revenue`,
// };

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
