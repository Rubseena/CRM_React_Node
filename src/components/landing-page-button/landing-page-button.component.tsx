import React from "react";
import "./landing-page-button.styles.scss";

interface LandingPageButtonProps {
  isGreen?: boolean;
  label: string;
  imageUrl: string;
  onClick?: () => void;
}
const LandingPageButton: React.FC<LandingPageButtonProps> = (
  props: LandingPageButtonProps
) => {
  const { label, imageUrl, onClick, isGreen } = props;

  return (
    <div
      className={`landing-page-button ${isGreen ? "green" : "white"}`}
      onClick={onClick}
    >
      <img className="image" alt="main-button" src={imageUrl} />
      <div className="label">{label}</div>
    </div>
  );
};

export default LandingPageButton;
