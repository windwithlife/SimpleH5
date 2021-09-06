/**
 * 登录界面
 * r_gao@trip.com
 */
import React, { 
  useState 
} from 'react';

import Router from 'next/router'

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  ButtonGroup,
  Tab,
  AppBar
} from '@material-ui/core'

import {
  TabContext,
  TabList,
  TabPanel
} from '@material-ui/lab'

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import { useSnackbar } from 'notistack';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'
// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
  loginHeader: {
    position: 'absolute',
    top: 20,
    width: '100%',
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginHeaderIcon: {
    color: theme.palette.primary.light,
  },
  loginHeaderTitle: {
    color: theme.palette.primary.light,
    fontSize: 20,
    fontWeight: 'bold'
  },
  loginPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginContainer: {
    marginLeft: 30,
    marginRight: 30
  },
  loginUserInput: {
    marginBottom: 16
  },
  loginPasswordInput: {
    marginBottom: 16
  },
  loginPhoneInputBefore: {
      color: theme.palette.primary.light,
      fontSize: 14
  },
  loginButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loginTabContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 15
  },
  loginTabList: {
    boxShadow: 'none',
    borderRadius: 4
  }
}));

export default function Login(props) {
  const styles = useStyles();
  // 登录tab值
  const [tabname, setTabname] = useState('1')
  // 用户名
  const [username, setUsername] = useState('')
  // 手机号
  const [phone, setPhone] = useState('')
  // 密码
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  // 错误状态展示
  const [usernameError, setUsernameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // 消息队列
  const { enqueueSnackbar } = useSnackbar();
  // 处理tab切换
  const handleTabChange = (event, newTab) => {
    setTabname(newTab);
  }
  // 处理页面返回
  const handlePageBack = () => {
    window.history.back();
  }
  // 处理用户名输入
  const handleUsernameChange = (prop) => (event) => {
    setUsernameError(false);
    setUsername(event.target.value);
  }
  // 处理手机号输入
  const handlePhoneChange = (prop) => (event) => {
    setPhoneError(false);
    setPhone(event.target.value);
  }
  // 处理密码输入
  const handlePasswordChange = (prop) => (event) => {
    setPasswordError(false);
    setPassword({ ...password, [prop]: event.target.value });
  };
  // 处理密码显示
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };
  // 处理登录按钮点击
  const handleSubmitClick = () => {
    if (tabname == 1 && !username.trim()) {
      enqueueSnackbar('请填写正确的用户', { variant: 'error' })
      setUsernameError(true);
    }

    if (tabname == 2 && (!phone.trim() || !(/^1[3456789][0-9]{9}$/i.test(phone.trim())))) {
      enqueueSnackbar('请输入有效的手机号', { variant: 'error' });
      setPhoneError(true);
    }

    if (!password?.password.trim()) {
      enqueueSnackbar('请输入有效的密码', { variant: 'error' })
      setPasswordError(true);
    }

    if (
      (!usernameError || !phoneError) &&             // 用户名或者手机号非空
      !passwordError                                 // 密码非空
    ) {
      fetch({
        url: 'https://api.koudaibook.com/account-service/account/login',
        data: {
          username: username,
          password: password.password,
          loginType: tabname == 1 ? 'account' : 'mobile',
          type: '0'
        }
      }).then((result) => {
        if (result?.status?.code == 200) {
          enqueueSnackbar('用户登录成功', { variant: 'success' })
        } else {
          enqueueSnackbar('用户登录失败', { variant: 'error' })
        }
      }).catch((error) => {
        enqueueSnackbar('用户登录失败', { variant: 'error' })
      })
    }
  }
  // 处理注册按钮点击
  const handleSignupClick = () => {
    // window.location.href = `${window.location.origin}/signup`;
    Router.push('/signup');
  }
  
  return (
    <div className={ styles.loginPage }>
      <div className={ styles.loginHeader }>
        <IconButton 
          aria-label="back" 
          className={ styles.loginHeaderIcon } 
          onClick={ handlePageBack }> 
          <ArrowBackIcon />
        </IconButton>
        <span className={ styles.loginHeaderTitle }>请登录您的账户</span>
      </div>
      <div className={ styles.loginContainer }>
        <TabContext value={ tabname }>
          <AppBar position="static" className={ styles.loginTabList }>
            <TabList onChange={ handleTabChange } aria-label="login tab">
              <Tab label="用户名登录" value="1" />
              <Tab label="手机号登录" value="2" />
            </TabList>
          </AppBar>
          <TabPanel value="1" className={ styles.loginTabContainer }>
            <FormControl 
              fullWidth={ true } 
              variant="outlined"
              required={ true }
              error={ usernameError }
              className={ styles.loginUserInput }
            >
              <InputLabel htmlFor="outlined-adornment-username">用户名</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type='text'
                value={ username }
                onChange={ handleUsernameChange('username') }
                labelWidth={ 110 }
                autoComplete="off"
              />
            </FormControl>

            <FormControl 
              fullWidth={ true } 
              variant="outlined"
              required={ true }
              error={ passwordError }
              className={ styles.loginPasswordInput }
            >
              <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={ password.showPassword ? 'text' : 'password' }
                value={ password.password }
                onChange={ handlePasswordChange('password') }
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={ handleClickShowPassword }
                      edge="end"
                    >
                      { password.showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={ 40 }
              />
            </FormControl>
          </TabPanel>
          <TabPanel value="2" className={ styles.loginTabContainer }>
            <FormControl 
              fullWidth={ true } 
              variant="outlined"
              required={ true }
              error={ phoneError }
              className={ styles.loginUserInput }
            >
              <InputLabel htmlFor="outlined-adornment-phone">手机号</InputLabel>
              <OutlinedInput
                id="outlined-adornment-phone"
                type='number'
                value={ phone }
                onChange={ handlePhoneChange('phone') }
                labelWidth={ 58 }
                autoComplete="off"
                startAdornment={
                  <InputAdornment position="start">
                      <div className={styles.loginPhoneInputBefore}>+86</div>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl 
              fullWidth={ true } 
              variant="outlined"
              required={ true }
              error={ passwordError }
              className={ styles.loginPasswordInput }
            >
              <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={ password.showPassword ? 'text' : 'password' }
                value={ password.password }
                onChange={ handlePasswordChange('password') }
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={ handleClickShowPassword }
                      edge="end"
                    >
                      { password.showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={ 40 }
              />
            </FormControl>
          </TabPanel>
        </TabContext>
        <div className={ styles.loginButtonGroup }>
          <ButtonGroup disableElevation variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={ handleSubmitClick }>登录</Button>
            <Button onClick={ handleSignupClick }>注册</Button>
          </ButtonGroup>
          <Button color="primary">忘记密码？</Button>
        </div>
      </div>
    </div>
  );
}