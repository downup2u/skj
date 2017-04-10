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
  Filter,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  ReferenceInput,
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

import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import RichTextInput from '../controls/richtoolbar.js';

export const ProductFilter = props => (
    <Filter {...props}>
         <ReferenceInput source="categoryid" reference="category">
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);

const ProductcreateTitle = ({ record }) => {
   return <span>新建 产品</span>;
};
const ProductlistCreate = (props) => (
       <Create {...props} title={<ProductcreateTitle />} >
           <SimpleForm>
              <TextInput label="名字" source="name" />
              <ReferenceInput source="categoryid" reference="category" allowEmpty>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="现价"  source="pricenow" />
              <NumberInput label="市场价"  source="pricemarket" />
              <TextInput label="摘要" source="brief" />
              <NumberInput label="重量"  source="weight" />
              <NumberInput label="库存"  source="stock" />
              <NumberInput label="销量"  source="salesvolume" />
              <ImageInputUpload label="图片"  source="picurl" />
              <DateInput label="发布时间"  source="publishdate" />
              <RichTextInput label="详细信息" source="desc" addLabel={false}/>
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const ProductlistTitle = ({ record }) => {
   return <span>编辑 产品信息</span>;
};

const ProductlistEdit = (props) => {
      return (<Edit title={<ProductlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="名字" source="name" />
              <ReferenceInput source="categoryid" reference="category">
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="现价"  source="pricenow" />
              <NumberInput label="市场价"  source="pricemarket" />
              <TextInput label="摘要" source="brief" />
              <NumberInput label="重量"  source="weight" />
              <NumberInput label="库存"  source="stock" />
              <NumberInput label="销量"  source="salesvolume" />
              <ImageInputUpload label="图片"  source="picurl" />
              <DateInput label="发布时间"  source="publishdate" />
              <RichTextInput label="详细信息" source="desc" addLabel={false}/>
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const ProductlistShow = (props) => (
       <Show title={<ProductlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="类型" source="keyname" />
               <TextField label="标题" source="title" />
               <RichTextField label="详细信息"  source="desc" stripTags={false} />
           </SimpleShowLayout>
       </Show>
);



const ProductlistList = (props) => (//
     <List title="产品信息列表"  filters={<ProductFilter />}  {...props} >
        <Datagrid>
        <TextField label="名字" source="name" />
        <TextField label="现价" source="pricenow" />
        <Titlewithimage label="名字" icon="picurl" name="name"/>
        <TextField label="摘要" source="brief" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {ProductlistCreate,ProductlistList,ProductlistEdit,ProductlistShow};
