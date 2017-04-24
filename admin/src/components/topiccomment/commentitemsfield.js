import React from 'react';
import { FunctionField } from 'admin-on-rest/lib/mui'

const render = record => record.comments.length;

const CommentItemsField = (props) => <FunctionField {...props} render={render} />;

CommentItemsField.defaultProps = {
    label: '评论数',
    style: { textAlign: 'right' },
    headerStyle: { textAlign: 'right' },
};

export default CommentItemsField;
