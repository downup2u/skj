import React from 'react';
import * as d3 from 'd3';

class Page extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

    componentDidMount () {

      const id = this.props.id;
      //波浪动画
      const svg_height = 230;
      const svg_width = 248;
      const wave_data = [[],[]];
      console.log(d3);
      const area = d3.area().y0(svg_height).curve(d3.curveBasis);  //curve会进行平滑处理
      const svg_paths = [];
      const max = 200;  //控制速度
      for (let i=0; i<max; i++) {
        const r = i / max * 2;
        wave_data[0].push(r);           //波浪一
        wave_data[1].push(r + 1);   //波浪二（+1代表偏移π）
      }
      const d = svg_width/(wave_data[0].length-1);
      svg_paths.push(d3.select(`#svg-area-${id} path:first-child`));
      svg_paths.push(d3.select(`#svg-area-${id} path:last-child`));
      function area_generator(data) {
        const wave_height = 0.20;     //波浪高度
        const area_data = data.map( function(y,i) {
          return [i * d, svg_height*(1 - (wave_height*Math.sin(y*Math.PI) + 2)/3)]; //+2将范围[-1,1]转成[1,3]
        } );
        return function() {
          return area(area_data);
        };
      }
      function renderWave() {
        svg_paths.forEach(function(svg_path,i){
          svg_path.attr('d', area_generator(wave_data[i]));
          wave_data[i] = getNextData(wave_data[i]);
        });
        requestAnimationFrame(renderWave);
      }
      function getNextData(data) {
        const r = data.slice(1);
        r.push(data[0]);
        return r;
      }
      requestAnimationFrame(renderWave);
   }

    render() {
        const {id} = this.props;
        return (
          <svg id={`svg-area-${id}`} width="500" height="500">
            <path fill="rgba(127, 254, 248, 0.1)"></path>
            <path fill="rgba(127, 254, 248, 0.2)"></path>
          </svg>
        );
    }
}


export default Page;
