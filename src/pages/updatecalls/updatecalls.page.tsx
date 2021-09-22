import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Row, Space, TimePicker, message } from "antd";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { callStatus } from "../../constants/constants-data";
import { getAPIList, getCallListById, getCallNameList, getCustListById, postCallDetails, putCallDetails } from "../../services/admin-services/dashboardServices";
import moment, { Moment } from "moment";
import { time } from "console";

const { Meta } = Card;
const { TextArea } = Input;

interface ClientData {
  id?: number;
  name?: string;
  CustData?: any;
}

interface MyCallData {
  id: string | number;
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

  const [InitialData, setInitialData] = useState<any>();

  // const [clientName, setClientName] = useState("");
  // const [callStatus, setCallStatus] = useState("");
  // const [descrText, setDescrText] = useState("");
  // const [dateData, setDateData] = useState("");

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


  const submitCall = async (formValues: any) => {
    try {
      const Response = await putCallDetails(formValues);
      console.log("ResponseData :",Response.data);
      if (Response.status === 201) {
        message.success("Updated successfully!");
      }
    } catch (error) {
      message.error("submission failed. Network error");
    }
  };
  const onFinishInformation = (formValues: any) => {
    let updatedValues: MyCallData = {      
      id:formValues.UserId,
      name:formValues.name,
      UserId: formValues.UserId,
      EngagementStatus: formValues.statusId,
      Description: formValues.description,
      NextCallDateTime: formValues.date.format("YYYY-MM-DD") + " " + formValues.time.format("HH:mm:ss")
    };
    console.log("updatedValuesonfinish : ",updatedValues)
    console.log("updatedValues.id : ",updatedValues.UserId)

    submitCall(updatedValues);
    console.log("formValues",formValues)

  };


  const onFinishFailedInformation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   form.setFieldsValue(InitialData);
  // }, [InitialData]);
  
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm:ss"
  
  return (
 <>
 
 {clientData.length > 0 && (
      <div className="mycalls-page-root site-card-border-less-wrapper">       
       
          <Form
            name={"registration-form"}
            form={form}
            // initialValues={InitialData}
            onFinish={onFinishInformation}
            onFinishFailed={onFinishFailedInformation}
            
          >
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
                      <Form.Item name="UserId" noStyle initialValue= {clientData.length > 0 ? clientData[0].UserId : ""}><Input /></Form.Item>
                      <Form.Item name="clientId" initialValue= {clientData.length > 0 ? clientData[0].name : ""}
                       rules={[
                                {
                                    required: true,
                                    message: "Select the Type of User",
                                },
                            ]} >
                         <CustomSelect
                          options={clientData}
                          returnId
                          className="header-type-select"
                        />
                      </Form.Item>
                     

                    </Col>
                    <Col span={5}></Col>
                    <Col style={{ marginLeft: "6px" }}><p><b>Status</b></p></Col>
                    <Col span={1}></Col>
                    <Col span={4}>
                      <Form.Item name="statusId" initialValue= {clientData.length > 0 ? clientData[0].id : ""}
                       rules={[
                                {
                                    required: true,
                                    message: "Status required",
                                },
                            ]} >
                        <CustomSelect
                          options={callStatus}
                          // defaultValue={clientData.length > 0 ? clientData[0].id : ""}
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
                          // defaultValue={clientData.length > 0 ? clientData[0].Description : " "}
                          />
                    </Form.Item>
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
                  </Col>
                  <Col style={{ marginLeft: "80px" }}>
                    <b>{`  `}Next Call</b>
                    <Row>
                      <Col>
                        <Form.Item name="date" initialValue= {clientData.length > 0 ?clientData[0].NextCallDateTime:null}
                                  // {moment(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)} format={dateFormat}
                       rules={[
                                {
                                    required: true,
                                    message: "date required",
                                },
                            ]}  > 
                                 <DatePicker
                                  // defaultValue={moment(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)}
                                  format={dateFormat}
                                />                     
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="time" initialValue={clientData.length > 0 ?clientData[0].NextCallDateTime:null}
                        // {moment(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null), timeFormat)} format={timeFormat}
                        rules={[
                          {
                              required: true,
                              message: "time required",
                          },
                      ]} 
                          >
                          <TimePicker 
                          // defaultValue={moment(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null).toLocaleTimeString(), timeFormat)}
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
                      style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "#1fc2c2", color: "white", border: "1px solid #1fc2c2", textAlign: "center" }}
                      htmlType="submit"
                    >
                      {"✓"}
                    </Button>
                  </Col>
                  <Col>
                    <Button
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