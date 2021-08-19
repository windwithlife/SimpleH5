// 自定义App组件，可以引入全局css
import 'antd/dist/antd.dark.min.css';

function customApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default customApp;