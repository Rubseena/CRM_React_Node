import React, { useState, useEffect } from "react";
import "./register.styles.scss";
import { Row, Col, message, Button, Radio, Steps } from "antd";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { RegistrationForm } from "../../components/register-form/register-form.component";
import { postClientRegisterUser } from "../../services/admin-services/dashboardServices";

const RegisterPage: React.FC = (props: any) => {

  const [registrationData, setRegistrationData] = useState<any>({});
  const history = useHistory();

  useEffect(() => {
    confirmRegistration();
  }, [registrationData]);

  const { Step } = Steps;
  const confirmRegistration = async () => {
    try {
      let regUser = null;
      regUser = await postClientRegisterUser(registrationData);
      console.log("This is regUser : ", regUser)
    } catch (error) {
      message.error("Error caught in registering: " + error);
    }
  };

  return (
    <div className="register-container">

      <Col xs={20} md={20} lg={20}>
        <Step style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2' }} status="finish" title="Add Customer" icon={<UserOutlined />} />
      </Col>

      <RegistrationForm
        saveRegistrationData={setRegistrationData}
      />
    </div>
  );
};

export default RegisterPage;
