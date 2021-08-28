import React from "react";
import "./profile-information.styles.scss";

import EditUserIcon from "../../assets/icons/edit-user.svg";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface ProfileInformationProps {
  isIndividual: boolean;
  imageUrl: string;
  title: string;
  subtitle: string;
  email: string;
  dob?: string;
  contact: number;
  phone: number;
}
const ProfileInformation: React.FC<ProfileInformationProps> = (
  props: ProfileInformationProps
) => {
  const {
    imageUrl,
    title,
    subtitle,
    email,
    dob,
    contact,
    phone,
    isIndividual,
  } = props;

  const history = useHistory();
  const { url } = useRouteMatch();

  return (
    <div className="profile-information-container">
      <div
        onClick={() => history.push(url + ROUTES.CLIENT_EDIT_USER)}
        className="edit-button box-shadow-card-material"
      >
        <img style={{ width: "20px" }} src={EditUserIcon} />
        <div className="label">Edit</div>
      </div>

      <div className="top-info">
        <img className="photo" src={imageUrl} />
        <div className="details">
          <div className="title">{title}</div>
          <div className="subtitle">{subtitle}</div>
          <div className="generic-info-title email-margin">{email}</div>
        </div>
      </div>
      <div className="bottom-info">
        {isIndividual && (
          <div className="info">
            <div className="generic-info-title">Date of Birth</div>
            <div className="data">{dob}</div>
          </div>
        )}

        <div className="info">
          <div className="generic-info-title">Contact Number</div>
          <div className="data">{contact}</div>
        </div>
        <div className="info">
          <div className="generic-info-title">Mobile Number</div>
          <div className="data">{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
