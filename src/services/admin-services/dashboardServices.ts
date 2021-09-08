import axios from "axios";
import dataConstants from "../../constants/constants-data";

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

