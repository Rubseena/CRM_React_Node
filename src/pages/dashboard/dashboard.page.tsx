import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Link, useHistory } from "react-router-dom";
import { Button, Row, Card, Col, Image, List, Avatar, Steps, Statistic, Spin } from "antd";
import { ROUTES } from "../../constants/routes";
import LandingPageButton from "../../components/landing-page-button/landing-page-button.component";
import addclient from "../../assets/icons/add_client.svg";
import whatsapp from "../../assets/icons/whatsapp.svg";
import "./dashboard.styles.scss";
import CustomSelect from "../../components/custom-select/custom-select.component";
import moment from "moment";
// import { Icon } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';
import {
    getAPIList,
    // getClientUserList,
    // getInvoiceList,
    // getServiceRequestList,
    // getAllPendingRegistrationRequests,
} from "../../services/admin-services/dashboardServices";
const DashboardPage: React.FC = () => {

    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var today = new Date(),
        time = moment(today, "HH:mm:ss").format("h:mm A");
    const { path } = useRouteMatch();
    const itemsInView = 10;
    const invoiceOptions = [
        { id: "All", name: "All" },
        { id: "Positive", name: "Postive" },
        { id: "Pursuing", name: "Pursuing" },
        { id: "Future", name: "Future" },
        { id: "Parked", name: "Parked" },
    ];
    const [listLoadedData, setListLoadedData] = useState<any>();
    const [listData, setListData] = useState<any>();
    const [loadingList, setLoadingList] = useState<boolean>(false);
    const [isListViewMore, setIsListViewMore] = useState<boolean>(false);
    const [listChuckCount, setListChuckCount] = useState<number>(1);


    const viewMore = async (
        data: any,
        setDataMethod: any,
        setDataViewMoreMethod: any,
        setIsViewMoreMethod: any,
        setChuckCount: any
    ) => {
        if (data.length <= itemsInView) {
            setDataMethod(data);
            setDataViewMoreMethod(data);
            setIsViewMoreMethod(false);
        } else {
            setDataMethod(data);
            setDataViewMoreMethod(data.slice(0, itemsInView));
            setIsViewMoreMethod(true);
            setChuckCount(2);
        }
    };

    const loadViewMore = async (
        data: any,
        setDataViewMoreMethod: any,
        setIsViewMoreMethod: any,
        chunkCount: number,
        setChuckCount: any
    ) => {
        if (data.length <= itemsInView * chunkCount) {
            setDataViewMoreMethod(data);
            setIsViewMoreMethod(false);
        } else {
            setDataViewMoreMethod(data.slice(0, itemsInView * chunkCount));
            setIsViewMoreMethod(true);
            setChuckCount(chunkCount + 1);
        }
    };

    const { Step } = Steps;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchList = async () => {
        const Response = await getAPIList();
        console.log("dash - response", Response);
        if (Response.status === 200) {
            viewMore(
                Response.data.sort((Invoice1: any, Invoice2: any) => {
                    if (Invoice1.invoiceId < Invoice2.invoiceId) {
                        return 1;
                    }
                    if (Invoice1.invoiceId > Invoice2.invoiceId) {
                        return -1;
                    }
                    return 0;
                }),
                setListData,
                setListLoadedData,
                setIsListViewMore,
                setListChuckCount
            );
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);


            // Load All Invoices
            //   setLoadingList(true);
            //   await fetchInvoice("All");
            //   setLoadingList(false);
            await fetchList()
            // console.log("My Id" ,listData.Id);

            setIsLoading(false);
        };
        fetchInitialData();
    }, []);
    //   const history = useHistory();
    // history.push(`/viewCust:${listData.Id}`)

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div className="admin-page-root client-page-container padding-content">

                    <div
                        className="site-card-wrapper-bottom"
                        style={{ paddingBottom: "20px" }}
                    >
                        <div style={{ background: "#e7edf0 0% 0% no-repeat padding-box", paddingLeft: "120px", paddingRight: "50px" }}>
                            <Col xs={20} md={20} lg={20}>
                                <Step style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2' }} status="finish" title="CRM Dashboard" />
                            </Col>
                            <Row >
                                <Col span={9}>
                                    <Row>
                                        <Col span={16}>
                                            <Row className="user-add-block">
                                                <Col
                                                    span={24}
                                                    className="admin-button-client hover-payment"
                                                >
                                                    <Link to={`${ROUTES.REGISTER}`}>
                                                        <LandingPageButton
                                                            label="Add Customer"
                                                            imageUrl={addclient}
                                                        />
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <br></br>
                                   

                                    <Row>
                                        <Col span={16}>
                                            <div className="list-container">
                                                <div className="list-header-wrapper ant-list-header">
                                                    <div className="list-header">
                                                        <div className="header-text-wrapper">
                                                            {/* <Link to={{ pathname: ROUTES.VIEW_CUST }} style={{ color: "black", fontSize: "15px" }}> */}
                                                                <Row style={{ flexFlow: "nowrap" }} className="user-add-block">
                                                                {/* style={{ flexFlow: "wrap-reverse" }} */}
                                                                    <Col > <UserOutlined /></Col>
                                                                    <Col span={0}>{"View"}</Col>
                                                                </Row>
                                                            {/* </Link> */}

                                                        </div>
                                                        {/* <div className="header-count-wrapper">
                                                    <Button
                                                        type="primary"
                                                        size="small"
                                                        style={{
                                                            background: "#FFA62F",
                                                            borderColor: "#FFA62F",
                                                        }}
                                                        shape="round"
                                                    >
                                                        {listData && listData.length}
                                                    </Button>
                                                </div> */}
                                                        {/* <div className="header-type-wrapper">
                                                    <CustomSelect
                                                        options={invoiceOptions}
                                                        placeholder="All"
                                                        returnId
                                                        className="header-type-select"
                                                        onChange={async (id) => {
                                                            //   await fetchInvoice(id);
                                                        }}
                                                    />
                                                </div> */}
                                                    </div>
                                                </div>

                                                <List
                                                    loading={loadingList}
                                                    loadMore={
                                                        isListViewMore === true ? (
                                                            <div className="load-more">
                                                                <p
                                                                    onClick={() => {
                                                                        loadViewMore(
                                                                            listData,
                                                                            setListLoadedData,
                                                                            setIsListViewMore,
                                                                            listChuckCount,
                                                                            setListChuckCount
                                                                        );
                                                                    }}
                                                                >
                                                                    {"View More"}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )
                                                    }
                                                    className="list"
                                                    header={""}
                                                    itemLayout="horizontal"
                                                    dataSource={listLoadedData}
                                                    // dataSource={data1}

                                                    renderItem={(item: any) => (
                                                        <List.Item extra>
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Avatar src=  {item.image ? <img src={`data:image/png;base64,${item.image}`}/>: ''}
                                                                        shape="circle" />
                                                                }
                                                                title={`${item.firstName} ` + `${item.lastName} `}
                                                                description={`${item.city}`}

                                                            // description={moment(
                                                            //     new Date(item.generatedOn)
                                                            // ).format("DD/MM/YYYY")}
                                                            />
                                                            {/* <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description="Ernakulam"
                                                    /> */}
                                                            <Link to={`${ROUTES.VIEW_CUST}/${item.Id}`}>
                                                                <div>
                                                                    <h4 style={{ color: "#1fc2c2" }}><b>{`>>`}</b></h4>
                                                                </div>

                                                            </Link>
                                                        </List.Item>
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={7}>
                                    <div className="list-container">
                                        <div className="list-header-wrapper ant-list-header">
                                            <div className="list-header">
                                                <div className="header-text-wrapper" style={{ width: "50%" }}>
                                                    {/* <Link to={ROUTES.MY_CALLS} style={{ color: "black", fontSize: "15px" }}> */}
                                                        <Row style={{ flexFlow: "nowrap" }}>
                                                            <Col ><PhoneOutlined rotate={90} /></Col>
                                                            <Col>{"MyCalls"}</Col>
                                                            <Col span={12}>
                                                            <div style={{ width: "20%" }}>
                                                                    {/* <Link to={`${ROUTES.MY_CALLS}/${currentData.Id}`}> */}
                                                                    <Link to={ROUTES.MY_CALLS}>
                                                                        <Button style={{height:"40px",width:"40px",cursor:"pointer", fontSize:"1em",fontWeight:"bold",borderRadius:"50%",backgroundColor:"rgb(238, 161, 107)",color:"white", border: "1px solid rgb(238, 161, 107)", textAlign:"center"}}>{"+"}</Button>
                                                                    </Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {/* </Link> */}

                                                </div >
                              

                                                {/* <div>
                                       <PlusOutlined className="button reject-button"/>
                                       </div> */}
                                                {/* <img src={RejectIcon} onClick={() => { handleReject(srId, serviceData, setServiceData) }} /> */}

                                                {/* <div className="header-count-wrapper">
                                               <Button
                                                   type="primary"
                                                   size="small"
                                                   style={{
                                                       background: "#FFA62F",
                                                       borderColor: "#FFA62F",
                                                   }}
                                                   shape="round"
                                               >
                                                   {listData && listData.length}
                                               </Button>
                                           </div>
                                           */}
                                                <div className="header-type-wrapper">
                                                    <CustomSelect
                                                        options={invoiceOptions}
                                                        placeholder="All"
                                                        returnId
                                                        className="header-type-select"
                                                        onChange={async (id) => {
                                                            //   await fetchInvoice(id);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <List
                                            loading={loadingList}
                                            loadMore={
                                                isListViewMore === true ? (
                                                    <div className="load-more">
                                                        <p
                                                            onClick={() => {
                                                                loadViewMore(
                                                                    listData,
                                                                    setListLoadedData,
                                                                    setIsListViewMore,
                                                                    listChuckCount,
                                                                    setListChuckCount
                                                                );
                                                            }}
                                                        >
                                                            {"View More"}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            }
                                            className="list"
                                            header={""}
                                            itemLayout="horizontal"
                                            dataSource={listLoadedData}
                                            // dataSource={data2}
                                            renderItem={(item: any) => (
                                                <List.Item extra>

                                                    {/* <List.Item.Meta
                                                   title={`${item.invoiceId} `}
                                                   description={moment(
                                                       new Date(item.generatedOn)
                                                   ).format("DD/MM/YYYY")}
                                               /> */}
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src= {item.image ? <img src={`data:image/png;base64,${item.image}`}/>: ''}
                                                                shape="circle"
                                                            />
                                                        }

                                                        title={`${item.firstName} ` + `${item.lastName} `}
                                                        description={`${item.city}`}
                                                    />
                                                    <Row>
                                                        <Col span={12}>
                                                        <div className="dashboard-status-round-positive" style={{marginRight:"20px"}}></div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={20}>
                                                            <Row><h3 style={{ color: "#ff0000" }}><b>{time}</b></h3></Row>
                                                            <Row><h5 style={{ color: "#797980" }}><b>{date}</b></h5> </Row>
                                                        </Col>
                                                        <Col span={3}>
                                                            <Link to={`${ROUTES.MY_CALLS}/${item.Id}`}>

                                                                <div><h4 style={{ color: "#1fc2c2" }}><b>{`>>`}</b></h4></div>
                                                            </Link>
                                                        </Col>
                                                    </Row>

                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </Col>
                                {/* <Col span={6}>hi</Col> */}
                            </Row>
                        </div>

                    </div>
                </div>
            </Route>
        </Switch>


    );
};
export default DashboardPage;