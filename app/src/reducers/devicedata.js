import { createReducer } from 'redux-act';


const initial = {
    devicedata:{
        curdevicedata:{
            name:'优',
            total:2800,
            modeltype:'TDS002',
            leftmodel:{
                name:'原水TDS-224',
                resultstring:'不健康'
            },
            rightmodel:{
                name:'净水TDS-002',
                resultstring:'可直饮'
            },
            detaillist:
                [
                    {
                        name:'5微米PP滤芯',
                        leftday:20,
                        leftpecent:8,
                    },
                    {
                        name:'颗粒活性炭',
                        leftday:58,
                        leftpecent:60,
                    },
                    {
                        name:'1微米PP滤芯',
                        leftday:58,
                        leftpecent:68,
                    },
                    {
                        name:'反渗透RO膜',
                        leftday:20,
                        leftpecent:8,
                    },
                    {
                        name:'后置活性炭',
                        leftday:70,
                        leftpecent:98,
                    },

                ],
        }

    }
};

const devicedata = createReducer({

}, initial.devicedata);

export default devicedata;