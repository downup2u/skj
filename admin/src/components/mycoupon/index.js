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

import moment from 'moment';
export const MycouponFilter = props => (
    <Filter {...props}>
         <TextInput label="名字" source="name_q" />
         <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);


const MycouponcreateTitle = ({ record }) => {
   return <span>新建 优惠券</span>;
};
const MycouponlistCreate = (props) => (
       <Create {...props} title={<MycouponcreateTitle />} >
           <SimpleForm>
               <TextInput label="名字" source="name" />
               <ReferenceInput source="coupon" reference="coupon" allowEmpty>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <ReferenceInput source="creator" reference="user" allowEmpty>
                  <SelectInput optionText="username" />
              </ReferenceInput>
               <DateInput label="过期时间"  source="expdate" />
               <TextInput label="价格条件"  source="pricecondition" />
               <NumberInput label="最高抵扣"  source="pricediscount" />
           </SimpleForm>
       </Create>
);

const MycouponlistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 优惠券</span>;
};

const MycouponlistEdit = (props) => {
      return (<Edit title={<MycouponlistTitle />} {...props}>
          <SimpleForm>
               <TextInput label="名字" source="name" />
              <ReferenceInput source="coupon" reference="coupon" allowEmpty>
                  <SelectInput optionText="coupon" />
              </ReferenceInput>
              <ReferenceInput source="creator" reference="user" allowEmpty>
                  <SelectInput optionText="username" />
              </ReferenceInput>
               <DateInput label="过期时间"  source="expdate" />
               <TextInput label="价格条件"  source="pricecondition" />
               <NumberInput label="最高抵扣"  source="pricediscount" />
          </SimpleForm>
      </Edit>);

};


const MycouponlistShow = (props) => (
       <Show title={<MycouponlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="名字" source="name" />
               <TextField label="过期时间"  source="expdate" />
               <TextField label="价格条件"  source="pricecondition" />
               <TextField label="最高抵扣"  source="pricediscount" />
           </SimpleShowLayout>
       </Show>
);



const MycouponlistList = (props) => (//
     <List title="优惠券列表" {...props}  filters={<MycouponFilter />}>
        <Datagrid>
            <TextField label="名字" source="name" />
            <ReferenceField label="用户" source="creator" reference="user" addLabel={false}>
            <TextField source="username" />
            </ReferenceField>
            <DateField label="过期时间" source="expdate"  />
            <NumberField label="价格条件" source="pricecondition" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
            <NumberField label="最高抵扣" source="pricediscount" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
            <TextField label="总库存" source="totalstock" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {MycouponlistList,MycouponlistCreate,MycouponlistEdit,MycouponlistShow};
