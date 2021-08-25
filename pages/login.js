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
  Radio,
  Button,
  ButtonGroup
} from '@material-ui/core'

import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { makeStyles } from '@material-ui/core/styles'
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
  },
  loginRulesCheck: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  loginRulesRadio: {
    padding: 0,
    marginRight: 2
  },
  loginRulesCheckIcon: {
    fontSize: 14,
  },
  loginRulesCheckText: {
    fontSize: 10,
    color: theme.palette.primary.main
  },
  loginRulesCheckTextError: {
    fontSize: 10,
    color: theme.palette.error.main
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
  // 0: 初始 1: 错误 2: 正确
  const [rulesError, setRulesError] = useState(0);
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
  // 处理规则点击
  const handleRulesClick = (event) => {
    if (event.target.checked) {
      setRulesError(2);
    }
  }
  // 处理登录按钮点击
  const handleSubmitClick = () => {
    if (!username.trim()) {
      setUsernameError(true);
    }

    if (!password?.password.trim()) {
      setPasswordError(true);
    }

    if (rulesError === 0) {
      setRulesError(1);
    }
  }
  // 处理注册按钮点击
  const handleSignupClick = () => {
    window.open(`${window.location.origin}/signup`)
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
          <InputLabel htmlFor="outlined-adornment-username">用户名/手机号/昵称</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type='text'
            value={ username }
            onChange={ handleUsernameChange('username') }
            labelWidth={ 150 }
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
        <div className={ styles.loginRulesCheck }>
          <Radio 
            color="primary"
            required={true}
            className={ styles.loginRulesRadio }
            onChange={ handleRulesClick }
            icon={
              <RadioButtonUncheckedIcon 
                className={ styles.loginRulesCheckIcon }
              />
            }
            checkedIcon={
              <CheckCircleIcon 
                className={ styles.loginRulesCheckIcon }
              />
            }
          />
          <div className={ rulesError !== 1 ? styles.loginRulesCheckText : styles.loginRulesCheckTextError }>请您仔细阅读相关细则</div>
        </div>
      </div>
    </div>
  );
}