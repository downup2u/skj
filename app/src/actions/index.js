import { createAction } from 'redux-act';

export const clickTab = createAction('click bottom tab');
export const clickNavPage = createAction('click nav page');

export const login_request = createAction('userlogin.login_request');
export const login_result = createAction('userlogin.login_result');
export const logout_request = createAction('userlogin.logout_request');

//forum.
export const getmytopic_request = createAction('forum.getmytopic_request');
export const getmytopic_result = createAction('forum.getmytopic_result');

export const inserttopic_request = createAction('forum.inserttopic_request');
export const inserttopic_result = createAction('forum.inserttopic_result');

export const gettopiclist_request = createAction('forum.gettopiclist_request');
export const gettopiclist_result = createAction('forum.gettopiclist_result');

export const insertcommentstotopic_request = createAction('forum.insertcommentstotopic_request');
export const insertcommentstotopic_result = createAction('forum.insertcommentstotopic_result');

export const insertcommentstocomments_request = createAction('forum.insertcommentstocomments_request');
export const insertcommentstocomments_result = createAction('forum.insertcommentstocomments_result');

export const lovetopicadd_request = createAction('forum.lovetopicadd_request');
export const lovetopicadd_result = createAction('forum.lovetopicadd_result');

export const lovetopicunadd_request = createAction('forum.lovetopicunadd_request');
export const lovetopicunadd_result = createAction('forum.lovetopicunadd_result');

export const lovecommentsadd_request = createAction('forum.lovecommentsadd_request');
export const lovecommentsadd_result = createAction('forum.lovecommentsadd_result');

export const lovecommentsunadd_request = createAction('forum.lovecommentsunadd_request');
export const lovecommentsunadd__result = createAction('forum.lovecommentsunadd__result');


//device
export const createdevice_request = createAction('device.createdevice_request');
export const createdevice_result = createAction('device.createdevice_result');

export const getdevicelist_request = createAction('device.getdevicelist_request');
export const getdevicelist_result = createAction('device.getdevicelist_result');

//-------------------------------------
export const disconnect =  createAction('disconnect');

export const serverpush_newtopic = createAction('serverpush_newtopic');
export const serverpush_newcoments = createAction('serverpush_newcoments');
