import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  DateField,
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
  NumberField,
  Datagrid,
  TextField,
  ReferenceField,
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


const OrderlistTitle = ({ record }) => {
   return <span>编辑 订单</span>;
};

const OrderlistEdit = (props) => {
      return (<Edit title={<OrderlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="公司名" source="Ordername" />
          </SimpleForm>
      </Edit>);

};


const OrderlistShow = (props) => (
       <Show title={<OrderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="公司名" source="Ordername" />
           </SimpleShowLayout>
       </Show>
);



const OrderlistList = (props) => (//
     <List title="订单列表" {...props} >
        <Datagrid>
        <DateField label="生成时间" source="created_at" showTime />
        <ReferenceField label="订单用户" source="creator" reference="user" addLabel={false}>
            <TextField source="username" />
        </ReferenceField>
        <NumberField label="订单金额" source="orderprice" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <TextField label="订单状态" source="orderstatus" />
        <TextField label="支付状态"  source="paystatus" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OrderlistList,OrderlistEdit,OrderlistShow};
