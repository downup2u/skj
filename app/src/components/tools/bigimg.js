import React, { Component, PropTypes } from 'react';
import '../../../public/css/bigimg.css';
import _ from 'lodash'; 
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import { uicommentimg } from '../../actions/index.js';

let Page = ({imglist, showindex, show, dispatch})=>{

    let swiperOptions = {
        navigation: false,
        pagination: true,
        scrollBar: false
    };

    //点击显示大图
    let hideimg = ()=>{
        let imgObj = {
            bigimgshow : false,
            bigimglist : [],
            bigimgindex : 0
        };
        dispatch(uicommentimg(imgObj));
    }

    //是否显示大图
    let showstyle = show?"showBigImg":"showBigImg hide";

    return (
        <div className={showstyle} onClick={()=>{hideimg()}}>
            <Swiper
                swiperOptions={{
                    slidesPerView : 'auto',
                    initialSlide : showindex
                }}
                {...swiperOptions}
                onSlideChangeEnd={(swiper, event) => {
                    console.log("change swiper");
                }}
                >
                {_.map(imglist,(img)=>{
                    return (
                        <Slide className="Demo-swiper__slide">
                            <img src={img} />
                        </Slide>
                    );
                })}
            </Swiper>
        </div>
    )
};

const mapStateToProps =  ({userlogin,forum}) =>{
  return {...userlogin,...forum};
};
Page = connect(mapStateToProps)(Page);
export default Page;
