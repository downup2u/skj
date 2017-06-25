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
import DateDetail from './datadetail';
import moment from 'moment';

export const DataFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索设备id" source="deviceid_q" />
    </Filter>
);


const RealtimedatalistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>设备数据</span>;
};

const RealtimedatalistEdit = (props) => {
      return (<Edit title={<RealtimedatalistTitle />} {...props}>
          <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <DateDetail />
            <DisabledInput label="结果" source="name" />
            <DisabledInput label="设备ID" source="deviceid" />
            <DisabledInput label="原水名字" source="leftmodel.name" />
            <DisabledInput label="原水结果" source="leftmodel.resultstring" />
            <DisabledInput label="净水名字" source="rightmodel.name" />
            <DisabledInput label="净水结果" source="rightmodel.resultstring" />
            <BooleanField label="是否断水" source="iswatercut"  elStyle={{ float: 'left' }}/>
            <DateField label="更新时间" source="updated_at" showTime />
            <BooleanInput label="是否获取到数据" source="getdata" defaultValue={true} />
          </SimpleForm>
      </Edit>);
};



const RealtimedatalistList = (props) => (//
     <List title="设备数据列表" {...props} filters={<DataFilter />} sort={{ field: 'updated_at', order: 'DESC' }}>
        <Datagrid>
            <TextField label="结果" source="name" />
            <TextField label="设备ID" source="deviceid" />
            <DateField label="更新时间" source="updated_at" showTime />
            <TextField label="原水名字" source="leftmodel.name" />
            <TextField label="原水结果" source="leftmodel.resultstring" />
            <TextField label="净水名字" source="rightmodel.name" />
            <TextField label="净水结果" source="rightmodel.resultstring" />
          <EditButton />
        </Datagrid>
    </List>
);


export  {RealtimedatalistList,RealtimedatalistEdit};
