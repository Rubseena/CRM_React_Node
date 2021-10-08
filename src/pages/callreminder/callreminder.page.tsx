import { Card, Col, DatePicker, Divider, Row, Space, TimePicker ,message} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined,PhoneOutlined,PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { getCallList, getReminderList } from "../../services/admin-services/dashboardServices";
import Item from "antd/lib/list/Item";

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
    var today = new Date(),
    time = moment(today, "HH:mm:ss").format("h:mm A");
  
    const [count, setCount] = useState(0)
    const [timeoutCount, setTimeoutCount] = useState(null)
    let [values, setValues] = useState({
        categoriesList: "",
        error: "false",
      });
    let { categoriesList, error } = values;

    const fetchCallsList = async () => {
      const Response = await getCallList();
      // console.log("call - response", Response);
      if (Response.status === 200) {
          
      }
  }
  useEffect(() => {
    const fetchInitialData = async () => {        
        await fetchCallReminder();
    };
    fetchInitialData();
}, []);

    const fetchCallReminder = async () => {
        try{
            console.log("reminderlog");
            const Response = await getReminderList();
            console.log("status of ResponseData : ", Response.status);
            console.log(" ResponseData : ", Response.data);

            if (Response.status == 200) {
                // this.items= Response.data;
                if(Response.data.length > 0)
                {
                    setValues(Response.data[0]);
                }
            }
        }
        catch(err){
            console.log(err);
        }      
    };
    const loadCallReminder = () => {
        fetchCallReminder();
        
      };
     
    //   useEffect(() => {
    //     if(!categoriesList && !error) {
    //       let timerFunc = setTimeout(() => {
    //         setValues({
    //           ...values,
    //           error: "Error fetching reminder list... try after some time !",
    //         });
    //       }, 10000);
    
    //       return () => clearTimeout(timerFunc);
    //   }
    // }, [!categoriesList, !error]);
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
      <>
      {Item.length>0 && (
      
      <div style={{display:"revert",width:"100%"}}>
            <div style={{ margin:"80px 500px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}} >
                <div style={{marginLeft:"25px"}}>
                <p><b>Call Reminder</b></p>
                {/* <p>{descr}</p> */}
                </div>
        {console.log(Item)}

                <Divider plain></Divider>
                <br></br>
                <div  style={{ marginLeft:"25px"}} >
               
                <div>                        
                        <Row>
                        <Col>
                        {/* <Avatar src={item.image ? <img src={`data:image/png;base64,${item.image}`} /> : ''} */}
                                                                        {/* shape="circle" /> */}
                        <Avatar shape="circle" 
                        //  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" 
                        ></Avatar></Col>
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
                    {` `}philipnjohnconsultantltd@gmail.com</p>
                    <br></br>
                    <br></br>
                    <br></br>
                   
                    </Col> 
                    <Col style={{display:"flex",alignItems:"center",alignContent:"center"}}>
                    <h1 style={{color:"#ff0000",alignItems:"center"}}><b>{time}</b></h1>                                                 
                </Col>
                </Row>

                </Col>
               
                </div>                
            </div>
            <div>
            {/* Reminder: <button onClick={() => {setValues(values)}}>{values}</button> */}
      <br />
      <br />
      {/* <button onClick={getCountTimeout}>Get count with timeout</button> */}
      <br />
      {/* <p>Count from timeout: {timeoutCount}</p> */}
            </div>
        </div>
      )}
      </>

    );

}
export default CallReminderPage;


