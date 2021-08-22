/**
 * Home 页面示例
 * r_gao@trip.com
 */

import React, { 
  Component
} from 'react';

/**
 * nextjs 服务端渲染函数
 * 每次请求页面时都重新生成HTML
 * 文档地址：https://www.nextjs.cn/docs/basic-features/pages
 */
export async function getServerSideProps() {
  // fetch methods
  return {
    props: {
      testData: 1
    }
  }
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // 用来测试展示服务端渲染数据
    console.log(props)
  }

  componentDidMount() {

  }

  render() {
    return (
      <div></div>
    );
  }
}