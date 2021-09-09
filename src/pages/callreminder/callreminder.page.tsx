import { Card, Col, DatePicker, Divider, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect, useRef } from "react";
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
  
    const [count, setCount] = useState(0)
    const [timeoutCount, setTimeoutCount] = useState(null)
  
    // Use a ref to access the current count value in
    // an async callback.
    const countRef = useRef(count)
    countRef.current = count
  
    const getCountTimeout = () => {
      setTimeout(() => {
        // setTimeoutCount(countRef.current)
      }, 2000)
    }
    const descr = `Philip & John` ;
    return(

        <div style={{display:"revert",width:"100%"}}>
            <div style={{ margin:"80px 500px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}} >
                <div style={{marginLeft:"25px"}}>
                <p><b>Call Reminder</b></p>
                {/* <p>{descr}</p> */}
                </div>
                <Divider plain></Divider>
                <br></br>
                <div  style={{ marginLeft:"25px"}} >
               
                <div>                        
                        <Row>
                        <Col><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar></Col>
                            <Col style={{marginLeft:"5px"}}>
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
                <Col style={{display:"flex",alignItems:"center",alignContent:"center"}}>
                    <h1 style={{color:"#ff0000",alignItems:"center"}}><b>{time}</b></h1>                                                 
                </Col>
                </div>                
            </div>
            <div>
            Count: <button onClick={() => setCount(count + 1)}>{count}</button>
      <br />
      <br />
      <button onClick={getCountTimeout}>Get count with timeout</button>
      <br />
      <p>Count from timeout: {timeoutCount}</p>
            </div>
        </div>
    );

}
export default CallReminderPage;