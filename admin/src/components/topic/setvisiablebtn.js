import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/visibility';
import ThumbDown from 'material-ui/svg-icons/action/visibility-off';
import { visiableset as visiablesetAction, invisiableset as invisiablesetAction } from './visiablesetaction';

class VisiableButton extends Component {
    handlevisiableset = () => {
        const { visiableset, record } = this.props;
        visiableset(record.id, record);
    }

    handleinvisiableset = () => {
        const { invisiableset, record } = this.props;
        invisiableset(record.id, record);
    }

    render() {
        const { record } = this.props;
        return (
            <span>
                <IconButton onClick={this.handlevisiableset} disabled={record.isvisiable}><ThumbUp color="#00bcd4" /></IconButton>
                <IconButton onClick={this.handleinvisiableset} disabled={!record.isvisiable}><ThumbDown color="#00bcd4" /></IconButton>
            </span>
        );
    }
}

VisiableButton.propTypes = {
    record: PropTypes.object,
    visiableset: PropTypes.func,
    invisiableset: PropTypes.func,
};

export default connect(null, {
    visiableset: visiablesetAction,
    invisiableset: invisiablesetAction,
})(VisiableButton);
