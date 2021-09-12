import { Button, Card, Col, DatePicker, Divider, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link, useParams, useLocation } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import { getCustListById } from "../../services/admin-services/dashboardServices";
import { ROUTES } from "../../constants/routes";

const { Meta } = Card;
interface ViewCustProps {
    CustData?: any;
    // Id: string;
}
interface CurrentData{
    Id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    address2: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    emailId: string;
    contactNumber: string;
    mobileNumber: string;
    image: string;
}

const ViewCustPage: React.FC<ViewCustProps> = (props: ViewCustProps) => {
    const { CustData } = props;

    const invoiceOptions = [
        { id: "Pursuing", name: "Pursuing" },
        { id: "Positive", name: "Positive" },
        { id: "Parked", name: "Parked" },
    ];
  
    const [type, setType] = useState('time');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { Id }: { Id: string } = useParams();
    const [currentData, setCurrentData] = useState<CurrentData>();

    const fetchCustomerbyId = async (Id: number) => {
        try{
            console.log("starting call");
            const Response = await getCustListById(Id);
            console.log("View Cust Data ResponseData : ", Response.data);
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
                setIsLoading(true);
                await fetchCustomerbyId(parseInt(Id));
                setIsLoading(false);
            };
            callAllAsyncFunctions();
        } catch (err) {
            console.log(err);
        }
    }, []);



    
    return (
        <>
        {console.log(currentData)}
    {currentData && (        
          <div className="mycalls-page-root site-card-border-less-wrapper" >
          <div style={{ margin: "80px 280px 150px 180px", backgroundColor: "#EAEDED", border: "1px solid black" }}  >
              <div style={{ marginLeft: "25px" }}>
                  <p><b>Customer Profile</b></p>
                  <p>{`${currentData.firstName}`} {`${currentData.lastName}`}</p>
              </div>
              <Divider plain></Divider>
              <br></br>
              <div style={{ marginLeft: "25px", width: "500px" }}>
                  <div>
                      <Row>
                          <Col><Avatar src= {currentData.image ? <img src={`data:image/png;base64,${currentData.image}`}/>: ''}></Avatar></Col>
                          <Col style={{ marginLeft: "5px" }} span={10}>
                               <p><b>{`${currentData.firstName}`} {`${currentData.lastName}`}</b></p>
                                <p>{currentData.companyName}</p> 
                              {/* <div className="image-right-box">
                                  <div className="title"><b>{`${currentData.firstName}`} {`${currentData.lastName}`}</b></div>
                                  <div className="text">{currentData.companyName}</div>
                              </div>                               */}
                          </Col>
                          {/* <Col span={6}>
                          <div style={{ width: "20%" }}>
                                  <Link to={`${ROUTES.MY_CALLS}/${currentData.Id}`}>
                                      <Button style={{height:"40px",width:"40px",cursor:"pointer", fontSize:"1em",fontWeight:"bold",borderRadius:"50%",backgroundColor:"rgb(238, 161, 107)",color:"white", border: "1px solid rgb(238, 161, 107)", textAlign:"center"}}>{"+"}</Button>
                                  </Link>
                              </div>
                          </Col> */}
                      </Row>
                  </div>
                  <br></br>

                  <Row>
                      <Col span={12}>
                          <div style={{marginLeft:"25px"}}>
                          <p><PhoneOutlined rotate={90} /> {`${currentData.mobileNumber}`}</p>
                          <p><MailOutlined/> {`${currentData.emailId}`}</p>
                          {/* //<MailOutlined/>{` `} */}
                          </div>
                         
                          <div title="Customer Profile" style={{marginLeft:"25px"}}>
                              <p > Address</p>
                              <p style={{ margin: "0em" }}>{`${currentData.country}`}</p>
                              <p style={{ margin: "0em" }}>{`${currentData.province}`}</p>
                              <p style={{ margin: "0em" }}>{`${currentData.city}`}</p>
                              <p style={{ margin: "0em" }}>{`${currentData.postalCode}`}</p>
                              {/* <p style={{ margin: "0em" }}>{`${currentData.mobileNumber}`}</p> */}
                              <p style={{ margin: "0em" }}></p>
                              {/* <p style={{ margin: "0em" }}>{`${currentData.emailId}`}</p> */}
                              {/*  */}
                              <br></br>
                          </div>
                      </Col>
                  </Row>
              </div>
          </div>
      </div>

     )} 
      </>
    );

}
export default ViewCustPage;