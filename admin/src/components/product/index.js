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
  BooleanField,
  ImageField,
  NumberField,
  ReferenceField
} from 'admin-on-rest/lib/mui';

import { Field } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';

import {ImageInputUpload} from '../controls/imageupload.js';
import {ImageInputUploadArray} from '../controls/imageuploadarray.js';
import RichTextInput from '../controls/richtoolbar.js';
import EnableButton from './setenablebtn';

export const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索产品名" source="name_q" />
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
              <ImageInputUploadArray label="产品详情图片列表"  source="picurldetails" />
              <ImageInputUploadArray label="图片列表"  source="picurls" />
              <DateInput label="发布时间"  source="publishdate" />
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
              <ReferenceInput source="categoryid" reference="category" allowEmpty>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="现价"  source="pricenow" />
              <NumberInput label="市场价"  source="pricemarket" />
              <TextInput label="摘要" source="brief" />
              <NumberInput label="重量"  source="weight" />
              <NumberInput label="库存"  source="stock" />
              <NumberInput label="销量"  source="salesvolume" />
              <ImageInputUpload label="图片"  source="picurl"  label='产品封面图片'/>
              <ImageInputUploadArray label="产品详情图片列表"  source="picurldetails" label='产品详情图片列表'/>
              <ImageInputUploadArray label="图片列表"  source="picurls"  label='产品轮播图片'/>
              <DateInput label="发布时间"  source="publishdate" />
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
        <ImageField source="picurl" label="封面图片"/>
        <TextField label="名字" source="name" />
         <ReferenceField label="类别" source="categoryid" reference="category" addLabel={false}>
            <TextField source="name" />
         </ReferenceField>
        <NumberField label="现价" source="pricenow" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <EnableButton />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ProductlistCreate,ProductlistList,ProductlistEdit};
