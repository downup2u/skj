import {
  createdevice_request,
  createdevice_result,
  getdevicelist_request,
  getdevicelist_result,
} from '../actions';

let test_createdevice_request =(dispatch)=>{
  let payload = {
    devicename:'devicename',
    devicebrand:'devicebrand',
    devicemodel:'devicemodel'
  };
  dispatch(createdevice_request(payload));
}

let test_getdevicelist_request =(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  dispatch(getdevicelist_request(payload));
}

export {
  test_createdevice_request,
  test_getdevicelist_request,
};
