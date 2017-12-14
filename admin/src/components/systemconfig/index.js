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
    SimpleForm,
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';


import ShowPageOne from '../singledocumentpage/index.js';
// import ShowPage from '../controls/ShowPage.js';
// import EditPage from '../controls/EditPage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;

const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
 const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
       <TabbedForm>
           <FormTab label="resources.systemconfig.tabs.shop">
                <NumberInput  label="正常运费" source="expressfee" />
                <NumberInput  label="免运费金额" source="expressfeeforfree" />
                <ReferenceInput source="productcategoryid1" reference="category" allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="productcategoryid2" reference="category"  allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput  label="下载地址" source="downloadurl" />
                <TextInput  label="一级分销佣金" source="bonuslevel1" />
                <TextInput  label="二级分销佣金" source="bonuslevel2" />
                <TextInput  label="换算,例1积分换1分" source="pointvsmoney" />
                <NumberInput  label="发帖积分限制(大于设置的积分才能发帖)" source="pointfornewtopic" />
                <TextInput  label="每天签到一次" source="getpointfromsign" />
                <TextInput  label="分享得到积分" source="getpointfromshare" />
                <TextInput  label="每天最多获得的积分" source="pointlimitshare" />
                <LongTextInput  label="分享设置(JSON格式)" source="sharesetting" />
                <LongTextInput  label="会员等级设置(JSON格式)" source="memberlevelsetting" />
                <TextInput  label="快递查询URL" source="expressapiurl" />
                <TextInput  label="快递查询用户号" source="expressapicustomer" />
                <TextInput  label="快递查询APIKEY" source="expressapikey" />
              </FormTab >
              <FormTab label="resources.systemconfig.tabs.device">
              <LongTextInput  label="净水水质等级设置(JSON格式)" source="gradetotal" />
              <LongTextInput  label="原水等级设置(JSON格式)" source="gradeleft" />
              <LongTextInput  label="净水等级设置(JSON格式)" source="graderight" />
              <NumberInput  label="5微米pp滤芯总使用天数" source="systotal89" />
              <NumberInput  label="颗粒活性炭使用天数" source="systotal1011" />
              <NumberInput  label="1微米pp滤芯总使用天数" source="systotal1213" />
              <NumberInput  label="反渗透RO膜总使用天数" source="systotal1415" />
              <NumberInput  label="后置活性炭总使用天数" source="systotal1617" />

              <NumberInput  label="5微米PP滤芯的允许最大流量" source="systotalvol89" />
              <NumberInput  label="颗粒活性炭的允许最大流量" source="systotalvol1011" />
              <NumberInput  label="1微米PP滤芯的允许最大流量" source="systotalvol1213" />
              <NumberInput  label="反渗透RO膜的允许最大流量" source="systotalvol1415" />
              <NumberInput  label="后置活性炭的允许最大流量" source="systotalvol1617" />
              </FormTab >
           </TabbedForm>
       </Create>
);


 const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
    <TabbedForm>
        <FormTab label="resources.systemconfig.tabs.shop">
             <NumberInput  label="正常运费" source="expressfee" />
             <NumberInput  label="免运费金额" source="expressfeeforfree" />
             <ReferenceInput source="productcategoryid1" reference="category" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <ReferenceInput source="productcategoryid2" reference="category"  allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <TextInput  label="下载地址" source="downloadurl" />
             <TextInput  label="一级分销佣金" source="bonuslevel1" />
             <TextInput  label="二级分销佣金" source="bonuslevel2" />
             <TextInput  label="换算,例1积分换1分" source="pointvsmoney" />
             <NumberInput  label="发帖积分限制(大于设置的积分才能发帖)" source="pointfornewtopic" />
             <TextInput  label="每天签到一次" source="getpointfromsign" />
             <TextInput  label="分享得到积分" source="getpointfromshare" />
             <TextInput  label="每天最多获得的积分" source="pointlimitshare" />
             <LongTextInput  label="分享设置(JSON格式)" source="sharesetting" />
             <LongTextInput  label="会员等级设置(JSON格式)" source="memberlevelsetting" />
             <TextInput  label="快递查询URL" source="expressapiurl" />
             <TextInput  label="快递查询用户号" source="expressapicustomer" />
             <TextInput  label="快递查询APIKEY" source="expressapikey" />
           </FormTab >
           <FormTab label="resources.systemconfig.tabs.device">
           <LongTextInput  label="净水水质等级设置(JSON格式)" source="gradetotal" />
           <LongTextInput  label="原水等级设置(JSON格式)" source="gradeleft" />
           <LongTextInput  label="净水等级设置(JSON格式)" source="graderight" />
           <NumberInput  label="5微米pp滤芯总使用天数" source="systotal89" />
           <NumberInput  label="颗粒活性炭使用天数" source="systotal1011" />
           <NumberInput  label="1微米pp滤芯总使用天数" source="systotal1213" />
           <NumberInput  label="反渗透RO膜总使用天数" source="systotal1415" />
           <NumberInput  label="后置活性炭总使用天数" source="systotal1617" />

           <NumberInput  label="5微米PP滤芯的允许最大流量" source="systotalvol89" />
           <NumberInput  label="颗粒活性炭的允许最大流量" source="systotalvol1011" />
           <NumberInput  label="1微米PP滤芯的允许最大流量" source="systotalvol1213" />
           <NumberInput  label="反渗透RO膜的允许最大流量" source="systotalvol1415" />
           <NumberInput  label="后置活性炭的允许最大流量" source="systotalvol1617" />
           </FormTab >
        </TabbedForm>
    </EditPage>
);


export const SystemconfigList = props => (
    <ShowPageOne Create={SystemconfigCreate} Edit={SystemconfigEdit} {...props}>
    </ShowPageOne>
);

