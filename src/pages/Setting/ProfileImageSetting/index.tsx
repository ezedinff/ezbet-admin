import React, { useState, Fragment } from 'react';
import {CameraOutlined} from "@ant-design/icons/lib";
import {Avatar, Button} from "antd";
import "./index.less";
import { UPLOAD_FILE, UPDATE_PROFILE_IMAGE } from '../../../shared/graphql/file.gql';
import { useMutation } from '@apollo/react-hooks';

export const ProfileImageSetting = (props: {user: any}) => {
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    const [upload, {data, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_PROFILE_IMAGE);

    function onChange({
        target: {
            // @ts-ignore
          validity, files: [file],
        },
      }) {
        if (validity.valid){
            upload({ variables: { file } })
            console.log(data);
        }
      }
    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleImageUpload = async (e: any) => {
        const [file] = e.target.files;
        console.log(file);
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            // @ts-ignore
            current.file = file;
            // wait till the upload is successfull
            const image = await toBase64(file);
            console.log()
            reader.onload = e => {
               upload({variables: {id: props.user._id, image}});
                // @ts-ignore
                current.firstChild.src = e.target.result;
            };
            if(data) {
                console.log(data);

            }
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
                <Avatar size={128} ref={uploadedImage} src={props.user.profileImage} />
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