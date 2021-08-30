/**
 * 个人信息页面
 */
import {
  Avatar, Button, ButtonGroup, Card,
  CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import ArrowRight from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {
  useState
} from 'react';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: '10%',
    marginLeft: 30,
    marginRight: 30,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardMargin: {
    marginTop: -10,
  },
  infoLabel: {
    marginTop: 20,
    color: theme.palette.grey[500],
    fontSize: 14,
  },
  infoItemGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoItemTitle: {
    color: theme.palette.grey[600]
  },
  infoItemValue: {
    color: theme.palette.grey[900]
  },
  infoIndependent: {
    width: 300,
    color: theme.palette.grey[900]
  },
}));

export default function UserInfo(props) {
  const styles = useStyles();
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  const [info, setInfo] = useState({
    nickName: '越光宝盒饭',
    area: '上海',
    desc: '还没有填写自我介绍，点击添加',
    age: '22',
    level: 14,
    tags: [{ value: "标签一", color: "#FFB6C1" }, { value: '标签二', color: "#6495ED" }, { value: '标签三', color: "#FFA500" }],
    address: '上海市黄浦区陕西南路876号',
    payAccount: '支付宝',
  });
  // 处理登录按钮点击
  const handleSubmitClick = () => {
  }

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.card}>

        <CardMedia
          className={styles.media}
          image="../test.jpg"
          title="Contemplative Reptile"
        />
        <CardHeader
          avatar={<Avatar aria-label="recipe" className={styles.avatar} src="../test.jpg" />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={info.nickName}
          subheader={
            <ButtonGroup variant="text" size="small" aria-label="text primary button group" style={{ height: 12 }}>
              {
                info.tags.map((tag, index) => {
                  return <Button style={{ fontSize: 10, color: tag.color }}>{tag.value}</Button>
                })
              }
            </ButtonGroup>
          }
        />
        <CardContent className={styles.cardMargin}>
          <Typography gutterBottom variant="h5" component="h2">
            {info.area}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info.desc}
          </Typography>
        </CardContent>
        {/* <CardActions className={styles.cardMargin}>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
        
      </Card>

      <Divider />
      <Typography className={styles.infoLabel} color="primary">支付信息</Typography>
      <div className={styles.infoItemGroup}>
        <Typography variant="body2" color="textSecondary" component="p">账户信息</Typography>
        <Button className={styles.infoItemValue}>{info.payAccount ? info.payAccount : "暂未设置"}</Button>
      </div>
      <div className={styles.infoItemGroup}>
        <Typography variant="body2" color="textSecondary" component="p">收货地址</Typography>
        <Button className={styles.infoItemValue}>{info.address ? info.address : "暂未设置"}</Button>
      </div>
      <Divider />

      <div className={styles.infoLabel} />
      <div className={styles.infoItemGroup}>
        <Typography variant="body2" color="textSecondary" component="p">
          版本更新
        </Typography>
        <Button className={styles.infoItemValue} endIcon={<ArrowRight />} />
      </div>
      <div className={styles.infoItemGroup}>
        <Typography variant="body2" color="textSecondary" component="p">
          查看帮助
        </Typography>
        <Button className={styles.infoItemValue} endIcon={<ArrowRight />} />
      </div>
      <Divider />

    </div >
  );
}