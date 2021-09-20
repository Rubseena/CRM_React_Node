import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Row, Space, TimePicker, message } from "antd";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { callStatus } from "../../constants/constants-data";
import { getAPIList, getCallListById, getCallNameList, getCustListById, postCallDetails, postClientRegisterUser } from "../../services/admin-services/dashboardServices";
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
  // const [InitialData, setInitialData] = useState<any>();
  const [clientData, setclientData] = useState<Array<MyCallData>>([]);


  const [form] = Form.useForm();
  const fetchCustomerCallsbyId = async (Id: number) => {
    try{
        console.log("starting call");
        const Response = await getCallNameList(Id);
        console.log("Client fetched from homepage ResponseData : ", Response.data[0]);
        
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
  const TempInitialData = {
    // EngagementStatus: CustData.EngagementStatus,
    // Description: CustData.Description,
  };
console.log("TempInitialData:",TempInitialData)
  // setInitialData(TempInitialData);
}, [CustData]);


  const submitCall = async (formValues: any) => {
    try {
      const Response = await postCallDetails(formValues);
      if (Response.status === 201) {
        message.success("Saved successfully!");
      }
    } catch (error) {
      message.error("submission failed. Network error");
    }
  };
  const onFinishInformation = (formValues: any) => {
    let updatedValues: MyCallData = {
      id:Id,
      name:formValues.name,
      UserId: formValues.clientId,
      EngagementStatus: formValues.statusId,
      Description: formValues.description,
      NextCallDateTime: formValues.date.format("YYYY-MM-DD") + " " + formValues.time.format("HH:mm:ss")
    };
    submitCall(updatedValues);
  };


  const onFinishFailedInformation = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   form.setFieldsValue(InitialData);
  // }, [InitialData]);
  
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "HH:mm:ss"
  
  return (
 <>
 {console.log("clientData:",clientData)}
 
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
                      <Form.Item name="clientId"  >
                        {/* required: true, rules={[{ message: "Select Client", },]}   */}
                         <CustomSelect
                          options={clientData}
                          defaultValue={clientData.length > 0 ? clientData[0].name : ""}
                          // placeholder="Select"
                          returnId
                          className="header-type-select"
                        />
                      </Form.Item>

                    </Col>
                    <Col span={5}></Col>
                    <Col style={{ marginLeft: "6px" }}><p><b>Status</b></p></Col>
                    <Col span={1}></Col>
                    <Col span={4}>
                      <Form.Item name="statusId" >
                        <CustomSelect
                          options={callStatus}
                          defaultValue={clientData.length > 0 ? clientData[0].id : ""}
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
                    <Form.Item name="description"  >
                      <TextArea showCount rows={5} maxLength={100} 
                          defaultValue={clientData.length > 0 ? clientData[0].Description : " "}
                          />
                    </Form.Item>
                  </Col>
                  <Col style={{ marginLeft: "80px" }}>
                    <b>{`  `}Next Call</b>
                    <Row>
                      <Col>
                        <Form.Item name="date"  > 
                                 <DatePicker
                                  defaultValue={moment(new Date(clientData.length > 0 ?clientData[0].NextCallDateTime:null), dateFormat)}
                                  format={dateFormat}
                                />                     
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item name="time"  >
                          <TimePicker defaultValue={moment(new Date (clientData.length > 0 ? clientData[0].NextCallDateTime:null).toLocaleTimeString(), timeFormat)}
                                  format={timeFormat}/>
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