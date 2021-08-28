import { Card, Col, DatePicker, Divider, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined,PhoneOutlined,PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

const { Meta } = Card;
// function PickerWithType({ type, onChange }) {
//     if (type === 'time') return <TimePicker onChange={onChange} />;
//     if (type === 'date') return <DatePicker onChange={onChange} />;
//     return <DatePicker picker={type} onChange={onChange} />;
//   }


const CallReminderPage: React.FC = () => {
    const invoiceOptions = [
        { id: "Pursuing", name: "Pursuing" },
        { id: "Positive", name: "Positive" },
        { id: "Parked", name: "Parked" },
    ];
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);
      }
    const [type, setType] = useState('time');
    var today = new Date(),
    time = moment(today, "HH:mm:ss").format("h:mm A");
  
     
    const descr = `Philip & John` ;
    return(

        <div>
            <div style={{margin:"80px 500px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}} >
                <div style={{marginLeft:"25px"}}>
                <p><b>My Calls</b></p>
                <p>{descr}</p>
                </div>
                <Divider plain></Divider>
                <br></br>
                <div style={{marginLeft:"25px"}}>
                {/* <div className="image-container">
                <img className="image" src="https://www.w3schools.com/images/lamp.jpg" />
                </div> */}
               
                <div>                        
                        <Row>
                        <Col><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar></Col>
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
                 <Col>
                 <br></br>
                 <Row>
                    <Col span={10}>
                    <p><PhoneOutlined  rotate={90}/>7530904446</p>
                    <p>
                        {/* <MailOutlined/> */}
                    {` `}philipandjohnconsultantltd@gmail.com</p>
                    <br></br>
                    <br></br>
                    <br></br>
                   
                    </Col> 
                </Row>

                </Col>
                <Col>
                    <h1 style={{color:"#ff0000"}}><b>{time}</b></h1>                                                   
                   
                </Col>
                  
                
               
                          
                </div>                
            </div>
        </div>

    );

}
export default CallReminderPage;