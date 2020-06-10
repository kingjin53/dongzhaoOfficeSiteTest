import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Tabs, Row, Col } from 'antd';
import { Icon } from '@ant-design/compatible';
import { getChildrenToRender } from './utils';
import { Divider } from 'antd';

const TabPane = Tabs.TabPane;

class Content7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  onChange = (key) => {
    this.setState({ current: parseFloat(key) });
  };

  //getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  // getZJBlockChildren = (item, i) => {
  //   const children = item.children;
  //   const delay = this.props.isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
  //   const liAnim = {
  //     y: 30,
  //     opacity: 0,
  //     type: 'from',
  //     ease: 'easeOutQuad',
  //     delay,
  //   };
  //   return (
  //     <TweenOne component={Col} animation={liAnim} key={i.toString()} {...item}>
  //       <div {...children}>
  //         <div className="image-wrapper" {...children.img}>
  //           <img src={children.img.children} alt="img" />
  //         </div>
  //         <h2 {...children.title}>{children.title.children}</h2>
  //         <div {...children.content}>{children.content.children}</div>
  //       </div>
  //     </TweenOne>
  //   );
  // };
  getZJBlockChildren = (item, i) => {
    const { titleWrapper, ...$item } = item;
    return (
      <Col key={i.toString()} {...$item}>
        {titleWrapper.children.map(getChildrenToRender)}
      </Col>
    );
  };

  getFZBlockChildren = (item, i) => {
    // const { titleWrapper, ...$item } = item;
    const item1 = item.children;
    return (
      <div>
          <div key="image" {...item1.img}>
            <img src={item1.img.children} alt="img" />
          </div>
          <div key="name" className="name-wrapper">
            <div key="name" {...item1.name}>
              {item1.name.children}
            </div>
            <div key="post" {...item1.post}>
              {item1.post.children}
            </div>
          </div>
      </div>
    );
  };

  getBlockChildren = (item, i) => {
    const { tag, content } = item;
    const { text, img } = content;
    const textChildren = text.children;
    const { icon } = tag;
    const iconChildren = icon.children;
    const tagText = tag.text;
    var tabContent;
    if(i + 1 === 1){
        tabContent =  
              <Row
                key="content"
                className={content.className}
                gutter={content.gutter}
              >
                <Col className={text.className} xs={text.xs} md={text.md}>
                  {textChildren}
                </Col>
                <Col className={img.className} xs={img.xs} md={img.md}>
                  <img src={img.children} width="100%" alt="img" />
                </Col>
                <Col className={img.className} xs={img.xs} md={img.md}>
                  <img src={img.children} width="100%" alt="img" />
                </Col>
                <Col className={img.className} xs={img.xs} md={img.md}>
                  <img src={img.children} width="100%" alt="img" />
                </Col>
              </Row>
    
    }else if(i + 1 === 2){
      // const zjChildren = this.getZJBlockChildren(textChildren.children);
       const zjChildren = textChildren.children.map(this.getZJBlockChildren);
       
        tabContent =  <Row {...textChildren} key="img">
          {zjChildren}
        </Row>
       
    }else if(i + 1 === 3 || i + 1 === 4){
  
        tabContent = <img src={img.children} width="100%" alt="img" />

    }else if(i + 1 === 5){
      const { wrapper,page, titleWrapper } = tag;
      const fzChildren = textChildren.children.map(this.getFZBlockChildren);
      tabContent =   
                      <div {...page}>
                        <div {...titleWrapper}>
                          {titleWrapper.children.map(getChildrenToRender)}
                        </div>
                        <div {...textChildren.children}>{fzChildren}</div>
                      </div>
    }else{
      tabContent = <div/>
    }

    return (
      <TabPane
        size='large'
        key={i + 1}
        tab={
          <div className={tag.className}>
            <Icon type={iconChildren} className={icon.className} />
            <div {...tagText}>{tagText.children}</div>
          </div>
        }
        className={item.className}
      >
        <div class="lines">
          <Divider>
          <p style={{'font-size':'32px','color':'#2E86C1'}}>{tagText.children}</p>
          </Divider>
        </div>
          {tabContent}
      </TabPane>
    );
  };

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const tabsChildren = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...props} {...dataSource.wrapper}>
        <img src='./yjygk_head.jpg' width="100%" height="50%" />
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>

          <OverPack {...dataSource.OverPack}>
            <TweenOne.TweenOneGroup
              key="tabs"
              enter={{
                y: 30,
                opacity: 0,
                delay: 200,
                type: 'from',
              }}
              leave={{ y: 30, opacity: 0 }}
              {...dataSource.tabsWrapper}
            >
              <Tabs
                key="tabs"
                onChange={this.onChange}
                activeKey={`${this.state.current}`}
                {...dataSource.block}
              >
                {tabsChildren}
              </Tabs>
            </TweenOne.TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content7;
