import React, { useState, Fragment } from 'react';
import {CameraOutlined} from "@ant-design/icons/lib";
import {Avatar, Button} from "antd";
import "./index.less";

export const ProfileImageSetting = () => {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);


    const handleImageUpload = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            // @ts-ignore
            current.file = file;
            console.log(current);
            // wait till the upload is successfull
            reader.onload = e => {
                // @ts-ignore
                current.firstChild.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",}}>
            <div
                className={"upload-container"}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageUploader}
                    style={{
                        display: "none"
                    }}
                />
                <Avatar size={128} ref={uploadedImage} src={"https://lh3.googleusercontent.com/ogw/ADGmqu-OJekP0F5Ho646BZ1UNyZOIFCzwGiKiKQ2vwVL=s83-c-mo"} />
                <Button
                    size={"large"}
                    type="text"
                    className={"upload-overlay"}
                    icon={<CameraOutlined translate />}
                    onClick={() => {
                        // @ts-ignore
                        return imageUploader.current.click()
                    }}
                >Upload</Button>
            </div>
        </div>
    );
};