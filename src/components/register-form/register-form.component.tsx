import React, { useEffect, useState } from "react";
import "./register-form.styles.scss";

import CustomInputField from "../../components/custom-input-field/custom-input-field.component";
import CustomCheckbox from "../../components/custom-checkbox/custom-checkbox.component";
import CustomSelect from "../../components/custom-select/custom-select.component";

import { ReactComponent as WhatsappIcon } from "../../assets/icons/whatsapp.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/mail.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/phone.svg";

import { Row, Button, Form, DatePicker, Upload, message, Checkbox, Input } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { some, isEmpty } from "lodash";
// import {
//     getclientRegtypes,
//     getprofRegtypes,
// } from "../../services/user-services/registrationService";
import { convertBase64, displayBase64 } from "../../utils/helper";
import pdfIcon from "../../assets/icons/pdf.svg";

const EmailRegex = "[\\S]+[@][\\S]+[.][\\S]+";
const MobileRegex = "[0-9]{10}";

interface RegistrationFormProps {
    currentProgressIndex: number;
    goToPreviousStep: () => void;
    goToNextStep: () => void;
    steps: Array<{ id: number; title: string }>;
    saveRegistrationData: (values: any) => void;
    setRegData?: any;
    isVisible: boolean;
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


export const InformationForm: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        currentProgressIndex,
        goToPreviousStep,
        goToNextStep,
        steps,
        saveRegistrationData,
        setRegData,
        isVisible,
    } = props;

    const [typeOptions, setTypeOptions] = useState([]);
    const genderOptions = [
        { id: "M", name: "Male" },
        { id: "F", name: "Female" },
        { id: "U", name: "Transgender" },
        { id: "O", name: "Others" },
    ];

    // useEffect(() => {
    //     const fetchTypeData = async () => {
    //         const clientTypeData = await getclientRegtypes();
    //         setTypeOptions(clientTypeData.data);
    //     };
    //     fetchTypeData();
    // }, []);

    const [form] = Form.useForm();
    const [clientType, setClientType] = useState(0);

    const onSelected = (label: string, value: string) => {
        form.setFieldsValue({ [label]: value });
    };

    //To delete keys from an array
    const deleteKey = (keys: Array<string>, obj: any) => {
        keys.map((key) => delete obj[key]);
    };

    const onFinishInformation = (values: any) => {
        let updatedValues = {
            ...values,
        };
        setRegData({});
        clientType !== 1 &&
            deleteKey(
                [
                    "emergencyContactPerson",
                    "emergencyContactNumber",
                    "lastName",
                    "gender",
                ],
                updatedValues
            );

        if (values.contactNumber === undefined || values.contactNumber === null || values.contactNumber === "") {
            updatedValues = {
                contactNumber: values.mobileNumber,
                ...updatedValues,
            }
        }
        saveRegistrationData(updatedValues);
        goToNextStep();
    };

    const onFinishFailedInformation = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            className={`${
                isVisible ? "visible-registration-form" : "hidden-registration-form"
                }`}
            name={`registration-form-step-${currentProgressIndex}`}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishInformation}
            onFinishFailed={onFinishFailedInformation}
        >
            <Row justify="center">
                <div className="inputs">
                    <>
                        {/* TYPE */}
                        {/* <Form.Item
                            name="clientTypeId"
                            rules={[
                                {
                                    required: true,
                                    message: "Select the Type of User",
                                },
                            ]}
                        >
                            <CustomSelect
                                options={typeOptions}
                                placeholder="User Type"
                                onChange={(value) => {
                                    onSelected("type", value);
                                    setClientType(value);
                                }}
                                returnId
                            />
                        </Form.Item> */}

                        {/* FIRST NAME */}
                        {/* {clientType !== 0 && ( */}
                            <Form.Item
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter the First Name",
                                    },
                                ]}
                                
                            >
                                <CustomInputField
                                    type="text"
                                    placeholder={"First Name"                                   }
                                    pattern={
                                        // clientType === 1
                                        //     ? 
                                            // "[a-zA-Z]+[ ][a-zA-Z]*"
                                            // : 
                                            ".+"
                                    }
                                />
                            </Form.Item>
                         {/* )} */}

                        {/* LAST NAME */}
                        {/* {clientType === 1 && ( */}
                            <Form.Item name="lastName">
                                <CustomInputField type="text" placeholder="Last Name" />
                            </Form.Item>
                            <Form.Item name="companyName" rules={[{ required: true, message: "Enter the Company Name" }]}>
                                <CustomInputField type="text" placeholder="Company Name" />
                            </Form.Item>
                            <Form.Item
                            name="address"
                            
                        >
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
                        {/* )} */}

                        {/* GENDER */}
                        {/* {clientType === 1 && ( */}
                            {/* <Form.Item name="gender">
                                <CustomSelect
                                    options={genderOptions}
                                    placeholder="Gender"
                                    returnId
                                    onChange={(value) => onSelected("gender", value)}
                                />
                            </Form.Item> */}
                        {/* )} */}

                        {/* Email ID */}
                        {/* {clientType !== 0 && ( */}
                            <Form.Item
                                name="emailId"
                                rules={[
                                    { required: true, message: "Enter the E-mail Id" },
                                ]}
                            >
                                <CustomInputField type="email" placeholder="E-mail" pattern={EmailRegex} />
                            </Form.Item>
                        {/* )} */}

                        {/* Contact Number */}
                        {/* {clientType !== 0 && ( */}
                            <Form.Item
                                name="contactNumber"
                            >
                                <CustomInputField
                                    type="tel"
                                    placeholder="Contact Number"
                                    pattern="[0-9]{10}"
                                />
                            </Form.Item>
                        {/* )} */}

                        {/* Mobile Number */}
                        {/* {clientType !== 0 && ( */}
                            <Form.Item
                                name="mobileNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: "Enter the Mobile Number",
                                    }
                                ]}
                            >
                                <CustomInputField
                                    type="tel"
                                    placeholder="Mobile Number"
                                    pattern={MobileRegex}
                                />
                            </Form.Item>
                        {/* )} */}                  
                    </>
                </div>
            </Row>

            <Row justify="space-between">
                {currentProgressIndex > 0 && (
                    <Button
                        className="progress-button keep-left"
                        onClick={() => goToPreviousStep()}
                    >
                        {"PREVIOUS"}
                    </Button>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right"
                >
                    {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "SUBMIT"}
                </Button>
            </Row>
        </Form>
    );
};

