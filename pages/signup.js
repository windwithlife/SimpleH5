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
    loginPasswordAgainInput: {
        marginBottom: 16
    },
    loginNicknameInput: {
        marginBottom: 16
    },
    loginPhoneInput: {
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
    // 昵称
    const [nickname, setNickname] = useState('')
    // 手机号
    const [phone, setPhone] = useState('')
    // 密码
    const [password, setPassword] = useState({
      password: '',
      showPassword: false
    });
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
    const handleSubmitClick = () => {
      if (!username.trim()) {
        setUsernameError(true);
      }

      if (!nickname.trim()) {
        setNicknameError(true);
      }

      if (!phone.trim()) {
        setPhoneError(true);
      }
  
      if (!password?.password.trim()) {
        setPasswordError(true);
      }

      if (!passwordAgain?.password.trim() || passwordAgain?.password != password?.password) {
        setPasswordAgainError(true);
      }
  
      if (rulesError === 0) {
        setRulesError(1);
      }
    }
    // 处理注册按钮点击
    const handleSignupClick = () => {
      
    }
    
    return (
      <div className={ styles.loginPage }>
        <div className={ styles.loginContainer }>
          {/* 用户名输入 */}
          <FormControl 
            fullWidth={ true } 
            variant="outlined"
            required={ true }
            size="small"
            error={ usernameError }
            className={ styles.loginUserInput }
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
            className={ styles.loginNicknameInput }
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
            className={ styles.loginPhoneInput }
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
          {/* 密码输入 */}
          <FormControl 
            fullWidth={ true } 
            variant="outlined"
            required={ true }
            size="small"
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
          {/* 再次确认密码 */}
          <FormControl 
            fullWidth={ true } 
            variant="outlined"
            required={ true }
            size="small"
            error={ passwordAgainError }
            className={ styles.loginPasswordAgainInput }
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
          <div className={ styles.loginButtonGroup }>
            <Button variant="contained" color="primary" disableElevation onClick={ handleSubmitClick }>注册</Button>
          </div>
          {/* 必读细则 */}
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