import React, { PropTypes }  from 'react';
import {SelectInput,DisabledInput} from 'admin-on-rest/lib/mui';
// import TextField from 'material-ui/TextField';
import get from 'lodash.get';
import FieldTitle from 'admin-on-rest/lib/util/FieldTitle';
import { Field,FieldArray } from 'redux-form';

/*
const renderStatus= (props) => {
  let {input} = props;
  console.log('EditStatus======>' + JSON.stringify(input));
  if( Object.prototype.toString.call( input.value ) !== '[object Array]' ) {
      input.value = [];
  }
  return ( 
        <SelectInput  label="状态"  source="status" choices={[
             { id: '未验证', name: '未验证' },
             { id: '已验证', name: '已验证' },
             { id: '已支付', name: '已支付' },
        ]} />
        );

}*/

const EditStatus = (props) => {
  const {input} = props;
  console.log('EditStatus======>' + JSON.stringify(props));

//   if(input.value === '已支付' || input.value === '未验证'){
//       return <DisabledInput  {...props}  />
//   }
//   return(
//         <SelectInput  {...props}  />
//     );

   return <SelectInput  {...props}  />
};

EditStatus.propTypes = {
    addField: PropTypes.bool.isRequired,
    allowEmpty: PropTypes.bool.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    elStyle: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string,
};

EditStatus.defaultProps = {
    addField: true,
    allowEmpty: false,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
};


export  {EditStatus};