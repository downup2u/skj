import React, { Component, PropTypes } from 'react';
import '../../../public/css/bigimg.css';
import _ from 'lodash'; 
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';

let Page = ({imglist, showindex, show})=>{
    let swiperOptions = {
        navigation: false,
        pagination: true,
        scrollBar: false
    };
    let showstyle = show?"showBigImg":"showBigImg hide";
    return (
        <div className={showstyle}>
            <Swiper
                swiperOptions={{slidesPerView: 'auto'}}
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

export default Page
