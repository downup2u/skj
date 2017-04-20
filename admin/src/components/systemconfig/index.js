import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
    Edit as EditPage,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceField,
    ReferenceManyField,
    SingleFieldList,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    LongTextInput,
    SimpleShowLayout,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';


import ShowPageOne from '../controls/singlelistpage.js';
// import ShowPage from '../controls/ShowPage.js';
// import EditPage from '../controls/EditPage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField  label="正常运费" source="expressfee" />
               <TextField  label="免运费金额" source="expressfeeforfree" />
                 <ReferenceField label="显示在商城首页的套餐(分类）" source="productcategoryid1" reference="category" addLabel={true}>
                 <TextField source="name" />
                 </ReferenceField>
                 <ReferenceField label="显示在商城首页的商用一体机(分类）" source="productcategoryid2" reference="category" addLabel={true}>
                 <TextField source="name" />
                 </ReferenceField>
                 <TextField  label="一级分销佣金" source="bonuslevel1" />
                 <TextField  label="二级分销佣金" source="bonuslevel2" />
                 <TextField  label="换算,例1积分换1分" source="pointvsmoney" />
                 <TextField  label="每天签到一次" source="getpointfromsign" />
                 <TextField  label="分享得到积分" source="getpointfromshare" />
                 <TextField  label="每天最多获得的积分" source="pointlimitshare" />
                 <TextField  label="分享设置(JSON格式)" source="sharesetting" />
                 <TextField  label="会员等级设置(JSON格式)" source="memberlevelsetting" />
           </SimpleShowLayout>
       </ShowPage>
);

export {SystemconfigShow};
export const SystemconfigList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={SystemconfigShow} hasEdit={true}>
    </ShowPageOne>
);

const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
export const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
           <SimpleForm>
                <TextInput  label="正常运费" source="expressfee" />
                <TextInput  label="免运费金额" source="expressfeeforfree" />
            <ReferenceInput source="productcategoryid1" reference="category" allowEmpty>
              <SelectInput optionText="name" />
           </ReferenceInput>
           <ReferenceInput source="productcategoryid2" reference="category"  allowEmpty>
              <SelectInput optionText="name" />
            </ReferenceInput>
                <TextInput  label="一级分销佣金" source="bonuslevel1" />
                <TextInput  label="二级分销佣金" source="bonuslevel2" />
                <TextInput  label="换算,例1积分换1分" source="pointvsmoney" />
                <TextInput  label="每天签到一次" source="getpointfromsign" />
                <TextInput  label="分享得到积分" source="getpointfromshare" />
                <TextInput  label="每天最多获得的积分" source="pointlimitshare" />
                <LongTextInput  label="分享设置(JSON格式)" source="sharesetting" />
                <LongTextInput  label="会员等级设置(JSON格式)" source="memberlevelsetting" />
           </SimpleForm>
       </Create>
);


export const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <SimpleForm>
            <TextInput  label="正常运费" source="expressfee" />
            <TextInput  label="免运费金额" source="expressfeeforfree" />
            <ReferenceInput source="productcategoryid1" reference="category" allowEmpty>
              <SelectInput optionText="name" />
           </ReferenceInput>
           <ReferenceInput source="productcategoryid2" reference="category"  allowEmpty>
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput  label="一级分销佣金" source="bonuslevel1" />
            <TextInput  label="二级分销佣金" source="bonuslevel2" />
             <TextInput  label="换算,例1积分换1分" source="pointvsmoney" />
             <TextInput  label="每天签到一次" source="getpointfromsign" />
             <TextInput  label="分享得到积分" source="getpointfromshare" />
            <TextInput  label="每天最多获得的积分" source="pointlimitshare" />
            <LongTextInput  label="分享设置(JSON格式)" source="sharesetting" />
            <LongTextInput  label="会员等级设置(JSON格式)" source="memberlevelsetting" />
        </SimpleForm>
    </EditPage>
);
