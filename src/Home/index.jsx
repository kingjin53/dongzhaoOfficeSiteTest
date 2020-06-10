/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import Banner3 from './Banner3';
import Feature4 from './Feature4';
import Content8 from './Content8';
import Content5 from './Content5';
import Content12 from './Content12';
import Contact0 from './Contact0';

import {
  Banner30DataSource,
  Feature40DataSource,
  Content80DataSource,
  Content50DataSource,
  Content120DataSource,
  Contact00DataSource,
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
          ],
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }

  render() {
    const children = [
      <Banner3
        id="Banner3_0"
        key="Banner3_0"
        dataSource={Banner30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Feature4
        id="woyuandongtai"
        key="Feature4_0"
        dataSource={Feature40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content8
        id="zhuanjiatuandui"
        key="Content8_0"
        dataSource={Content80DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content5
        id="jingdiananli"
        key="Content5_0"
        dataSource={Content50DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content12
        id="fuhuaqiye"
        key="Content12_0"
        dataSource={Content120DataSource}
        isMobile={this.state.isMobile}
      />,
      <Contact0
        id="map"
        key="Contact0_0"
        dataSource={Contact00DataSource}
        isMobile={this.state.isMobile}
      />,
  ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {/* 如果不是 dva 2.0 替换成 {children} start */}
        {this.state.show && children}
        {/* 如果不是 dva 2.0 替换成 {children} end */}
      </div>
    );
  }
}
