import React from 'react';
import { connect } from 'react-redux';
import IndexPage from '../components/index.js';
import {
  clickTab,
} from '../actions';


const mapStateToProps = ({app}) => {
  return {app};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangedIndex:(index)=>{
      dispatch(clickTab({curtabindex:index}));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
