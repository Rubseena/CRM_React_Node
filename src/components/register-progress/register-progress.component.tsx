import React from "react";
import "./register-progress.styles.scss";

import { Steps } from "antd";

const { Step } = Steps;

interface StepProps {
  // currentStepIndex: number;
  steps: Array<{ id: number; title: string }>;
}

const RegistrationProgress: React.FC<StepProps> = (props: StepProps) => {
  const { steps } = props;
  // currentStepIndex,
  return (
    // current={currentStepIndex}
    <Steps className="register-progress" >
      {steps.map((step) => (
        <Step key={step.id} title={step.title} />
      ))}
    </Steps>
  );
};

export default RegistrationProgress;
