import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/visibility';
import ThumbDown from 'material-ui/svg-icons/action/visibility-off';
import { enable as enableAction, disable as disableAction } from './enablesetaction';

class VisiableButton extends Component {
    handleenable = () => {
        const { enable, record } = this.props;
        enable(record.id, record);
    }

    handledisable = () => {
        const { disable, record } = this.props;
        disable(record.id, record);
    }

    render() {
        const { record } = this.props;
        return (
            <span>
                <IconButton onClick={this.handleenable} disabled={record.isenabled}><ThumbUp color="#00bcd4" /></IconButton>
                <IconButton onClick={this.handledisable} disabled={!record.isenabled}><ThumbDown color="#00bcd4" /></IconButton>
            </span>
        );
    }
}

VisiableButton.propTypes = {
    record: PropTypes.object,
    enable: PropTypes.func,
    disable: PropTypes.func,
};

export default connect(null, {
    enable: enableAction,
    disable: disableAction,
})(VisiableButton);
