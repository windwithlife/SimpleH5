// 自定义全局document组件
import React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'

import { ServerStyleSheets } from '@material-ui/core/styles'

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
                <body>
                    <Main style={{width: '100%', height: '100%'}} />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
// 此段代码为处理server render和client render出现不相符错误
CustomDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
  
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });
  
    const initialProps = await Document.getInitialProps(ctx);
  
    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};

export default CustomDocument;