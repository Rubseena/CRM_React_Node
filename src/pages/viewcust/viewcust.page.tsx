import { Card, Col, DatePicker, Divider, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined,PhoneOutlined,PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";

const { Meta } = Card;
// function PickerWithType({ type, onChange }) {
//     if (type === 'time') return <TimePicker onChange={onChange} />;
//     if (type === 'date') return <DatePicker onChange={onChange} />;
//     return <DatePicker picker={type} onChange={onChange} />;
//   }


const ViewCustPage: React.FC = () => {
    const invoiceOptions = [
        { id: "Pursuing", name: "Pursuing" },
        { id: "Positive", name: "Positive" },
        { id: "Parked", name: "Parked" },
    ];
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);
      }
    const [type, setType] = useState('time');
      
  
     
    const descr = `Philip & John` ;
    return(

        <div className="mycalls-page-root site-card-border-less-wrapper" >
            <div style={{margin:"80px 280px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}}  >
                <div style={{marginLeft:"25px"}}>
                <p><b>Customer Profile</b></p>
                <p>{descr}</p>
                </div>
                <Divider plain></Divider>
                <br></br>
                <div style={{marginLeft:"25px",width:"500px"}}>
                {/* <div className="image-container">
                <img className="image" src="https://www.w3schools.com/images/lamp.jpg" />
                </div> */}
                    <div>
                        <Row>
                        <Col><Avatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg

"></Avatar></Col>
                            <Col style={{marginLeft:"5px"}}>
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
                    <p><PhoneOutlined  rotate={90}/>7530904446</p>
                    <p>philipandjohnconsultantltd@gmail.com</p>
                    {/* //<MailOutlined/>{` `} */}
                    <div title="Customer Profile">
                        <p >Billing Address</p>
                        <p style={{margin: "0em"}}>6 Watkin Close</p>
                        <p style={{margin: "0em"}}>Wigan</p>
                        <p style={{margin: "0em"}}>2</p>
                        <p style={{margin: "0em"}}>Wigan</p>
                        <p style={{margin: "0em"}}>United Kingdom</p>
                        <p style={{margin: "0em"}}></p>
                        <p style={{margin: "0em"}}>WN36GP</p>
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