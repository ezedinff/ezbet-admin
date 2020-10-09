import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  console.log(file, "it's working");
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export class Avatar extends React.Component<
  { handleUpload: Function },
  { imageUrl: string; loading: Boolean }
> {
  state = {
    imageUrl: "",
    loading: false,
  };

  handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        // this is where u also need to upload the file
        {
          this.props.handleUpload(imageUrl);
          this.setState({
            imageUrl,
            loading: false,
          });
        }
      );
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? (
          <LoadingOutlined translate="true" />
        ) : (
          <PlusOutlined translate="true" />
        )}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        style={{
          minWidth: "300px",
          maxWidth: "300px",
          minHeight: "200px",
          maxHeight: "200px",
        }}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={this.handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
