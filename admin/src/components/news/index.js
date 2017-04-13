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


const NewscreateTitle = ({ record }) => {
   return <span>新建 动态信息</span>;
};
const NewslistCreate = (props) => (
       <Create {...props} title={<NewscreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="textname" validation={{ required: true }}/>
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const NewslistTitle = ({ record }) => {
   return <span>编辑 动态信息</span>;
};

const NewslistEdit = (props) => {
      return (<Edit title={<NewslistTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="textname" validation={{ required: true }}/>
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const NewslistShow = (props) => (
       <Show title={<NewslistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="名字" source="textname" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const NewslistList = (props) => (//
     <List title="动态信息列表" {...props} >
        <Datagrid>
          <TextField label="名字" source="textname" />
          <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {NewslistCreate,NewslistList,NewslistEdit,NewslistShow};
