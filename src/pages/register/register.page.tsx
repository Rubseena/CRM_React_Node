import React, { useState, useEffect } from "react";
import "./register.styles.scss";
import { Row, Col, message, Button, Radio, Steps } from "antd";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

import { useHistory } from "react-router-dom";

import RegistrationProgress from "../../components/register-progress/register-progress.component";
import {
  InformationForm, ConfirmationForm
} from "../../components/register-form/register-form.component";

import clientImage from "../../assets/images/CleintMain.svg";
import profImage from "../../assets/images/ProfessionalMain.svg";

const RegisterPage: React.FC = (props: any) => {
  interface UserType {
    id: number;
    title: string;
    image?: string;
    color?: string;
  }

  //#region  hardcoded data

  // const userTypes: Array<UserType> = [
  //   { id: 0, title: "Client", image: clientImage, color: "#1FC2C2" },
  //   { id: 1, title: "Professional", image: profImage, color: "#2A4E96" },
  // ];

  const steps = [
    {
      id: 0,
      title: "Add Customer",
    }
  ];



  //#endregion

  //#region Hooks

  const [registrationData, setRegistrationData] = useState<any>({});
  const [currentProgressIndex, setcurrentProgressIndex] = useState(0);
  const [userType, setUserType] = useState<UserType | undefined>(undefined);

  const history = useHistory();

  // this useEffect is specifically for the registration submission.
  // Use another useEffect for different purposes.
  // useEffect(() => {
  //   if (userType && userType.id === 0 && currentProgressIndex === 4) {
  //     confirmRegistration();
  //   } else if (userType && userType.id === 1 && currentProgressIndex === 3) {
  //     confirmRegistration();
  //   }
  // }, [registrationData]);

  //#endregion

  //#region General_functions
  const { Step } = Steps;
  const goToNextStep = () => {
    setcurrentProgressIndex(currentProgressIndex + 1);
  };

  const goToPreviousStep = () => {
    setcurrentProgressIndex(currentProgressIndex - 1);
  };
  console.log("registrationData", registrationData);


  const saveRegistrationData = (values: any) => {
    setRegistrationData((prevState: any) => ({
      ...prevState,
      ...values,
    }));
  };

  //#endregion


  return (
    <div className="register-container">

      <Col xs={20} md={20} lg={20}>
        <Step style={{ padding: '25px', fontSize: '25px', color: '#1fc2c2' }} status="finish" title="Add Customer" icon={<UserOutlined />} />
      </Col>
      {/* ROW 3: Forms  */}

      <InformationForm
        isVisible={currentProgressIndex === 0}
        currentProgressIndex={currentProgressIndex}
        goToPreviousStep={goToPreviousStep}
        steps={steps}
        goToNextStep={goToNextStep}
        saveRegistrationData={saveRegistrationData}
        setRegData={setRegistrationData}
      />


      <ConfirmationForm
        isVisible={currentProgressIndex === 4}
        currentProgressIndex={currentProgressIndex}
        goToPreviousStep={goToPreviousStep}
        steps={steps}
        goToNextStep={goToNextStep}
        saveRegistrationData={saveRegistrationData}
      />
    </div>
  );
};

export default RegisterPage;
