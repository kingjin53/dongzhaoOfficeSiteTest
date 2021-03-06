/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import Nav2 from './Nav2';
import Nav3 from './Nav3';

import {
  Nav20DataSource,
  Nav30DataSource,
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    /* 如果不是 dva 2.0 请使用以下代码
    // 实现整屏滚动
    scrollScreen.init({ location: ['Banner3_0', 'Feature4_0', 'Content8_0', 'Content5_0', 'Content12_0', 'Contact0_0', 'Footer1_0'] });
    */
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
        // 实现整屏滚动
        scrollScreen.init({
          location: [
            'Banner3_0',
            'Feature4_0',
            'Content8_0',
            'Content5_0',
            'Content12_0',
            'Contact0_0',
            'Footer1_0',
          ],
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const head = [
      <Nav2
        id="Nav1"
        key="Nav2_0"
        dataSource={Nav20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Nav3
        id="Nav2"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={this.state.isMobile}
      />
    ];
  
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {head}
      </div>
    );
  }
}
