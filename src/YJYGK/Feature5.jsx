import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Tabs, Row, Col, Table, Carousel, Card } from 'antd';
import { Icon } from '@ant-design/compatible';
import { getChildrenToRender } from './utils';
import { Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const TabPane = Tabs.TabPane;
const { Meta } = Card;

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

  getFZBlockChildren = (item1, i) => {
    // const { titleWrapper, ...$item } = item;
    const item = item1.children;
    const textWrapper = (
      <QueueAnim
        key="text"
        leaveReverse
        delay={0}
        {...item.textWrapper}
      >
        <div key="time" {...item.time}>
          {item.time.children}
        </div>
        <h2 key="title" {...item.title}>
          <i {...item.icon}>
            <img src={item.icon.children} alt="img" />
          </i>
          {item.title.children}
        </h2>
        <div key="p" {...item.content}>
          {item.content.children}
        </div>
      </QueueAnim>
    );
    return (
      <OverPack key={i.toString()} {...item1}>
        <QueueAnim
          className="image-wrapper"
          key="image"
          type={'bottom'}
          leaveReverse
          delay={ 0}
          {...item.imgWrapper}
        >
          <div key="image" {...item.img}>
            <img src={item.img.children} alt="img" />
          </div>
          <div key="name" className="name-wrapper">
            <div key="name" {...item.name}>
              {item.name.children}
            </div>
            <div key="post" {...item.post}>
              {item.post.children}
            </div>
          </div>
        </QueueAnim>

        { textWrapper}
      </OverPack>
    );
  };

  getBlockChildren = (item, i) => {
    const { tag, content } = item;
    const { text, img } = content;
    const textChildren = text.children;
    const { icon } = tag;
    const iconChildren = icon.children;
    const tagText = tag.text;
    const paging = false;
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
                    <div {...tag} {...wrapper}>
                      <div {...page}>
                        <div {...titleWrapper}>
                          {titleWrapper.children.map(getChildrenToRender)}
                        </div>
                        <div class={'timeline'}>{fzChildren}</div>
                      </div>
                     </div> 
    }else if(i + 1 === 6){
      const { columns, data } = content;
      tabContent = 
      <div>
        <Table columns={columns} dataSource={data} pagination={paging} />
        <br/>
        <br/>
        <Carousel autoplay dotPosition={'top'}>
          <div>
          <Card
              hoverable
              style={{ width: 1100 }}
              cover={<img alt="example" src={'./xm1.jpg'} />}
            >
              <Meta title="武汉金控大厦项目1" description="更多详情请点击www.instagram.com" />
            </Card>
          </div>
          <div>
          <Card
              hoverable
              style={{ width: 1100 }}
              cover={<img alt="example" src={'./xm3.png'} />}
            >
              <Meta title="如东文体中心项目" description="更多详情请点击www.instagram.com" />
            </Card>
          </div>
          <div>
            {/* <h3>武汉金控大厦项目4</h3>
            <img src={img.children} alt="img" /> */}
            <Card
              hoverable
              style={{ width: 1100 }}
              cover={<img alt="example" src={'./xm2.png'} />}
            >
              <Meta title="武汉金控大厦项目4" description="更多详情请点击www.instagram.com" />
            </Card>
          </div>
        </Carousel>
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

          {/* <OverPack {...dataSource.OverPack}>
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
            > */}
              <Tabs
                key="tabs"
                onChange={this.onChange}
                activeKey={`${this.state.current}`}
                {...dataSource.block}
              >
                {tabsChildren}
              </Tabs>
            {/* </TweenOne.TweenOneGroup>
          </OverPack> */}
        </div>
      </div>
    );
  }
}

export default Content7;
