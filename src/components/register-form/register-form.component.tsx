import React, { useEffect, useState } from "react";
import "./register-form.styles.scss";
import CustomInputField from "../../components/custom-input-field/custom-input-field.component";
import { Row, Button, Form, DatePicker, Upload, message, Checkbox, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { convertBase64, displayBase64 } from "../../utils/helper";
import { useHistory } from "react-router-dom";

const EmailRegex = "[\\S]+[@][\\S]+[.][\\S]+";
const MobileRegex = "[0-9]{10}";

interface RegistrationFormProps {
    saveRegistrationData: (values: any) => void;
}

const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB");
    }
    return isJpgOrPng && isLt2M;
}


export const RegistrationForm: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        saveRegistrationData
    } = props;

    const [form] = Form.useForm();
    const history = useHistory();
    const handleRoute = () =>{ 
        history.push("/home");
      }
    const onFinishInformation = (formValues: any) => {
        let updatedValues = {
            ...formValues,
            image: fileImage,
        };
        saveRegistrationData(updatedValues);
    };

    const onFinishFailedInformation = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const [loading, setLoading] = useState(false);
    const [fileImage, setfileImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const onFinishUpload = () => {
        const updatedValues = {
            image: fileImage,
        };
        console.log(updatedValues);
        saveRegistrationData(updatedValues);
    };

    const onFinishFailedUpload = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{loading ? "Uploading" : "Upload"}</div>
        </div>
    );

    const handleUpload = async (event: any) => {
        console.log("INFO: ", event);
        setLoading(true);
        const file = event.file.originFileObj;
        const base64 = await convertBase64(file);
        console.log(base64);
        setLoading(false);
        setImageUrl(displayBase64(base64));
        setfileImage(base64);
        // if (info.file.status === "uploading") {
        //   setLoading(true);
        //   return;
        // }
        // if (info.file.status === "done") {
        //   // Get this url from response in real world.
        //   getBase64(info.file.originFileObj, (imageUrl: any) => {
        //     console.log("UUUURRRRLLLL: ", imageUrl.split(",")[1]);
        //     //   this.setState({
        //     //   imageUrl,
        //     //   loading: false,
        //     // })
        //     setImageUrl(imageUrl);
        //     setLoading(false);
        //   });
        // }
    };

    return (
        <Form
            name={"registration-form"}
            form={form}
            // initialValues={setRegData}
            onFinish={onFinishInformation}
            onFinishFailed={onFinishFailedInformation}
        >
               <Row justify="start" style={{ marginBottom: 0}}>
                 <div className="upload-image">
                    <>
                         <Form.Item name="image">
                             <Upload
                                accept="image/*"
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleUpload}
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </>
                </div>
            </Row>

            <Row justify="center" style={{ marginBottom: "auto"}}>
                <div className="inputs">
                    <>
                        <Form.Item name="firstName" rules={[{ required: true, message: "Enter the First Name", },]}  >
                            <CustomInputField type="text" placeholder={"First Name"} pattern={".+"} />
                        </Form.Item>
                        <Form.Item name="lastName">
                            <CustomInputField type="text" placeholder="Last Name" />
                        </Form.Item>
                        <Form.Item name="companyName" rules={[{ required: true, message: "Enter the Company Name" }]}>
                            <CustomInputField type="text" placeholder="Company Name" />
                        </Form.Item>
                        <Form.Item name="address">
                            <CustomInputField type="text" placeholder="Address Line 1" />
                        </Form.Item>
                        <Form.Item name="address2">
                            <CustomInputField type="text" placeholder="Address Line 2" />
                        </Form.Item>
                        <Form.Item name="city">
                            <CustomInputField type="text" placeholder="City" />
                        </Form.Item>
                        <Form.Item name="province">
                            <CustomInputField type="text" placeholder="Province/State" />
                        </Form.Item>
                        <Form.Item name="country">
                            <CustomInputField type="text" placeholder="Country/Region" />
                        </Form.Item>
                        <Form.Item name="postalCode">
                            <CustomInputField type="text" placeholder="Postal Code" />
                        </Form.Item>
                        <Form.Item name="emailId" rules={[{ required: true, message: "Enter the E-mail Id" },]}>
                            <CustomInputField type="email" placeholder="E-mail" pattern={EmailRegex} />
                        </Form.Item>
                        <Form.Item name="contactNumber">
                            <CustomInputField type="tel" placeholder="Contact Number" pattern="[0-9]{10}" />
                        </Form.Item>
                        <Form.Item name="mobileNumber" rules={[{ required: true, message: "Enter the Mobile Number", }]}>
                            <CustomInputField type="tel" placeholder="Mobile Number" pattern={MobileRegex} />
                        </Form.Item>
                    </>
                </div>
            </Row>
         
            <Row justify="space-between">
                <Button 
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right">
                    {"SUBMIT"}
                </Button>
                {/* onClick={handleRoute} */}
            </Row>
            <br></br>
        </Form>
    );
};


