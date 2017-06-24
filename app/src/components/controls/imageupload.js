import React from 'react';
import { Field } from 'redux-form';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
//import 'antd/dist/antd.css';
import './imageupload.css';
import config from '../../env/config.js';
import PicaDisposePhoto from '../../util/pica_dispose_photo';

const renderImageupload= (props) => {
  let {input,width,height} = props;
    console.log("input value:" + input.value);
  // if( Object.prototype.toString.call( input.value ) !== 'string' ) {
  //     input.value = '';
  // }

    // let usertoken = localStorage.getItem('admintoken');
    // let getBase64 = (img, callback)=> {
    //   const reader = new FileReader();
    //   reader.addEventListener('load', () => callback(reader.result));
    //   reader.readAsDataURL(img);
    // }

    let beforeUpload =(v)=> {
      let imgInfo = {};
      let restconfig = {
        width:width || -1,
        height:height || -1
      };
      return new Promise((resolve) => {
        const picaphoto = new PicaDisposePhoto(restconfig);
        picaphoto.disposePhotoWithFile(v,imgInfo).then((file)=>{
          file.uid = v.uid;
          resolve(file);
        });
      });
    }

    let handleChange = (info) => {
        console.log("handleChange info:" + JSON.stringify(info));
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          if(info.file.response.files.length > 0){
            //"url": "http://localhost:3004/uploader/IMG_3047.JPG",
            input.onChange(info.file.response.files[0].url);
          }

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }

    }
  let imageUrl = input.value;
  return (
    <Upload
       className="avatar-uploader"
       name="file"
       showUploadList={false}
       action= {config.serverurl + "/uploadavatar"}
       headers={{
          'Authorization':'Bearer '+usertoken
       }}
       beforeUpload={beforeUpload}
       onChange={handleChange}
     >
       {
         imageUrl ?
           <img src={imageUrl} alt="" className="avatar" /> :
           <Icon type="plus" className="avatar-uploader-trigger" />
       }
     </Upload>
   );

}

const ImageInputUpload = ({source,...rest}) => {
  return(
    <span>
      <Field name={source} component={renderImageupload} {...rest}/>
    </span>
)
}

export  {ImageInputUpload};
