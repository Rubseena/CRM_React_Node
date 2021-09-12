import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, Row, Space, TimePicker ,message} from "antd";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { getAPIList, getCustListById, postCallDetails,postClientRegisterUser } from "../../services/admin-services/dashboardServices";
const { Meta } = Card;


// interface CallFormProps {
//   saveRegistrationData: (values: any) => void;
// }
interface MyCallsData {
  // Id?: any | null,
  Client: string;
  Status: string;
  Description: string;
  Datetime: string;
}

const { TextArea } = Input;
const MyCallsPage: React.FC<MyCallsData> = (props: MyCallsData) => {
  // const {
  //   saveRegistrationData
  // } = props;

  const invoiceOptions = [
    { id: "Pursuing", name: "Pursuing" },
    { id: "Positive", name: "Positive" },
    { id: "Parked", name: "Parked" },
  ];
  const clientData = [
    { id: "Rubseena N U", name: "Rubseena N U" },
    { id: "Ajith Kumar", name: "Ajith Kumar" },
    { id: "Catherin Jacob", name: "Catherin Jacob" },
    { id: "Jeni Doe", name: "Jeni Doe" },
    { id: "Liya Marry", name: "Liya Marry" },
  ];
  const InitialMyCallsState = {
    // Id: null,
    Client: "",
    Status: "",
    Description: "",
    Datetime: ""
  }
  const { Id }: { Id: string } = useParams();
  const [myCalls, setmyCalls] = useState<MyCallsData>(InitialMyCallsState);
  const [type, setType] = useState('time');
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState<any>("");
  const [calendarDate, setCalendarDate] = useState("");
  const [registrationData, setRegistrationData] = useState<any>({});
  const [form] = Form.useForm();

  const submitAsyncTimesheets = async (formValues: any) => {
    try {
      let regUser = null;
      regUser = await postCallDetails(myCalls);
      console.log("This is CallDetails : ", regUser);
      setCalendarDate("");
    } catch (error) {
      message.error("submission failed. Network error");
    }
  };
  const fetchList = async () => {
    const Response = await getAPIList();
    console.log("dash - response", Response);
  };
  const onFinishInformation = (formValues: any) => {
    let updatedValues = {
      ...formValues,
    };
    console.log(updatedValues);
    submitAsyncTimesheets(updatedValues);
    setMessage("Saved successfully!");
  };

  const onFinishFailedInformation = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (dateString: string) => {
    setCalendarDate(dateString);
    const no_of_days = 7;
    const selected_date = new Date(dateString);
    const day_number = selected_date.getDay();
    const oneDay = 24 * 60 * 60 * 1000;
    for (let count = 0; count < no_of_days; count++) {
      const tempDate = new Date(
        selected_date.getTime() - day_number * oneDay + count * oneDay
      );
      const day_in_date = tempDate.getDate();
      const day_of_week = tempDate.getDay();
    }
  };
  const onChangeTextArea = (e: { target: { value: any; }; }) => {
    console.log('Change:', e.target.value);
  };
  const handleInputChange = (e: { target: { value: any; }; }) => {
    const { name, value } = e.target.value;
    setmyCalls({ ...myCalls, [name]: value });
  };
  // const [currentData, setCurrentData] = useState<CurrentData>();

  const fetchCustomerbyId = async (Id: number) => {
    try{
        console.log("starting call");
        const Response = await getCustListById(Id);
        console.log("View Cust Data ResponseData : ", Response.data);
        if (Response.status == 200) {
            // this.items= Response.data;
            if(Response.data.length > 0)
            {
              setmyCalls(Response.data[0]);
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
          await fetchCustomerbyId(parseInt(Id));
      };
      callAllAsyncFunctions();
  } catch (err) {
      console.log(err);
  }
}, []);
  const confirmRegistration = async () => {
    try {
      let calls = null;
      calls = await postCallDetails(myCalls);
      console.log("This is callslist : ", calls)
    } catch (error) {
      // message.error("Error caught in registering: " + error);
    }
  };


  const renderAction = (item: any, record: any) => {
    return (

      <div className="button">
        <div className="accept-button">
          <img
            src={AcceptIcon}
            onClick={() => {
              //   setSelectedProfessionalAllocation(record);
              //   setModalAction("Accept");
            }}
          />
        </div>
        <div className="reject-button">
          <img
            src={RejectIcon}
            onClick={() => {
              //   setSelectedProfessionalAllocation(record);
              //   setModalAction("Reject");
            }}
          />
        </div>
      </div>

    );
  };

  return (
    <>
      {console.log(myCalls)}
     

      <div className="mycalls-page-root site-card-border-less-wrapper">
        <>
        <Form
          name={"registration-form"}
          form={form}
          // initialValues={setRegData}
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
                  <Form.Item name="Client"  >
                  {/* required: true, rules={[{ message: "Select Client", },]}  */}
                    <CustomSelect
                      options={clientData}
                      placeholder="All"
                      returnId
                      className="header-type-select"
                      onChange={async (id) => {
                        await fetchCustomerbyId(id);
                  }}/>
                  </Form.Item>

                  </Col>
                  <Col span={5}></Col>
                  <Col style={{ marginLeft: "6px" }}><p><b>Status</b></p></Col>
                  <Col span={1}></Col>
                  <Col span={4}>
                  <Form.Item name="Status" >
                    <CustomSelect
                      options={invoiceOptions}
                      placeholder="Pursuing"
                      returnId
                      className="header-type-select"
                      onChange={async (id) => {
                            await fetchCustomerbyId(id);
                      }}
                    />
                   </Form.Item>

                  </Col>
                </Row>
              </div>

              <Row>
                <Col span={10}><b>Call Updates</b><br></br>
                <Form.Item name="Description"  >

                  <TextArea showCount rows={5} maxLength={100} onChange={handleInputChange} />
                  </Form.Item>

                </Col>
                <Col style={{ marginLeft: "80px" }}>
                  <b>{`  `}Next Call</b>
                  <Row>
                    <Col>
                  <Form.Item name="Datetime"  >
                    <DatePicker
                      onChange={(date: any, dateString: any) =>
                        onChange(dateString)
                      } />
                   </Form.Item>

                      </Col>
                    <Col>
                  <Form.Item name="Datetime"  >
                    <TimePicker></TimePicker>
                   </Form.Item>                    
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br></br>
              <Row align="middle" style={{ paddingLeft: "250px" }}>
                <Col span={6}><Button style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "#1fc2c2", color: "white", border: "1px solid #1fc2c2", textAlign: "center" }}>{"✓"}</Button></Col>
                <Col><Button style={{ height: "40px", width: "40px", cursor: "pointer", fontSize: "1em", fontWeight: "bold", borderRadius: "50%", backgroundColor: "red", color: "white", border: "1px solid red", textAlign: "center" }}>{"×"}</Button></Col>
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