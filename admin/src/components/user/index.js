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
  BooleanField,
  Filter
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';


export const UserFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserriderlistTitle = ({ record }) => {
   return <span>显示 用户</span>;
};

const UserlistShow = (props) => (
       <Show title={<UserriderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="手机号" source="username" />
               <DateField label="注册时间" source="created_at"  showTime/>
               <DateField label="上次登录时间" source="updated_at"  showTime/>
               <TextField label="昵称" source="profile.nickname" />
           </SimpleShowLayout>
       </Show>
);

const UserlistEdit = (props) => {
      return (<Edit title={<UserriderlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="手机号"  source="username" />
          </SimpleForm>
      </Edit>);

};


const UserlistList = (props) => (//
     <List title="用户列表" {...props}  filters={<UserFilter />} >
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="昵称" source="profile.nickname" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {UserlistList,UserlistEdit,UserlistShow};
