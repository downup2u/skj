import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import compose from 'recompose/compose';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { translate } from 'admin-on-rest';
import { DashboardMenuItem } from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/social/person';

import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import TopicIcon from 'material-ui/svg-icons/communication/forum';
import CategoryIcon from 'material-ui/svg-icons/action/list';
import BannerIcon from 'material-ui/svg-icons/action/view-carousel';
import ExpressIcon from 'material-ui/svg-icons/content/send';
import ProductIcon from 'material-ui/svg-icons/hardware/toys';


const items = [
    { name: 'banner', icon: <BannerIcon /> },
    { name: 'category', icon: <CategoryIcon /> },
    { name: 'product', icon: <Icon /> },
    { name: 'express', icon: <ExpressIcon /> },
    { name: 'topic', icon: <TopicIcon /> },
    { name: 'notifymessage', icon: <MessageIcon /> },
    { name: 'feedback', icon: <FeedbackIcon /> },
];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuTap, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onTouchTap={onMenuTap} />
        {items.map(item => (
            <MenuItem
                key={item.name}
                containerElement={<Link to={`/${item.name}`} />}
                primaryText={translate(`resources.${item.name}.name`, { smart_count: 2 })}
                leftIcon={item.icon}
                onTouchTap={onMenuTap}
            />
        ))}
        <MenuItem
            containerElement={<Link to="/configuration" />}
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onTouchTap={onMenuTap}
        />
        {logout}
    </div>
);

const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale,
    })),
    translate,
);

export default enhance(Menu);
