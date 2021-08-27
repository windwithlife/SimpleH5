// 自定义App组件，可以引入全局css
import styles from '@styles/global.css';
import { SnackbarProvider } from 'notistack';

function customApp({ Component, pageProps }) {
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Component {...pageProps} />
        </SnackbarProvider>
    )
}

export default customApp;