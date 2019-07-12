import React, {Component} from "react";
import {Upload, Button, Icon, message} from "antd";
const Dragger = Upload.Dragger;

class BaseUpLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
    }

    render() {
        // const fileType = ['doc', 'docx', 'pdf', 'text/plain', 'application/msword', 'png', 'jpg'];
        const self = this;
        const {uploadFile, notip, title} = this.props;
        const props = {
            headers: {
                authorization: "authorization-text",
                "Content-Type": "multipart/form-data"
            },
            onRemove: file => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: file => {
                // if (fileType.indexOf(file.type) < 0) {
                //     message.error('请上传正确格式的文件');
                //     return false;
                // }
                let {fileList} = this.state;
                const isLt2M = file.size / 1024 / 1024 < 60;
                if (!isLt2M) {
                    message.error('请上传文件大小小于60M的文件');
                    return false;
                }
                let fileName = file.name.split('.');
                fileList.push(file);
                const fileParam = {
                    fileName: file.name,
                    fileType: fileName[fileName.length - 1],
                    fileList: fileList
                };
                var fileArr = [];
                this.setState({fileList: fileList});
                uploadFile(fileParam, fileList, () => {
                });
                return false;
            }
        };
        const {fileList} = this.state;
        return (
            <Dragger {...props} fileList={this.state.fileList}>
                {/* <Button>*/}
                   {/* <Icon type="upload"/>
                    {this.props.required
                        ? (<span style={{color: '#FF4F4B'}}>*</span>)
                        : ('')
                    }
                    {title ? title : '上传文件'}*/}
                    <p className="ant-upload-drag-icon">
                        <Icon type="cloud-upload" />
                    </p>
                    <p className="ant-upload-text">点击或将文件拖到到这里上传</p>
                    {notip ? null : <p className="ant-upload-hint">支持扩展名：doc、docx、pdf</p>}
                {/* </Button>*/}
                {/* {notip ? null : <div>支持扩展名：doc、docx、pdf</div>}*/}
            </Dragger>
        );
    }
}

export default BaseUpLoad;
