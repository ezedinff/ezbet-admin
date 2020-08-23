import React, { useState } from "react"
import { Modal } from "antd"
interface Dialog {
    title: string;
    okBtnDisabled?: boolean;
    handleOk: Function;
    handleCancel: Function;
    isOpen: boolean;
}
const CustomDialog: React.FC<Dialog> = ({title, okBtnDisabled, handleOk, handleCancel, isOpen, children}) => {
    return (
        <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk()}
        onCancel={handleCancel()}
        >
            {children}
        </Modal>
    )
}
export default CustomDialog;