import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import { translate } from 'admin-on-rest';

import ProductIcon from 'material-ui/svg-icons/image/collections';

const LinkToRelatedProducts = ({ record, translate }) => (
    <FlatButton
        primary
        label={translate('resources.category.fields.product')}
        icon={<ProductIcon />}
        containerElement={<Link to={{ pathname: "/product", query: { filter: JSON.stringify({ categoryid: record.id }) } }} />}
    />
);

export default translate(LinkToRelatedProducts);
