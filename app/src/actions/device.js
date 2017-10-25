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

export const resetdevicecmd_request = createAction('device.resetdevicecmd_request');
export const resetdevicecmd_result  = createAction('device.resetdevicecmd_result');

/*
复位操作 payload说明
deviceid:设备id
cmd:'resetall'/'resetone'/'setone'/'setvisible'【resetall表示实时水流重置,resetone表示复位1个滤芯,setone表示设置一个滤芯,setvisible表示设置滤芯是否可见】
indexname:'5微米PP滤芯'/'颗粒活性炭'【表示滤芯名字，当cmd为'resetone'/'setone'/'setvisible'有效】
value:用户输入的值，仅当cmd为'setone'/'setvisible'有效，其中setone输入数字，setvisible为bool类型
type:'vol'/'day'【vol表示复位流量,day表示复位天数】
*/
