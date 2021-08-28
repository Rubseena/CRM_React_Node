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


const MyCallsPage: React.FC = () => {
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

        <div className="mycalls-page-root site-card-border-less-wrapper">
            <div style={{margin:"80px 280px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}} >
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
                
                <Row>
                    <Col span={10}>
                    <p><PhoneOutlined  rotate={90}/>7530904446</p>
                    <p><MailOutlined/>{` `}philipandjohnconsultantltd@gmail.com</p>
                    </Col>
                    <Col  style={{marginLeft:"80px"}}>
                    <Row>
                    <p><b>Engagement Status</b>{` : `}</p>
                    <p>{` `}<CustomSelect
                        options={invoiceOptions}
                        placeholder="Pursuing"
                        returnId
                        className="header-type-select"
                        onChange={async (id) => {
                            //   await fetchInvoice(id);
                        }}
                    /></p>
                    </Row>
                    </Col>

                </Row>
                <Row>
                    <Col span={10}>
                    <b>Call Updates</b><br></br>                    
                        <Card style={{marginBottom:"10px"}}>
                            <div>
                            <p>{`Call Updates Discussed about possible engagement with P&J.
                    Customer is intrested to start the engagement in the month
                    of September 2021.Need to send the contract document draft
                    by 15 August 2021 and initiate a review meeting`}</p>
                            </div>
                        </Card>                   
                    </Col>
                    <Col style={{marginLeft:"80px"}}>
                    <b>{`  `}Next Call</b>
                    <Row>
                        <Col><DatePicker onChange={onChange} /></Col>
                        {/* <Col><PickerWithType type={type} onChange={(value: any) => console.log(value)} /></Col> */}
                        <Col><TimePicker></TimePicker></Col>
                    </Row>
                    </Col>

                </Row>
                
             
              
                </div>
                
            </div>

           {/* <Card bordered={true} style={{ width: 200 }}>
            <Meta title="My Calls" description={descr} />
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card> */}
            {/* <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}/>         */}

        </div>

    );

}
export default MyCallsPage;