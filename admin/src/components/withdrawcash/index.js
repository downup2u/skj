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


const WithdrawcashlistTitle = ({ record }) => {
   return <span>编辑 提现</span>;
};

const WithdrawcashlistEdit = (props) => {
      return (<Edit title={<WithdrawcashlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="公司名" source="Withdrawcashname" />
          </SimpleForm>
      </Edit>);

};


const WithdrawcashlistShow = (props) => (
       <Show title={<WithdrawcashlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="公司名" source="Withdrawcashname" />
           </SimpleShowLayout>
       </Show>
);



const WithdrawcashlistList = (props) => (//
     <List title="提现列表" {...props} >
        <Datagrid>
        <TextField source="id" />
        <TextField label="公司名" source="Withdrawcashname" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {WithdrawcashlistList,WithdrawcashlistEdit,WithdrawcashlistShow};
