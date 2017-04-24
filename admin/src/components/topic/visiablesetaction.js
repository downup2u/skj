import { UPDATE } from 'admin-on-rest';

export const VISIABLE_SET = 'VISIABLE_SET';
export const VISIABLE_SET_LOADING = 'VISIABLE_SET_LOADING';
export const VISIABLE_SET_FAILURE = 'VISIABLE_SET_FAILURE';
export const VISIABLE_SET_SUCCESS = 'VISIABLE_SET_SUCCESS';

export const visiableset = (id, data, basePath) => ({
    type: VISIABLE_SET,
    payload: { id, data: { ...data, isvisiable: true }, basePath },
    meta: { resource: 'topic', fetch: UPDATE, cancelPrevious: false },
});

export const INVISIABLE_SET = 'INVISIABLE_SET';
export const INVISIABLE_SET_LOADING = 'INVISIABLE_SET_LOADING';
export const INVISIABLE_SET_FAILURE = 'INVISIABLE_SET_FAILURE';
export const INVISIABLE_SET_SUCCESS = 'INVISIABLE_SET_SUCCESS';

export const invisiableset = (id, data, basePath) => ({
    type: INVISIABLE_SET,
    payload: { id, data: { ...data, isvisiable: false }, basePath },
    meta: { resource: 'topic', fetch: UPDATE, cancelPrevious: false },
});
