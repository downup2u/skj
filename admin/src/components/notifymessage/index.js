import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {CreateButton,RichTextField, NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton} from 'admin-on-rest/lib/mui';

import RichTextInput from '../controls/richtoolbar.js';

//import RichTextInput from 'aor-rich-text-input';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const NotifymessagelistTitle = ({ record }) => {
   return <span>编辑 图片广告信息</span>;
};

const NotifymessagelistEdit = (props) => {
      return (<Edit title={<NotifymessagelistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="类型" source="keyname" />
              <TextInput label="标题"  source="title" />
              <RichTextInput label="详细信息" source="desc" addLabel={false}/>
          </SimpleForm>
      </Edit>);

};


const NotifymessagelistShow = (props) => (
       <Show title={<NotifymessagelistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="类型" source="keyname" />
               <TextField label="标题" source="title" />
               <RichTextField label="详细信息"  source="desc" stripTags={false} />
           </SimpleShowLayout>
       </Show>
);



const NotifymessagelistList = (props) => (//
     <List title="关于信息列表" {...props} >
        <Datagrid>
        <TextField label="类型" source="keyname" />
        <TextField label="标题" source="title" />
        <RichTextField label="详细信息"  source="desc" stripTags={false} />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {NotifymessagelistList,NotifymessagelistEdit,NotifymessagelistShow};
