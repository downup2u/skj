import customSaga from './customSaga';
import topicvisiableSaga from './components/topic/visiablesetsaga';
import commentvisiableSaga from './components/topiccomment/visiablesetsaga';
import productenableSaga from './components/product/enablesetsaga';
import singleDoucmentPageSaga from './components/singledocumentpage/saga.js';

export default [
    singleDoucmentPageSaga,
    customSaga,
    topicvisiableSaga,
    commentvisiableSaga,
    productenableSaga
];
