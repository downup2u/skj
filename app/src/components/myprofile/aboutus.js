import React, { Component, PropTypes } from 'react';
import NavBar from '../newnav.js';
import '../../../public/css/aboutus.css';
import { connect } from 'react-redux';

export class Page extends Component {

    render() {
        const { title, desc } = this.props;
        return (
            <div className="aboutusPage">
                <NavBar
                    back={true}
                    title={title}
                />
                <div className="content">
                    <div dangerouslySetInnerHTML={{__html: desc}}></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  ({about},props) =>{
    let type = props.match.params.type;
    let data = about[type];
    return { ...data };
};
export default connect(mapStateToProps)(Page);


