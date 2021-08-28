import React from "react";
import "./custom-button.styles.scss";

import { Button } from "antd";

interface GenericButtonProps {
  label: string;
  onClick: () => void;
}

const GenericButton: React.FC<GenericButtonProps> = (
  props: GenericButtonProps
) => {
  const { onClick, label } = props;
  return (
    <Button className="progress-button" onClick={onClick}>
      {label}
    </Button>
  );
};

export default GenericButton;
