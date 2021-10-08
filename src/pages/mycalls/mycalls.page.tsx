import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Row, Space, TimePicker, message, Steps } from "antd";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch, Route, useRouteMatch, Link, useParams, useHistory } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { callStatus } from "../../constants/constants-data";
import { getAPIList, getCallNameList, getCustListById, postCallDetails, postClientRegisterUser } from "../../services/admin-services/dashboardServices";
const { Meta } = Card;
const { TextArea } = Input;

interface ClientData {
  id: number;
  name: string;
}
interface MyCallData {
  UserId: string;
  EngagementStatus: string;
  Description: string;
  NextCallDateTime: string;
}

const MyCallsPage: React.FC = () => {

  const { Id }: { Id: string } = useParams();
  const [clientData, setclientData] = useState<Array<ClientData>>([]);
  const [form] = Form.useForm();

  const fetchList = async () => {
    const Response = await getAPIList();
    // console.log("dash - response", Response);
    let clients: Array<ClientData> = [];
    if (Response.status === 200) {
      Response.data.map((client: any) => {
        clients.push({
          id: client.Id,
          name: client.firstName + ' ' + client.lastName
        });
      })
    }
    setclientData(clients);
    // message.success("Call added  successfully!");

  };

  const submitCall = async (formValues: any) => {
    try {
      const Response = await postCallDetails(formValues);
      // console.log("calls:",Response.data)
      if (Response.status === 201) {
        message.success("Saved successfully!");
      }
    } catch (error) {
      message.error("submission failed. Network error");
    }
  };
  const onFinishInformation = (formValues: any) => {
    let updatedValues: MyCallData = {
      UserId: formValues.clientId,
      EngagementStatus: formValues.statusId,
      Description: formValues.description,
      NextCallDateTime: formValues.date.format("YYYY-MM-DD") + " " + formValues.time.format("HH:mm:ss")
    };
    submitCall(updatedValues);
  };
  
  const history = useHistory();

  const handleRoute = () =>{ 
    history.push("/home");
  }

  const onFinishFailedInformation = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  const [currentData, setCurrentData] = useState<MyCallData>();

    const fetchCustomerbyId = async (Id: number) => {
      try{
          const Response = await getCustListById(Id);
          if (Response.status == 200) {
              // this.items= Response.data;
              if(Response.data.length > 0)
              {
                setCurrentData(Response.data[0]);

                
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
        await fetchList();
      };
      callAllAsyncFunctions();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    try {
      const callAllAsyncFunctions = async () => {
        await fetchCustomerbyId(parseInt(Id));
      };
      callAllAsyncFunctions();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "h:mm:ss"
  const { Step } = Steps;
  return (
    <>
      <div className="mycalls-page-root site-card-border-less-wrapper">
        <>
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
                      <Form.Item name="clientId"  >
                        {/* required: true, rules={[{ message: "Select Client", },]}  */}
                        <CustomSelect
                          options={clientData}
                          placeholder="Select"
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
                      <TextArea showCount rows={5} maxLength={100} />
                    </Form.Item>
                  </Col>
                  <Col style={{ marginLeft: "80px" }}>
                    <b>{`  `}Next Call</b>
                    <Row>
                      <Col>
                        <Form.Item name="date"  >
                          <DatePicker format={dateFormat}
                          />
                        </Form.Item>

                      </Col>
                      <Col>
                        <Form.Item name="time"  >
                          <TimePicker format={timeFormat}/>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <br></br>
                <Row align="middle" style={{ paddingLeft: "250px" }}>
                  <Col span={6}>
                    <Button
                    //  onClick={handleRoute}
                      style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "#1fc2c2", color: "white", border: "1px solid #1fc2c2", textAlign: "center" }}
                      htmlType="submit"
                    >
                      {"✓"}
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={handleRoute}
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
        </>
      </div>
    </>
  );

}
export default MyCallsPage;