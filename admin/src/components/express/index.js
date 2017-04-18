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

const ExpresscreateTitle = ({ record }) => {
   return <span>新建 快递公司</span>;
};
const ExpresslistCreate = (props) => (
       <Create {...props} title={<ExpresscreateTitle />} >
           <SimpleForm>
              <TextInput label="公司名" source="expressname" />
           </SimpleForm>
       </Create>
);


const ExpresslistTitle = ({ record }) => {
   return <span>编辑 快递公司</span>;
};

const ExpresslistEdit = (props) => {
      return (<Edit title={<ExpresslistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="公司名" source="expressname" />
          </SimpleForm>
      </Edit>);

};


const ExpresslistShow = (props) => (
       <Show title={<ExpresslistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="公司名" source="expressname" />
           </SimpleShowLayout>
       </Show>
);



const ExpresslistList = (props) => (//
     <List title="快递公司列表" {...props} >
        <Datagrid>
        <TextField label="公司名" source="expressname" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ExpresslistCreate,ExpresslistList,ExpresslistEdit,ExpresslistShow};