export const DeliveryForm: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        currentProgressIndex,
        goToPreviousStep,
        goToNextStep,
        steps,
        saveRegistrationData,
        isVisible,
    } = props;

    const [form] = Form.useForm();

    const [addressState, setaddressState] = useState(true);

    const onFinishAddress2 = (values: any) => {
        let updatedValues = {};
        if (
            Object.prototype.hasOwnProperty.call(values, "deliveryAddress") &&
            Object.prototype.hasOwnProperty.call(values, "deliveryCity") &&
            Object.prototype.hasOwnProperty.call(values, "deliveryState") &&
            Object.prototype.hasOwnProperty.call(values, "deliveryCountry") &&
            Object.prototype.hasOwnProperty.call(values, "serviceDeliveryPostcode")
        ) {
            updatedValues = {
                serviceDeliveryAddressLine1: values.deliveryAddress,
                serviceDeliveryAddressLine2:
                    values.deliveryAddress2 && values.deliveryAddress2,
                serviceDeliveryApartmentNumber:
                    values.deliveryApartment && values.deliveryApartment,
                serviceDeliveryCity: values.deliveryCity,
                serviceDeliveryState: values.deliveryState,
                serviceDeliveryCountry: values.deliveryCountry,
                serviceDeliveryPostcode: values.serviceDeliveryPostcode,
            };
        } else {
            updatedValues = {
                serviceDeliveryAddressLine1: "BILLING",
                serviceDeliveryAddressLine2: "BILLING",
                serviceDeliveryApartmentNumber: "BILLING",
                serviceDeliveryCity: "BILLING",
                serviceDeliveryState: "BILLING",
                serviceDeliveryCountry: "BILLING",
                serviceDeliveryPostcode: "BILLING",
            };
        }
        saveRegistrationData(updatedValues);
        goToNextStep();
    };

    const onFinishFailedAddress2 = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onSelectSameDelivery = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
        const checkValue = e.target.checked;
        setaddressState(!checkValue);
    };

    return (
        <Form
            className={`${
                isVisible ? "visible-registration-form" : "hidden-registration-form"
                }`}
            name={`registration-form-step-${currentProgressIndex}`}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishAddress2}
            onFinishFailed={onFinishFailedAddress2}
        >

            <Row style={{ justifyContent: "center", marginTop: "4%" }}>
                <Checkbox style={{ fontSize: "16px" }} onChange={onSelectSameDelivery}>
                    {"Same as Billing Address"}s
                </Checkbox>
            </Row>
            {addressState && (
                <Row justify="center">
                    <div className="inputs">
                        <>
                            <Form.Item
                                name="deliveryAddress"
                                rules={[{ required: true, message: "Enter the Address" }]}
                            >
                                <CustomInputField type="text" placeholder="Address Line 1" />
                            </Form.Item>

                            <Form.Item name="deliveryAddress2">
                                <CustomInputField type="text" placeholder="Address Line 2" />
                            </Form.Item>

                            <Form.Item name="deliveryApartment">
                                <CustomInputField
                                    type="text"
                                    placeholder="Apartment, Suite etc."
                                />
                            </Form.Item>

                            <Form.Item
                                name="deliveryCity"
                                rules={[{ required: true, message: "Enter the City" }]}
                            >
                                <CustomInputField type="text" placeholder="City" />
                            </Form.Item>

                            <Form.Item
                                name="deliveryState"
                                rules={[{ required: true, message: "Enter the State" }]}
                            >
                                <CustomInputField type="text" placeholder="Province or State" />
                            </Form.Item>

                            <Form.Item
                                name="deliveryCountry"
                                rules={[
                                    { required: true, message: "Enter the Country or Region" },
                                ]}
                            >
                                <CustomInputField type="text" placeholder="Country or Region" />
                            </Form.Item>

                            <Form.Item
                                name="serviceDeliveryPostcode"
                                rules={[{ required: true, message: "Enter the Postal Code" }]}
                            >
                                <CustomInputField type="text" placeholder="Postal Code" />
                            </Form.Item>
                        </>
                    </div>
                </Row>
            )}

            <Row justify="space-between">
                {currentProgressIndex > 0 && (
                    <Button
                        className="progress-button keep-left"
                        onClick={() => goToPreviousStep()}
                    >
                        {"PREVIOUS"}
                    </Button>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right"
                >
                    {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
                </Button>
            </Row>
        </Form>
    );
};

export const UploadImageForm: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        currentProgressIndex,
        goToPreviousStep,
        steps,
        goToNextStep,
        saveRegistrationData,
        isVisible,
    } = props;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileImage, setfileImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const onFinishUpload = () => {
        const updatedValues = {
            // pictureData: imageUrl.split(",")[1],
            pictureData: fileImage,
        };
        console.log(updatedValues);
        saveRegistrationData(updatedValues);
        goToNextStep();
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
            className={`${
                isVisible ? "visible-registration-form" : "hidden-registration-form"
                }`}
            name={`registration-form-step-${currentProgressIndex}`}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishUpload}
            onFinishFailed={onFinishFailedUpload}
        >
            <Row justify="center">
                <div className="upload-image">
                    <>
                        <Form.Item name="pictureData">
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
                            {/* <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                onBeforeInput={beforeUpload}
              ></input> */}
                        </Form.Item>
                    </>
                </div>
            </Row>

            <Row justify="space-between">
                {currentProgressIndex > 0 && (
                    <Button
                        className="progress-button keep-left"
                        onClick={() => goToPreviousStep()}
                    >
                        {"PREVIOUS"}
                    </Button>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right"
                >
                    {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
                </Button>
            </Row>
        </Form>
    );
};

export const ConfirmationForm: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        currentProgressIndex,
        goToPreviousStep,
        steps,
        saveRegistrationData,
        isVisible,
    } = props;

    const [form] = Form.useForm();

    const onFinishConfirmation = (values: any) => {
        const updatedData = {
            email: ~~values.email,
            phoneCall: ~~values.phoneCall,
            sms: ~~values.sms,
            whatsapp: ~~values.whatsapp,
        };
        console.log("Success:", updatedData);
        saveRegistrationData(updatedData);
    };

    const onFinishFailedConfirmation = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            className={`${
                isVisible ? "visible-registration-form" : "hidden-registration-form"
                }`}
            name={`registration-form-step-${currentProgressIndex}`}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishConfirmation}
            onFinishFailed={onFinishFailedConfirmation}
        >
            <div className="consent-text">
                <div>Confirm your consent to contact over </div>
            </div>
            <Row justify="center">
                <div className="inputs">
                    <>
                        <Form.Item name="whatsapp" valuePropName="checked">
                            <CustomCheckbox icon={<WhatsappIcon />} name="Whatsapp" />
                        </Form.Item>
                        <Form.Item name="email" valuePropName="checked">
                            <CustomCheckbox icon={<EmailIcon />} name="Email" />
                        </Form.Item>
                        <Form.Item name="phoneCall" valuePropName="checked">
                            <CustomCheckbox icon={<PhoneIcon />} name="Phone" />
                        </Form.Item>
                        <Form.Item name="sms" valuePropName="checked">
                            <CustomCheckbox icon={<PhoneIcon />} name="SMS" />
                        </Form.Item>
                    </>
                </div>
            </Row>

            <Row justify="space-between">
                {currentProgressIndex > 0 && (
                    <Button
                        className="progress-button keep-left"
                        onClick={() => goToPreviousStep()}
                    >
                        {"PREVIOUS"}
                    </Button>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right"
                >
                    {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
                </Button>
            </Row>
        </Form>
    );
};

//#endregion

//#region PROFESSIONAL_FORM

export const InformationFormProfessional: React.FC<RegistrationFormProps> = (
    props: RegistrationFormProps
) => {
    const {
        currentProgressIndex,
        goToPreviousStep,
        goToNextStep,
        steps,
        saveRegistrationData,
        isVisible,
    } = props;

    const [typeOptions, setTypeOptions] = useState([]);
    const genderOptions = [
        { id: "M", name: "Male" },
        { id: "F", name: "Female" },
        { id: "U", name: "Transgender" },
        { id: "O", name: "Others" },
    ];

    // useEffect(() => {
    //     const fetchTypeData = async () => {
    //         console.log("fetching");
    //         const profTypeData = await getprofRegtypes();
    //         console.log("cleintdata ", profTypeData);
    //         setTypeOptions(profTypeData.data);
    //     };
    //     fetchTypeData();
    // }, []);

    const [form] = Form.useForm();

    const onSelected = (label: string, value: string) => {
        console.log(value);
        form.setFieldsValue({ [label]: value });
        // console.log("GOT FROM FORM: ",form.getFieldValue(label))
    };

    const onFinishInformation = (values: any) => {
        console.log("Success:", values);
        let updatedValues = {
            ...values,
            doc1ExpiryDate:
                values.doc1ExpiryDate && values.doc1ExpiryDate.format("YYYY-MM-DD"),
            experience: parseInt(values.experience),
        };
        if (values.contactNumber === undefined || values.contactNumber === null || values.contactNumber === "") {
            updatedValues = {
                contactNumber: values.mobileNumber,
                ...updatedValues,
            }
        }
        saveRegistrationData(updatedValues);
        goToNextStep();
    };

    const onFinishFailedInformation = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    // const disabledDate = (current: any) => {
    //   return current && current.valueOf() > Date.now();
    // };

    const disablePastDate = (current: any) => {
        return current && current.valueOf() <= Date.now();
    };

    return (
        <Form
            className={`${
                isVisible ? "visible-registration-form" : "hidden-registration-form"
                }`}
            name={`registration-form-step-${currentProgressIndex}`}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishInformation}
            onFinishFailed={onFinishFailedInformation}
        >
            <Row justify="center">
                <div className="inputs-first-row">
                    <>
                        {/* TYPE */}
                        <Form.Item
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: "Select the Type of User",
                                },
                            ]}
                        >
                            <CustomSelect
                                options={typeOptions}
                                placeholder="Type"
                                onChange={(value) => onSelected("type", value)}
                                returnId
                            />
                        </Form.Item>
                        {/* FIRST NAME */}
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: "Enter the First Name" }]}
                        >
                            <CustomInputField type="text" placeholder="First Name" />
                        </Form.Item>
                        {/* LAST NAME */}
                        <Form.Item
                            name="lastName"
                        >
                            <CustomInputField type="text" placeholder="Last Name" />
                        </Form.Item>

                        {/* GENDER */}
                        <Form.Item
                            name="gender"
                        >
                            <CustomSelect
                                options={genderOptions}
                                placeholder="Gender"
                                returnId
                                onChange={(value) => onSelected("gender", value)}
                            />
                        </Form.Item>
                        {/* Email ID */}
                        <Form.Item
                            name="emailId"
                            rules={[
                                { required: true, message: "Enter the E-mail id" },
                            ]}
                        >
                            <CustomInputField type="email" placeholder="E-mail" pattern={EmailRegex} />
                        </Form.Item>

                        {/* Contact Number */}
                        <Form.Item
                            name="contactNumber"
                        >
                            <CustomInputField
                                type="tel"
                                placeholder="Contact Number"
                                pattern={MobileRegex}
                            />
                        </Form.Item>

                        {/* Mobile Number */}
                        <Form.Item
                            name="mobileNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter the Mobile Number",
                                },
                            ]}
                        >
                            <CustomInputField
                                type="tel"
                                placeholder="Mobile Number"
                                pattern={MobileRegex}
                            />
                        </Form.Item>

                        {/*Years of Experience */}
                        <Form.Item
                            name="experience"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter the Experiemce",
                                }
                            ]}
                        >
                            <CustomInputField
                                type="number"
                                placeholder="Years of Experience"
                                min="0"
                            />
                        </Form.Item>

                        {/*NMC Reg No. */}
                        <Form.Item name="doc1Number">
                            <CustomInputField type="text" placeholder="Reg.No" />
                        </Form.Item>

                        {/*NMC Expiry data */}
                        <Form.Item name="doc1ExpiryDate">
                            <DatePicker
                                className="custom-datepicker"
                                placeholder="Reg. Expiry Date"
                                disabledDate={disablePastDate}
                            />
                        </Form.Item>
                    </>
                </div>
            </Row>
            <Row justify="center">
                <div className="inputs-second-row">
                    {/* <> */}
                    {/*Profile Summary */}
                    <Form.Item name="profileSummary">
                        {/* <CustomInputField type="textarea" placeholder="Profile Summary" /> */}
                        <Input.TextArea
                            placeholder="Profile Summary"
                            // prefix={<div></div>}
                            // style={{ borderRadius: "5px" }}
                            className="custom-input-field"
                        />
                    </Form.Item>
                    {/* </> */}
                </div>
            </Row>

            <Row justify="space-between">
                {currentProgressIndex > 0 && (
                    <Button
                        className="progress-button keep-left"
                        onClick={() => goToPreviousStep()}
                    >
                        {"PREVIOUS"}
                    </Button>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    className="progress-button keep-right"
                >
                    {currentProgressIndex === steps.length - 1 ? "SUBMIT" : "NEXT"}
                </Button>
            </Row>
        </Form>
    );
};



//#endregion
