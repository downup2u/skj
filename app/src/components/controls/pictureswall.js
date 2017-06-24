import React from 'react';
import { Field } from 'redux-form';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import {newtopicfileuploadsetpreview,newtopicfileuploadreset} from '../../actions/index.js';
import { connect } from 'react-redux';
import './pictureswall.css';
import 'antd/dist/antd.css';
import config from '../../env/config.js';
import PicaDisposePhoto from '../../util/pica_dispose_photo';

class PicturesWall extends React.Component {
  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: [{
  //     uid: -1,
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   }],
  // };
  componentWillUnmount() {
    this.props.dispatch(newtopicfileuploadreset());
  }

  handleCancel = () =>{
    this.props.dispatch(newtopicfileuploadsetpreview({ previewVisible: false }));
  } //this.setState({ previewVisible: false })

  handlePreview = (file) => {
    let fileobj = file;
    console.log('onClick handlePreview file:' + JSON.stringify(file));
    if (fileobj.status === 'done') {
      let url = '';
      if(fileobj.hasOwnProperty('url')){
        url = fileobj.url;
      }
      else{
        url = fileobj.response.files[0].url;
      }
      fileobj = {
        status: 'done',
        url: url
      };
    }

    console.log('onClick handlePreview fileobj:' + JSON.stringify(fileobj));
    this.props.dispatch(newtopicfileuploadsetpreview({
      previewImage: fileobj.url || fileobj.thumbUrl,
      previewVisible: true,
    }));
    // this.setState({
    //   previewImage: file.url || file.thumbUrl,
    //   previewVisible: true,
    // });
  }

  handleChange = ({ fileList }) => {
    console.log('fileList' + JSON.stringify(fileList));
    let filelistnew = [];
    let uploadedfiles =[ ];
    fileList.forEach((fileobj)=>{
      if (fileobj.status === 'done') {
        if(fileobj.hasOwnProperty('url')){//已经处理过了!
          uploadedfiles.push(fileobj.url);
          filelistnew.push(fileobj);
        }
        else{
          uploadedfiles.push(fileobj.response.files[0].url);
          filelistnew.push({
            name:fileobj.name,
            uid:fileobj.uid,
            status: 'done',
            url: fileobj.response.files[0].url
          });
        }

      }
      else {
        filelistnew.push(fileobj);
      }

    });

    this.props.dispatch(newtopicfileuploadsetpreview({ fileList:filelistnew }));

    console.log('uploadedfiles:' + JSON.stringify(uploadedfiles));
    this.props.onChange(uploadedfiles);
  }//this.setState({ fileList })

  render() {
    //
    console.log('props' + JSON.stringify(this.props));

    const { previewVisible, previewImage, fileList,width,height } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    let beforeUpload =(v)=> {
      let imgInfo = {};
      let restconfig = {
        width:width || -1,
        height:height || -1,
        maxWidthOrHeight:800
      };
      return new Promise((resolve) => {
        const picaphoto = new PicaDisposePhoto(restconfig);
        picaphoto.disposePhotoWithFile(v,imgInfo).then((file)=>{
          file.uid = v.uid;
          resolve(file);
        });
      });
    }


    return (
      <div className="clearfix">
        <Upload
          beforeUpload={beforeUpload}
          action={config.serverurl + "/uploadavatar"}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({newtopicfileupload}) => {
  return newtopicfileupload;
}
PicturesWall = connect(mapStateToProps)(PicturesWall);
export default PicturesWall;
