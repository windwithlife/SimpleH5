/**
 * 注册页面
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
  Button
} from '@material-ui/core'
  
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles'

import fetch from '@utils/network'
// 样式表 material采用css-in-js
const useStyles = makeStyles((theme) => ({
  signupPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  signupContainer: {
    marginLeft: 30,
    marginRight: 30
  },
  signupUserInput: {
    marginBottom: 16
  },
  signupPasswordInput: {
    marginBottom: 16
  },
  signupPasswordAgainInput: {
      marginBottom: 16
  },
  signupNicknameInput: {
      marginBottom: 16
  },
  signupPhoneInput: {
      marginBottom: 16
  },
  signupPhoneInputBefore: {
      color: theme.palette.primary.light,
      fontSize: 14
  },
  signupButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  signupRulesCheck: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  signupRulesRadio: {
    padding: 0,
    marginRight: 2
  },
  signupRulesCheckIcon: {
    fontSize: 14,
  },
  signupRulesCheckText: {
    fontSize: 10,
    color: theme.palette.primary.main
  },
  signupRulesCheckTextError: {
    fontSize: 10,
    color: theme.palette.error.main
  },
  signupMessage: {
    textAlign: 'center',
    backgroundColor: theme.palette.error.light
  }
}));

export default function signup(props) {
  const styles = useStyles();
  // 用户名
  const [username, setUsername] = useState('')
  // 昵称
  const [nickname, setNickname] = useState('')
  // 手机号
  const [phone, setPhone] = useState('')
  // 密码
  const [password, setPassword] = useState({
    password: '',
    showPassword: false
  });
  // 确认密码
  const [passwordAgain, setPasswordAgain] = useState({
    password: '',
    showPassword: false
  });
  // 错误状态展示
  const [usernameError, setUsernameError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordAgainError, setPasswordAgainError] = useState(false);
  // 0: 初始 1: 错误 2: 正确
  const [rulesError, setRulesError] = useState(0);
  // 消息队列
  const { enqueueSnackbar } = useSnackbar();
  // 处理用户名输入
  const handleUsernameChange = (prop) => (event) => {
    setUsernameError(false);
    setUsername(event.target.value);
  }
  // 处理昵称输入
  const handleNicknameChange = (prop) => (event) => {
      setNicknameError(false);
      setNickname(event.target.value);
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
  // 处理确认密码输入
  const handlePasswordAgainChange = (prop) => (event) => {
      setPasswordAgainError(false);
      setPasswordAgain({ ...passwordAgain, [prop]: event.target.value });
  }
  // 处理确认密码显示
  const handleClickShowPasswordAgain = () => {
      setPasswordAgain({ ...passwordAgain, showPassword: !passwordAgain.showPassword });
  }
  // 处理规则点击
  const handleRulesClick = (event) => {
    if (event.target.checked) {
      setRulesError(2);
    }
  }
  // 处理注册按钮点击
  const handleSignupClick = () => {
    if (!username.trim()) {
      enqueueSnackbar('请输入正确的用户名', { variant: 'error' });
      setUsernameError(true);
    } 
    
    if (!nickname.trim()) {
      enqueueSnackbar('请输入正确的昵称', { variant: 'error' });
      setNicknameError(true);
    } 
    
    if (!phone.trim() || !(/^1[3456789][0-9]{9}$/i.test(phone.trim()))) {
      enqueueSnackbar('请输入有效的手机号', { variant: 'error' });
      setPhoneError(true);
    }
    
    if (!password?.password.trim() || !(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password?.password.trim()))) {
      enqueueSnackbar('密码至少8位，并包含大小写英文字母、数字及特殊符号', { variant: 'error' });
      setPasswordError(true);
    }
    
    if (!passwordAgain?.password.trim() || passwordAgain?.password != password?.password) {
      enqueueSnackbar('确认密码不正确', { variant: 'error' });
      setPasswordAgainError(true);
    }
    
    if (rulesError !== 2) {
      enqueueSnackbar('请阅读并同意相关细则', { variant: 'error' });
      setRulesError(1);
    }

    if (
      !usernameError &&             // 用户名非空
      !nicknameError &&             // 昵称非空
      !phoneError &&                // 手机号非空
      !passwordError &&             // 密码非空
      !passwordAgainError &&        // 确认密码非空
      rulesError == 2               // 同意相关细则
    ) {
      fetch({
        url: 'https://api.koudaibook.com/account-service/account/signup',
        data: {
          name: username,
          nickName: nickname,
          password: password.password,
          phoneNumber: phone
        }
      }).then((result) => {
        if (result?.status?.code == 200) {
          enqueueSnackbar('注册新用户成功', { variant: 'success' })
        }
      }).catch((error) => {
        enqueueSnackbar('注册信息失败', { variant: 'error' })
      })
    }
  }
  
  return (
    <div className={ styles.signupPage } >
      <div className={ styles.signupContainer }>
        {/* 用户名输入 */}
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          size="small"
          error={ usernameError }
          className={ styles.signupUserInput }
        >
          <InputLabel htmlFor="outlined-adornment-username">用户名</InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            type='text'
            value={ username }
            onChange={ handleUsernameChange('username') }
            labelWidth={ 58 }
            autoComplete="off"
          />
        </FormControl>
        {/* 昵称输入 */}
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          size="small"
          error={ nicknameError }
          className={ styles.signupNicknameInput }
        >
          <InputLabel htmlFor="outlined-adornment-nickname">昵称</InputLabel>
          <OutlinedInput
            id="outlined-adornment-nickname"
            type='text'
            value={ nickname }
            onChange={ handleNicknameChange('nickname') }
            labelWidth={ 40 }
            autoComplete="off"
          />
        </FormControl>
        {/* 手机号输入 */}
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          size="small"
          error={ phoneError }
          className={ styles.signupPhoneInput }
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
                  <div className={styles.signupPhoneInputBefore}>+86</div>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* 密码输入 */}
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          size="small"
          error={ passwordError }
          className={ styles.signupPasswordInput }
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
        {/* 再次确认密码 */}
        <FormControl 
          fullWidth={ true } 
          variant="outlined"
          required={ true }
          size="small"
          error={ passwordAgainError }
          className={ styles.signupPasswordAgainInput }
        >
          <InputLabel htmlFor="outlined-adornment-password-again">确认密码</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-again"
            type={ passwordAgain.showPassword ? 'text' : 'password' }
            value={ passwordAgain.password }
            onChange={ handlePasswordAgainChange('password') }
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={ handleClickShowPasswordAgain }
                  edge="end"
                >
                  { passwordAgain.showPassword ? <Visibility /> : <VisibilityOff /> }
                </IconButton>
              </InputAdornment>
            }
            labelWidth={ 75 }
          />
        </FormControl>
        {/* 注册按钮 */}
        <div className={ styles.signupButtonGroup }>
          <Button variant="contained" color="primary" disableElevation onClick={ handleSignupClick }>注册</Button>
        </div>
        {/* 必读细则 */}
        <div className={ styles.signupRulesCheck }>
          <Radio 
            color="primary"
            required={true}
            className={ styles.signupRulesRadio }
            onChange={ handleRulesClick }
            icon={
              <RadioButtonUncheckedIcon 
                className={ styles.signupRulesCheckIcon }
              />
            }
            checkedIcon={
              <CheckCircleIcon 
                className={ styles.signupRulesCheckIcon }
              />
            }
          />
          <div className={ rulesError !== 1 ? styles.signupRulesCheckText : styles.signupRulesCheckTextError }>请您仔细阅读相关细则</div>
        </div>
      </div>
    </div>
  );
}