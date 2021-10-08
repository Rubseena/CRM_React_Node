import axios from "axios";
import dataConstants, { callStatus } from "../../constants/constants-data";

export const getAPIList = async()=>{
    return axios.get(dataConstants.getClientDetailsUrl);
};
export const getCustListById = async(Id:number)=>{
    // return axios.get(dataConstants.getClientDetailsByIdUrl , {
    //     params: {
    //       Id: Id,
    //     },
    //   });
    return axios.get(dataConstants.getClientDetailsByIdUrl + "/" + Id);
};
export const postClientRegisterUser = async (body: any) => {
  return axios.post(dataConstants.postClientDetailsUrl, body);
};
export const getCallList = async()=>{
  return axios.get(dataConstants.getCallDetailsUrl);
};
export const getCallNameList = async(Id:number)=>{
  return axios.get(dataConstants.getCallDetailsByIdNameList + "/" + Id);
};
export const getCallListById = async(Id:number)=>{
  return axios.get(dataConstants.getCallDetailsByIdUrl + "/" + Id);
};
export const postCallDetails = async (body: any) => {
  return axios.post(dataConstants.postCallDetailsUrl, body);
};
export const putCallDetails = async (body:any) => {
  return axios.put(dataConstants.putCallDetailsUrl + "/" , body );
}
export const getReminderList = async()=>{
  return axios.get(dataConstants.getReminder);
};

export const getEngagementStatusList = async (
  status: "All" | "Pursuing" | "Positive" | "Parked"
) => {
  return axios.get(
    dataConstants.getEngagementStatusListUrl +
      "all/" +
      (status === "All"
        ? callStatus
          
        : status === "Pursuing"
        ? callStatus
        : status === "Positive"
        ? callStatus
        : callStatus
        )
  );
};



