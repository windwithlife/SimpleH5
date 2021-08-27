/**
 * 登录界面
 * r_gao@trip.com
 */
import React, { 
  useState 
} from 'react';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  ButtonGroup
} from '@material-ui/core'

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'
// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
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
  loginButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

export default function Login(props) {
  const styles = useStyles();
  // 用户名
  const [username, setUsername] = useState('')
  // 密码
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  // 错误状态展示
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // 消息队列
  const { enqueueSnackbar } = useSnackbar();
  // 处理用户名输入
  const handleUsernameChange = (prop) => (event) => {
    setUsernameError(false);
    setUsername(event.target.value);
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
    if (!username.trim()) {
      enqueueSnackbar('请填写正确的用户名或手机号', { variant: 'error' })
      setUsernameError(true);
    }

    if (!password?.password.trim()) {
      enqueueSnackbar('请输入有效的密码', { variant: 'error' })
      setPasswordError(true);
    }

    if (
      !usernameError &&
      !passwordError
    ) {
      fetch({
        url: 'https://api.koudaibook.com/account-service/account/login',
        data: {
          username: username,
          password: password.password
        }
      }).then((result) => {
        if (result?.status?.code == 200) {
          enqueueSnackbar('用户登录成功', { variant: 'success' })
        }
      }).catch((error) => {
        enqueueSnackbar('用户登录失败', { variant: 'error' })
      })
    }
  }
  // 处理注册按钮点击
  const handleSignupClick = () => {
    window.location.href = `${window.location.origin}/signup`;
  }
  
  return (
    <div className={ styles.loginPage }>
      <div className={ styles.loginContainer }>
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          error={ usernameError }
          className={ styles.loginUserInput }
        >
          <InputLabel htmlFor="outlined-adornment-username">用户名/手机号</InputLabel>
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