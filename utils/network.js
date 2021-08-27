/**
 * 网络请求
 * r_gao@trip.com
 * 2021/08/26
 */
import axios from 'axios';

export default function fetch(param) {
    return new Promise((resolve, reject) => {
        axios({
            // 请求服务器的url
            url: param?.url || '',
            // 创建请求时的方式
            method: param?.method || 'post',
            // 请求数据
            data: { params: param?.data || {} } ,
            // 超时时间
            timeout: 3000,
            // 跨区请求是否需要凭证
            withCredentials: false,
            // 指定头
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((result) => {
            // 按照状态码判断
            if (result?.status == 200) {
                resolve(result?.data)
            } else {
                reject(result?.data);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}