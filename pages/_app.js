// 自定义App组件，可以引入全局css

function customApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default customApp;