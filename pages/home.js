/**
 * Home 页面示例
 * r_gao@trip.com
 */

import React, { 
  Component
} from 'react';

import Router from 'next/router'

import {
  Button,
  ButtonGroup
} from '@material-ui/core'

import HomeHeader from '@components/home/header';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'

// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
  homePage: {
    width: '100%',
    height: '100%',
  },

  loginButton: {
    marginLeft: 10
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
  // 处理跳转登录
  const handleJumpToLogin = () => {
    Router.push('/login');
  }
  // 处理跳转用户
  const handleJumpToUser = () => {
    Router.push('/user');
  }
  return (
    <div className={styles.homePage}>
      <HomeHeader />
      <ButtonGroup disableElevation variant="contained" color="primary" aria-label="contained primary button group" className={ styles.loginButton }>
        <Button onClick={ handleJumpToLogin }>跳转登录</Button>
        <Button onClick={ handleJumpToUser }>跳转用户</Button>
      </ButtonGroup>
      
    </div>
  )
}