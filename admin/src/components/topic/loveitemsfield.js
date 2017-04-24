import React from 'react';
import { FunctionField } from 'admin-on-rest/lib/mui'

const render = record => record.loves.length;

const LoveItemsField = (props) => <FunctionField {...props} render={render} />;

LoveItemsField.defaultProps = {
    label: '点赞数',
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' },
};

export default LoveItemsField;
