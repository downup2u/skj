/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//device
export const createdevice_request = createAction('device.createdevice_request');
export const createdevice_result = createAction('device.createdevice_result');

export const updatedevice_request = createAction('device.updatedevice_request');
export const updatedevice_result = createAction('device.updatedevice_result');

export const getdevicelist_request = createAction('device.getdevicelist_request');
export const getdevicelist_result = createAction('device.getdevicelist_result');

export const deletedevice_request = createAction('device.deletedevice_request');
export const deletedevice_result = createAction('device.deletedevice_result');

//======设备数据部分======
export const serverpush_devicedata = createAction('device.serverpush_devicedata');

export const senddevicecmd_request = createAction('device.senddevicecmd_request');
export const senddevicecmd_result = createAction('device.senddevicecmd_result');
