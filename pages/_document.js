// 自定义全局document组件

import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'

class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
                </Head>
                <body id='body'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument;