import React, { useState, useEffect } from "react";
import "./register.styles.scss";
import { Row, Col, message, Button, Radio, Steps } from "antd";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import { RegistrationForm } from "../../components/register-form/register-form.component";
import { postClientRegisterUser } from "../../services/admin-services/dashboardServices";

const RegisterPage: React.FC = (props: any) => {

  const [registrationData, setRegistrationData] = useState<any>({});
  const history = useHistory();

  useEffect(() => {
    confirmRegistration();
  }, [registrationData]);

  const { Step } = Steps;
  // function handleClick() {
  //   history.push("/home");
  // }
  const confirmRegistration = async () => {
    try {
      let Response = null;
      Response = await postClientRegisterUser(registrationData);
      console.log("This is regUser : ", Response)
      if(Response.status===200)
      {
        // history.push("/home");
      }
    } catch (error) {
      message.error("Error caught in registering: " + error);
    }
  };

  return (
    <div className="register-container">
<Row>
<Col>
      <Link to="/home" style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2'}}>Home</Link>      
      </Col>
      <Col >
        <Step style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2' }} status="finish" title="Add Client" />   
        {/* icon={<UserOutlined />}    */}
      </Col>
     
</Row>
      <RegistrationForm
        saveRegistrationData={setRegistrationData}
      />
    </div>
  );
};

export default RegisterPage;
