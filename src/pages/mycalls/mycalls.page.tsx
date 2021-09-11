import { Button, Card, Col, DatePicker, Divider, Input, Row, Space, TimePicker } from "antd";
import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link, useParams } from "react-router-dom";
import CustomSelect from "../../components/custom-select/custom-select.component";
import { MailOutlined,PhoneOutlined,PlusOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import AcceptIcon from "../../assets/icons/check_1.svg";
import RejectIcon from "../../assets/icons/remove.svg";
import { getAPIList, getCustListById } from "../../services/admin-services/dashboardServices";
const { Meta } = Card;
// function PickerWithType({ type, onChange }) {
//     if (type === 'time') return <TimePicker onChange={onChange} />;
//     if (type === 'date') return <DatePicker onChange={onChange} />;
//     return <DatePicker picker={type} onChange={onChange} />;
//   }

interface ViewCallProps {
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
const { TextArea } = Input;
const MyCallsPage: React.FC<ViewCallProps> = (props:ViewCallProps) => {
  // const MyCallsPage: React.FC = () => {

  // const { CustData } = props;

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
    const { Id }: { Id: string } = useParams();
    const [currentData, setCurrentData] = useState<CurrentData>();
    const fetchCustomerCallsbyId = async (Id: number) => {
        try{
            console.log("starting call");
            const Response = await getCustListById(Id);
            console.log("View Cust Data ResponseData : ", Response.data);
            if (Response.status == 200) {
                // this.items= Response.data;
                setCurrentData(Response.data);
            }
        }
        catch(err){
            console.log(err);
        }      
    };
    function onChange(date: any, dateString: any) {
        console.log(date, dateString);
      }
      const onChangeTextArea = (e: { target: { value: any; }; }) => {
        console.log('Change:', e.target.value);
      };
      
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listData, setListData] = useState<any>();
    const fetchList = async () => {
      const Response = await getAPIList();
      // console.log("dash - response", Response);
    console.log("fetchlistforselectusers",Response);

    };
    const [type, setType] = useState('time');
    useEffect(() => {
      try {
          const callAllAsyncFunctions = async () => {
              setIsLoading(true);
              await fetchCustomerCallsbyId(parseInt(Id));
        await fetchList()
              setIsLoading(false);
          };
          callAllAsyncFunctions();
      } catch (err) {
          console.log(err);
      }
  }, []);

      
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
     
    const descr = `Philip & John` ;
    return(
      // <>
      // {currentData && (

        <div className="mycalls-page-root site-card-border-less-wrapper">
            <div style={{margin:"80px 280px 150px 180px",backgroundColor:"#EAEDED",border:"1px solid black"}} >
                <div style={{marginLeft:"25px"}}>
                <p><b>My Calls</b></p>
                <p>{descr}</p>
                </div>
                <Divider plain></Divider>
                <br></br>
                <div style={{marginLeft:"25px"}}>
                    <div>
                        <Row>
                          <Col><Avatar></Avatar></Col>
                        {/* <Col><Avatar src= {currentData.image ? <img src={`data:image/png;base64,${currentData.image}`}/>: ''}></Avatar></Col> */}
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
                    <Col  style={{ marginLeft:"80px", marginRight:"20px"}} span={9}>
                      <Col span={9}>
                      <div className="header-type-wrapper">
                            <Row style={{padding:"0px"}} gutter={5}>
                              <Col>
                              <p><b>Client</b></p>                              
                              </Col>
                              <Col span={0.75}>
                                :
                                </Col>
                              <Col>
                              <CustomSelect
                                options={clientData}
                                placeholder="All"
                                returnId
                                className="header-type-select"
                                onChange={async () => {
                                    return await fetchList();
                                }}
                                // value={async () => {
                                //   return await fetchList();
                                // }}
                            />
                              </Col>
                            </Row>
                            <Row></Row>                     
                  </div>
                      </Col>
                    <Row style={{padding:"0px"}} gutter={5}>                      
                      <Col><p><b>Status</b></p></Col>
                      <Col span={0.75}>:</Col>
                      <Col>
                      <CustomSelect
                        options={invoiceOptions}
                        placeholder="Pursuing"
                        returnId
                        className="header-type-select"
                        onChange={async (id) => {
                            //   await fetchInvoice(id);
                        }}
                    />
                      </Col>
                    </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}><b>Call Updates</b><br></br>
                            <div>
                            <TextArea showCount rows={5} maxLength={100} onChange={onChangeTextArea}/>                       
                            </div>
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
                <br></br>
                <Row align="middle" style={{paddingLeft:"250px"}}>
                  <Col span={6}><Button style={{height:"40px",width:"40px",cursor:"pointer", fontSize:"1em",fontWeight:"bold",borderRadius:"50%",backgroundColor:"#1fc2c2",color:"white", border: "1px solid #1fc2c2", textAlign:"center"}}>{"✓"}</Button></Col>
                  <Col><Button style={{height:"40px",width:"40px",cursor:"pointer", fontSize:"1em",fontWeight:"bold",borderRadius:"50%",backgroundColor:"red",color:"white", border: "1px solid red", textAlign:"center"}}>{"×"}</Button></Col>     
                </Row>            
              <br></br>
                </div>                
            </div>
        </div>
// )}
// </>
);

}
export default MyCallsPage;