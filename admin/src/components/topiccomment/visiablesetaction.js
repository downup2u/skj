import { UPDATE } from 'admin-on-rest';

export const VISIABLE_SET = 'COMMENT_VISIABLE_SET';
export const VISIABLE_SET_LOADING = 'COMMENT_VISIABLE_SET_LOADING';
export const VISIABLE_SET_FAILURE = 'COMMENT_VISIABLE_SET_FAILURE';
export const VISIABLE_SET_SUCCESS = 'COMMENT_VISIABLE_SET_SUCCESS';

export const visiableset = (id, data, basePath) => ({
    type: VISIABLE_SET,
    payload: { id, data: { ...data, isvisiable: true }, basePath },
    meta: { resource: 'comments', fetch: UPDATE, cancelPrevious: false },
});

export const INVISIABLE_SET = 'COMMENT_INVISIABLE_SET';
export const INVISIABLE_SET_LOADING = 'COMMENT_INVISIABLE_SET_LOADING';
export const INVISIABLE_SET_FAILURE = 'COMMENT_INVISIABLE_SET_FAILURE';
export const INVISIABLE_SET_SUCCESS = 'COMMENT_INVISIABLE_SET_SUCCESS';

export const invisiableset = (id, data, basePath) => ({
    type: INVISIABLE_SET,
    payload: { id, data: { ...data, isvisiable: false }, basePath },
    meta: { resource: 'comments', fetch: UPDATE, cancelPrevious: false },
});
