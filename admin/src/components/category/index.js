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

const CategorycreateTitle = ({ record }) => {
   return <span>新建 类别</span>;
};
const CategorylistCreate = (props) => (
       <Create {...props} title={<CategorycreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" />
             <SelectInput  label="显示位置"  source="showflag" choices={[
                 { id: 0, name: '不显示' },
                 { id: 1, name: '显示在横排' },
                 { id: 2, name: '显示在纵排' },
                 { id: 3, name: '横纵都显示' },
             ]} />
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const CategorylistTitle = ({ record }) => {
   return <span>编辑 类别信息</span>;
};

const CategorylistEdit = (props) => {
      return (<Edit title={<CategorylistTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="name" />
             <SelectInput  label="显示位置"  source="showflag" choices={[
                 { id: 0, name: '不显示' },
                 { id: 1, name: '显示在横排' },
                 { id: 2, name: '显示在纵排' },
                 { id: 3, name: '横纵都显示' },
             ]} />
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const CategorylistShow = (props) => (
       <Show title={<CategorylistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="显示位置" source="showflag" />
               <Titlewithimage label="名字" icon="picurl" name="name"/>
               <TextField label="排序字段" source="sortflag" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const CategorylistList = (props) => (//
     <List title="类别信息列表" {...props} >
        <Datagrid>
        <TextField source="id" />
        <TextField label="显示位置" source="showflag" />
        <Titlewithimage label="名字" icon="picurl" name="name"/>
        <TextField label="排序字段" source="sortflag" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {CategorylistCreate,CategorylistList,CategorylistEdit,CategorylistShow};
