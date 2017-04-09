import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';

import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';

const BannercreateTitle = ({ record }) => {
   return <span>新建 图片广告</span>;
};
const BannerlistCreate = (props) => (
       <Create {...props} title={<BannercreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" />
             <SelectInput  label="图片类型"  source="type" choices={[
                 { id: '商城首页广告', name: '商城首页广告' },
                 { id: '首页设备图片', name: '首页设备图片' },
             ]} />
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const BannerlistTitle = ({ record }) => {
   return <span>编辑 图片广告信息</span>;
};

const BannerlistEdit = (props) => {
  console.log("BannerlistEdit==>" + JSON.stringify(props));
      return (<Edit title={<BannerlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="名字" source="name" />
              <SelectInput  label="图片类型"  source="type" choices={[
                  { id: '商城首页广告', name: '商城首页广告' },
                  { id: '首页设备图片', name: '首页设备图片' },
              ]} />
              <NumberInput label="排序字段"  source="sortflag" />
              <ImageInputUpload label="图片"  source="picurl" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const BannerlistShow = (props) => (
       <Show title={<BannerlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="类型" source="type" />
               <Titlewithimage label="名字" icon="picurl" name="name"/>
               <TextField label="排序字段" source="sortflag" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const BannerlistList = (props) => (//
     <List title="广告条列表" {...props} >
        <Datagrid>
        <TextField source="id" />
        <TextField label="类型" source="type" />
        <Titlewithimage label="名字" icon="picurl" name="name"/>
        <TextField label="排序字段" source="sortflag" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BannerlistCreate,BannerlistList,BannerlistEdit,BannerlistShow};
