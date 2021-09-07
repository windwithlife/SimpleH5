/**
 * 页面导航
 * r_gao@trip.com
 * 2021/09/07
 */

import Router from 'next/router'

function push(url, mode) {
  if (mode == 'spa') {
    Router.push(url);
  } else {
    window.location.href = `${window.location.origin}/simple-h5${url}`;
  }
}

function back(url, mode) {
  if (mode == 'spa') {
    Router.back();
  } else {
    window.history.back();
  }
}

export default {
  push,
  back
}