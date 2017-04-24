import { UPDATE } from 'admin-on-rest';

export const SETENABLE = 'PRODUCT_SETENABLE';
export const SETENABLE_LOADING = 'PRODUCT_SETENABLE_LOADING';
export const SETENABLE_FAILURE = 'PRODUCT_SETENABLE_FAILURE';
export const SETENABLE_SUCCESS = 'PRODUCT_SETENABLE_SUCCESS';

export const enable = (id, data, basePath) => ({
    type: SETENABLE,
    payload: { id, data: { ...data, isenabled: true }, basePath },
    meta: { resource: 'product', fetch: UPDATE, cancelPrevious: false },
});

export const SETDISABLE = 'PRODUCT_SETDISABLE';
export const SETDISABLE_LOADING = 'PRODUCT_SETDISABLE_LOADING';
export const SETDISABLE_FAILURE = 'PRODUCT_SETDISABLE_FAILURE';
export const SETDISABLE_SUCCESS = 'PRODUCT_SETDISABLE_SUCCESS';

export const disable = (id, data, basePath) => ({
    type: SETDISABLE,
    payload: { id, data: { ...data, isenabled: false }, basePath },
    meta: { resource: 'product', fetch: UPDATE, cancelPrevious: false },
});
