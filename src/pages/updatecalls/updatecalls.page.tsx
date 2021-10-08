import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Row, Space, TimePicker, message } from "antd";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch, Route, useRouteMatch, Link, useParams, useHistory } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { callStatus } from "../../constants/constants-data";
import { getAPIList, getCallListById, getCallNameList, getCustListById, postCallDetails, putCallDetails } from "../../services/admin-services/dashboardServices";
// import moment, { Moment } from "moment";
import moment from 'moment-timezone';
import { time } from "console";

const { Meta } = Card;
const { TextArea } = Input;
moment.tz.setDefault("Europe/London");

interface ClientData {
  id?: number;
  name?: string;
  CustData?: any;
}

interface MyCallData {
  id: string | number;
  Id:number;
  name: string;
  UserId: any;
  EngagementStatus: any;
  Description: any;
  NextCallDateTime?:any ;  
}

  const MyCallsPage: React.FC<ClientData> = (props: ClientData) => {
    const { CustData } = props;
  const { Id }: { Id: string } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();

  const handleRoute = () =>{ 
         history.push("/home");
       }
  const [InitialData, setInitialData] = useState<any>();
  const [clientData, setclientData] = useState<Array<MyCallData>>([]);
 
  const fetchCustomerCallsbyId = async (Id: number) => {
    try{
        const Response = await getCallNameList(Id);
        console.log("ResponseData fetched from homepage  : ", Response.data[0]);
        
        if (Response.status == 200) {
            if(Response.data.length > 0)
            {
              setclientData([Response.data[0]]);              
            }
        }
    }
    catch(err){
        console.log(err);
    }      
};

useEffect(() => {
  try {
    const callAllAsyncFunctions = async () => {
     await fetchCustomerCallsbyId(parseInt(Id));
    };
    callAllAsyncFunctions();
  } catch (err) {
    console.log(err);
  }
  
}, [CustData]);


  const submitCall = async (updatedValues: any) => {
    try {
      const Response = await putCallDetails(updatedValues);
      console.log("ResponseData :",Response.status);
      if (Response.status === 201) {
        message.success("Updated successfully!");
      }
    } catch (error) {
      message.error("submission failed. Network error");
    }
  };

  const onFinishInformation = (formValues: any) => {
    let updatedValues: MyCallData = {      
      id:Number(formValues.Id),
      Id:formValues.Id,
      name:formValues.UserId,
      UserId: formValues.UserId,
      EngagementStatus: formValues.statusId,
      Description: formValues.description,
      // NextCallDateTime: formValues.date.format("YYYY-MM-DD")  + " " + formValues.time.format("HH:mm:ss")
      NextCallDateTime: moment(new Date(formValues.date)).format("YYYY-MM-DD")  + " " +moment(new Date(formValues.time)).format("HH:mm:ss")
// moment.tz(new Date(), 'Europe/London')
    };
  
    console.log("onFinishInformation : ",formValues)
    updatedValues = {
      ...updatedValues,
      id:Number(formValues.Id),
      Id:formValues.Id,
      name:formValues.UserId,
      UserId: formValues.UserId,
      EngagementStatus: formValues.statusId,
      Description: formValues.description,
      // NextCallDateTime: formValues.date.format("YYYY-MM-DD")  + " " + formValues.time.format("HH:mm:ss")
      NextCallDateTime: moment(new Date(formValues.date)).format("YYYY-MM-DD")  + " " +moment(new Date(formValues.time)).format("HH:mm:ss")
      

    };
    submitCall(updatedValues);
    console.log("submit-updatedValues",updatedValues);

  };

function OnChange(time: any,timeString: any){
  console.log(time,timeString);
}
  const onFinishFailedInformation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "h:mm:ss"
  
  return (
 <>
 {clientData.length > 0 && (
   
      <div className="mycalls-page-root site-card-border-less-wrapper">       
 {console.log("clientData[0].Id",clientData[0].Id)}
       
          <Form
            name={"registration-form"}
            form={form}
            onFinish={onFinishInformation}
            onFinishFailed={onFinishFailedInformation}
            
          >
             <Col xs={20} md={20} lg={20}>
                 <Link to="/home" style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2'}}>Home</Link>
            </Col>
            <div style={{ margin: "80px 280px 150px 180px", backgroundColor: "#EAEDED", border: "1px solid black" }} >
              <div style={{ marginLeft: "25px" }}>
                <p><b>My Calls</b></p>
              </div>
              <Divider plain></Divider>
              <br></br>
              <div style={{ marginLeft: "25px" }}>
                <div>
                  <Row>
                    <Col style={{ marginLeft: "5px" }}>
                    </Col>
                    <Col span={3}>
                      <p><b>Select Client</b></p>
                    </Col>
                    <Col span={4}>
                    <Form.Item hidden={true} name="Id" noStyle initialValue= {clientData.length > 0 ? clientData[0].Id  : ""}><Input /></Form.Item>
                      
                      <Form.Item hidden={true} name="UserId" noStyle initialValue= {clientData.length > 0 ? clientData[0].UserId : ""}><Input /></Form.Item>
                      <Form.Item name="clientId" initialValue= {clientData.length > 0 ? clientData[0].name : ""}
                      
                             >
                         <CustomSelect
                          options={clientData}
                          returnId
                          className="header-type-select" disabled={true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}></Col>
                    <Col style={{ marginLeft: "6px" }}><p><b>Status</b></p></Col>
                    <Col span={1}></Col>
                    <Col span={4}>
                      <Form.Item name="statusId" initialValue= {clientData.length > 0 ? clientData[0].EngagementStatus : ""}
                       rules={[
                                {
                                    required: true,
                                    message: "Status required",
                                },
                            ]} >
                        <CustomSelect
                          options={callStatus}
                          placeholder="Select"
                          returnId
                          className="header-type-select"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col span={10}><b>Call Updates</b><br></br>
                    <Form.Item name="description" initialValue= {clientData.length > 0 ? clientData[0].Description : ""}
                       rules={[
                                {
                                    required: true,
                                    message: "Description required",
                                },
                            ]}  >
                      <TextArea showCount rows={5} maxLength={100} 
                          />
                    </Form.Item>
                 
                  </Col>
                  <Col style={{ marginLeft: "80px" }}>
                    <b>{`  `}Next Call</b>
                    <Row>
                      <Col>
                      
                        <Form.Item name="date" initialValue= {moment.utc(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)}
                        rules={[
                                {
                                    required: true,
                                    message: "date required",
                                },
                            ]}  > 
                                 <DatePicker
                                  format={dateFormat}
                                />                     
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="time"  initialValue={moment.utc(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null), timeFormat)}
                         rules={[
                          {
                              required: true,
                              message: "time required",
                          },
                      ]} 
                          >
                          <TimePicker onChange={OnChange}
                           format={timeFormat} 
                                  />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br></br>
                <Row align="middle" style={{ paddingLeft: "250px" }}>
                  <Col span={6}>
                    <Button 
                    // onClick={handleRoute}
                      style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "#1fc2c2", color: "white", border: "1px solid #1fc2c2", textAlign: "center" }}
                      htmlType="submit"
                    >
                      {"✓"}
                    </Button>
                  </Col>
                  <Col>
                    <Button 
                    onClick={handleRoute}
                      style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "red", color: "white", border: "1px solid red", textAlign: "center" }}
                      htmlType="reset"
                    >
                      {"×"}
                    </Button>
                  </Col>
                </Row>
                <br></br>
              </div>
            </div>
          </Form>      
       
      </div>
 )}
 </>
  );

}
export default MyCallsPage;






                          // defaultValue={clientData.length > 0 ? clientData[0].id : ""}
                          // defaultValue={clientData.length > 0 ? clientData[0].Description : " "}
   {/* <Form.Item name="id"  initialValue= {clientData.length > 0 ? clientData[0].id : ""}
                       rules={[
                                {
                                    required: true,
                                    message: "Id needed",
                                },
                            ]} >
                    <label 
                    // defaultValue={clientData.length > 0 ? clientData[0].id : " "}
                    >

                    </label>
                    </Form.Item> */}
                     // {clientData.length > 0 ?clientData[0].NextCallDateTime:null}
                                  // {moment(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)} format={dateFormat}
                                  // defaultValue={moment(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)}
                       // {clientData.length > 0 ?clientData[0].NextCallDateTime:null}
                        // {moment(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null), timeFormat)} format={timeFormat}
                          // defaultValue={moment(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null).toLocaleTimeString(), timeFormat)}
                      //  rules={[
                      //           {
                      //               required: true,
                      //               message: "Select the Type of User",
                      //           },
                      //       ]}