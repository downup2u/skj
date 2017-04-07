import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import compose from 'recompose/compose';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LabelIcon from 'material-ui/svg-icons/action/label';
import { translate } from 'admin-on-rest';
import { DashboardMenuItem } from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/social/person';

const items = [
    { name: 'banner', icon: <Icon /> },
    { name: 'product', icon: <Icon /> },
    { name: 'category', icon: <Icon /> },
    { name: 'express', icon: <Icon /> },
    { name: 'topic', icon: <Icon /> },
    { name: 'notifymessage', icon: <Icon /> },
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
