import React, { useEffect, useState } from "react";
import "./custom-modal.styles.scss"

import { Modal, Button, } from "antd";


interface CustomModalProps {
    title1: string;
    title2?: string;
    isVisible: boolean;
    onSubmit: any;
    onCancel: any;
    submitText: string;
    cancelText: string;
    body?: any;
}
const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
    const { title1, title2, isVisible, onSubmit, onCancel, submitText, cancelText, body } = props;
    const [modalBody, setModalBody] = useState<any>();

    useEffect(() => {
        if (body === undefined || body === null) {
            setModalBody(
                <div>
                    {"Confirm?"}
                </div>
            );
        }
    }, [body]);

    return (
        <Modal
            className="custom-modal"
            title={(
                <div className="modal-header">
                    <p className="header-1">{title1}</p>
                    {title2 && (
                        <p className="header-2">{title2}</p>
                    )}
                </div>
            )}
            visible={isVisible}
            footer={
                <div className="modal-footer-button">
                    <div className="accept-button-wrapper">
                        <Button className="accept-button" onClick={onSubmit}>{submitText}</Button>
                    </div>
                    <div className="reject-button-wrapper">
                        <Button className="reject-button" onClick={onCancel}>{cancelText}</Button>
                    </div>
                </div>
            }
            onCancel={onCancel}
            onOk={onSubmit}
        >
            {modalBody}
        </Modal>
    );
}

export default CustomModal;