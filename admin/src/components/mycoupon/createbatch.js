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
  ReferenceInput,
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
  NumberField,
  ReferenceField,
  Filter
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import { ReferenceArrayInput, SelectArrayInput } from 'admin-on-rest';
import CreateBatch from './create.js';
import moment from 'moment';

const MycouponcreateTitle = ({ record }) => {
   return <span>新建 批量优惠券</span>;
};

const MycouponbatchCreate = (props) => {
  return (
         <CreateBatch {...props} title={<MycouponcreateTitle />} >
             <SimpleForm>
                <TextInput label="名字" source="name" />
                <ReferenceArrayInput source="creators" reference="user" allowEmpty>
                    <SelectArrayInput optionText="username" />
                </ReferenceArrayInput>
                 <DateInput label="过期时间"  source="expdate" />
                 <TextInput label="价格条件"  source="pricecondition" />
                 <NumberInput label="最高抵扣"  source="pricediscount" />
                 <NumberInput label="优惠券数量"  source="couponnumber" />
             </SimpleForm>
         </CreateBatch>
  );
}
// const MycouponbatchCreate = (props) => (
//   <div>批量发送优惠券页面</div>
// );
export default MycouponbatchCreate;
