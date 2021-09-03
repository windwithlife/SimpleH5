/**
 * Home header组件
 * r_gao@trip.com
 */

 import React, { 
  Component
} from 'react';

import {
  IconButton
} from '@material-ui/core'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'

// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 44,
    display: 'flex',
    flexDirection: 'row',
  }
}));

export default function HomeHeader(props) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <IconButton 
        aria-label="back"
      > 
        <NavigateBeforeIcon />
      </IconButton>
    </div>
  )
}