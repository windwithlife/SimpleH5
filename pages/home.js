/**
 * Home 页面示例
 * r_gao@trip.com
 */

import React, { 
  Component
} from 'react';

import HomeHeader from '@components/home/header';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'

// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
  homePage: {
    width: '100%',
    height: '100%',
  }
}));

/**
 * nextjs 服务端渲染函数
 * 每次请求页面时都重新生成HTML
 * 文档地址：https://www.nextjs.cn/docs/basic-features/pages
 */
export async function getStaticProps() {
  // fetch methods
  return {
    props: {
      testData: 1,
    },
    revalidate: 10
  }
}

export default function Home(props) {
  const styles = useStyles();

  return (
    <div className={styles.homePage}>
      <HomeHeader />
    </div>
  )
}