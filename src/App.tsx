import React,{useEffect} from "react";
import {BrowserRouter,HashRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route.component";
import RegisterPage from "./pages/register/register.page";
import DashboardPage from "./pages/dashboard/dashboard.page";
import MyCallsPage from "./pages/mycalls/mycalls.page";
import MyCallsByIdPage from "./pages/updatecalls/updatecalls.page";
import ViewCustPage from "./pages/viewcust/viewcust.page";
import CallReminderPage from "./pages/callreminder/callreminder.page";
import "./App.scss";
import "./services/axiosInterceptor";
import { Row, Col } from "antd";
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ROUTES } from "./constants/routes";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "CRM Solution"
  }, [])
  return (
    <Row className="main-row">
      <Col xs={24} md={24} lg={24}>
        {/* <BrowserRouter> */}
        <HashRouter>
        <Switch>  
          <Route path={ROUTES.HOME} component={DashboardPage} exact />
          <Route path={ROUTES.REGISTER} component={RegisterPage} exact /> 
          <Route path={ROUTES.MY_CALLS} component={MyCallsPage} exact /> 
          <Route path={`${ROUTES.MY_CALLS}/:Id`} component={MyCallsPage} exact /> 
          <Route path={`${ROUTES.VIEW_CALL_ID}/:Id`} component={MyCallsByIdPage} exact />           
          <Route path={`${ROUTES.VIEW_CUST}/:Id`} component={ViewCustPage} exact />   
          <Route path={ROUTES.CALL_REMINDER} component={CallReminderPage} exact /> 
          <PrivateRoute
            path={ROUTES.REGISTER} component={RegisterPage} exact
          />
          <Redirect exact path="/" to="/home" />
        </Switch>
        </HashRouter>
        {/* </BrowserRouter> */}
      </Col>
    </Row>
  );
};
export default App;
