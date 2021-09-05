import axios from "axios";
import dataConstants from "../../constants/constants-data";

export const getAPIList = async()=>{
    return axios.get(dataConstants.getClientDetailsUrl);
};
export const getCustListById = async(Id:number)=>{
    return axios.get(dataConstants.getClientDetailsByIdUrl , {
        params: {
          Id: Id,
        },
      });
};
export const postClientRegisterUser = async (body: any) => {
  return axios.post(dataConstants.postClientDetailsUrl, body);
};
// import dataConstants, {
//   UserStatus,
//   ServiceRequestStatus,
//   PaymentStatus,
// } from "../../constants/constants-data";

// export const getClientUserList = async (status: keyof typeof UserStatus) => {
//   return axios.get(dataConstants.getAdminClientUrl + UserStatus[status]);
// };
// export const getInvoiceList = async (status: keyof typeof PaymentStatus) => {
//   return axios.get(dataConstants.getAdminInvoiceUrl + PaymentStatus[status]);
// };

// export const getServiceRequestList = async (
//   status: "All" | "Processing" | "Active" | "Completed"
// ) => {
//   return axios.get(
//     dataConstants.getAdminServiceRequestUrl +
//       "all/" +
//       (status === "All"
//         ? ServiceRequestStatus.Initiated +
//           "," +
//           ServiceRequestStatus.Approved +
//           "," +
//           ServiceRequestStatus.Published +
//           "," +
//           ServiceRequestStatus.Allocated +
//           "," +
//           ServiceRequestStatus.Rejected +
//           "," +
//           ServiceRequestStatus.Completed
//         : status === "Processing"
//         ? ServiceRequestStatus.Initiated +
//           "," +
//           ServiceRequestStatus.Approved +
//           "," +
//           ServiceRequestStatus.Published
//         : status === "Active"
//         ? ServiceRequestStatus.Allocated
//         : ServiceRequestStatus.Completed)
//   );
// };

// export const getAllRegistrationRequests = async () => {
//   return axios.get(dataConstants.getRegistrationAllRequestUrl);
// };

// export const getAllPendingRegistrationRequests = async () => {
//   return axios.get(dataConstants.getAllPendingRegistrationRequestUrl);
// };
