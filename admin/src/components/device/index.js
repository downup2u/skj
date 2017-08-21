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
  ReferenceField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  NumberField,
  Filter,
  ReferenceInput
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';


export const DeviceFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索设备id" source="deviceid_q" />
        <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
           <SelectInput optionText="username" />
       </ReferenceInput>
    </Filter>
);

const DevicelistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 设备</span>;
};

const DevicelistEdit = (props) => {
      return (<Edit title={<DevicelistTitle />} {...props}>
          <SimpleForm>
               <TextField label="设备名字" source="devicename" />
               <ReferenceField label="用户" source="creator" reference="user"  addLabel={true} allowEmpty>
                  <TextField source="username" />
               </ReferenceField>
               <TextField label="设备ID" source="deviceid" />
               <TextField label="设备型号" source="devicemodel" />
               <TextField label="设备品牌" source="devicebrand" />
               <ReferenceField label="设备实时数据" source="realtimedata" reference="realtimedata" addLabel={true}  allowEmpty>
                  <DateField label="最后更新时间" source="updated_at" showTime />
               </ReferenceField>
              <DateField label="新建时间" source="created_at" showTime />
          </SimpleForm>
      </Edit>);

};



const DevicelistList = (props) => (//
     <List title="设备列表" {...props} filters={<DeviceFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
            <TextField label="设备名字" source="devicename" />
            <TextField label="是否获取到数据" source="getdata" />
            <ReferenceField label="用户" source="creator" reference="user" addLabel={false} allowEmpty>
              <TextField source="username" />
            </ReferenceField>
            <TextField label="设备ID" source="deviceid" />
            <ReferenceField label="设备实时数据" source="realtimedata" reference="realtimedata" addLabel={false}  allowEmpty>
               <DateField label="最后更新时间" source="updated_at" showTime />
            </ReferenceField>
            <DateField label="新建时间" source="created_at" showTime />
          <EditButton />
        </Datagrid>
    </List>
);


export  {DevicelistList,DevicelistEdit};
