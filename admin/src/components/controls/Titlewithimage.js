import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Field } from 'redux-form';
import _ from 'lodash';
const style= { verticalAlign: 'middle' };
const size = 25;
const Titlewithimage = ({ source, record = {}, elStyle,icon,name }) =>{
  let iconurl = _.get(record,icon,'');
  let nametxt = _.get(record,name,'');
  return(<span>
      <Avatar src={`${iconurl}?size=${size}x${size}`} size={size} style={style} />
      <span style={{ display: 'inline-block', width: size/3 }}>&nbsp;</span>
      {nametxt}
</span>)
};


export  {Titlewithimage};
