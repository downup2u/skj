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

const UserriderlistTitle = ({ record }) => {
   return <span>显示 用户</span>;
};

const UserlistShow = (props) => (
       <Show title={<UserriderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="手机号" source="username" />
               <TextField label="注册时间"  source="created_at" />
               <TextField label="上次登录时间"  source="updated_at" />
               <TextField label="昵称" source="profile.nickname" />
               <TextField label="性别" source="profile.sex" />
           </SimpleShowLayout>
       </Show>
);



const UserlistList = (props) => (//
     <List title="用户列表" {...props} >
        <Datagrid>
        <TextField label="手机号" source="username" />
        <TextField label="注册时间"  source="created_at" />
        <TextField label="上次登录时间"  source="updated_at" />
        <TextField label="昵称" source="profile.nickname" />
        <TextField label="性别" source="profile.sex" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {UserlistList,UserlistShow};
