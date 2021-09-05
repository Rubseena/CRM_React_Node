import { Card, Col, DatePicker, Divider, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link, useParams,useLocation } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import { isConstructSignatureDeclaration } from "typescript";
import { getCustListById } from "../../services/admin-services/dashboardServices";

const { Meta } = Card;
// function PickerWithType({ type, onChange }) {
//     if (type === 'time') return <TimePicker onChange={onChange} />;
//     if (type === 'date') return <DatePicker onChange={onChange} />;
//     return <DatePicker picker={type} onChange={onChange} />;
//   }

interface ClientPageProps {
    clientData?: any;
  }
interface ViewCustProps {
    // state:any;
    // title: string;
    CustData?: any;
}
interface CurrentServicerequest {
    Id: number;
    clientName: string;
    EmailId: string;
    // status: number;
    // startDate: string;
    // endDate: string;
    // startTime: string;
    // endTime: string;
    // totalServiceUnits: number;
    // serviceDays: number;
    // profProfileImageUrl: string;
    // profFirstName: string;
    // profLastName: string;
    // profContactNumber: string;
    // profEmailId: string;
  }
const ViewCustPage: React.FC<ViewCustProps> = (props: ViewCustProps) => {
    const {  CustData } = props;

    const invoiceOptions = [
        { id: "Pursuing", name: "Pursuing" },
        { id: "Positive", name: "Positive" },
        { id: "Parked", name: "Parked" },
    ];
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);
    }
    const [type, setType] = useState('time');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { Id }: { Id: string } = useParams();
    const [currentData, setCurrentData] = useState<any>(null);
    const [currentServicerequest, setCurrentServicerequest] = useState<
    CurrentServicerequest
  >();
    //   const [serviceRequest, setServiceRequest] = useState<any>(null);

    const fetchCustomerbyId = async (Id: number) => {
        const Response = await getCustListById(Id);
        console.log("View Cust Data ResponseData : ", Response.data);
        if (Response.status == 200) {
            setCurrentData(Response.data);
            console.log("setting after current data : ",currentData);
        }
    };
    // const location = useLocation();
    // const state = location.state

    // const {state} = useLocation();
    // console.log(state);
    useEffect(() => {
        try {
            const callAllAsyncFunctions = async () => {
                setIsLoading(true);
                await fetchCustomerbyId(parseInt(Id));
                // setIsLoading(false);
            };
            // callAllAsyncFunctions();
        } catch (err) {
            console.log(err);
        }
    }, [currentData]);



    const descr = `Philip & John`;
    return (

        <div className="mycalls-page-root site-card-border-less-wrapper" >
            <div style={{ margin: "80px 280px 150px 180px", backgroundColor: "#EAEDED", border: "1px solid black" }}  >
                <div style={{ marginLeft: "25px" }}>
                    <p><b>Customer Profile</b></p>
                    <p>{descr}</p>
                </div>
                <Divider plain></Divider>
                <br></br>
                <div style={{ marginLeft: "25px", width: "500px" }}>
                    {/* <div className="image-container">
                <img className="image" src="https://www.w3schools.com/images/lamp.jpg" />
                </div> */}
                    <div>
                        <Row>
                            <Col><Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg

                            "></Avatar></Col>
                            <Col style={{ marginLeft: "5px" }}>
                                {/* <p><b>{descr}</b></p>
                            <p>Care Home</p> */}
                                <div className="image-right-box">
                                    <div className="title"><b>{descr}</b></div>
                                    <div className="text">{`Care Home`}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <br></br>

                    <Row>
                        <Col span={12}>
                            <p><PhoneOutlined rotate={90} />7530904446</p>
                            {props.CustData.params.Id}
                            {/* <p> {state.listData.EmailId}{""}</p> */}
                            {/* //<MailOutlined/>{` `} */}
                            <div title="Customer Profile">
                                <p >Billing Address</p>
                                <p style={{ margin: "0em" }}>6 Watkin Close</p>
                                <p style={{ margin: "0em" }}>Wigan</p>
                                <p style={{ margin: "0em" }}>2</p>
                                <p style={{ margin: "0em" }}>Wigan</p>
                                <p style={{ margin: "0em" }}>United Kingdom</p>
                                <p style={{ margin: "0em" }}></p>
                                <p style={{ margin: "0em" }}>WN36GP</p>
                                <br></br>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    );

}
export default ViewCustPage;