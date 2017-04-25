import { createReducer } from 'redux-act';
import { evaluation_data } from '../actions';

const initial = {
    evaluation: {
        orderid : '',
        productid : '',
        commenttxt : ''
    },
};

const evaluation = createReducer({
    [evaluation_data]: (state, updata) => {
        return { ...state, ...updata};
    },
}, initial.evaluation);

export default evaluation;
