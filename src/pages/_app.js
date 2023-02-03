import '../styles/styles.scss';
import '../styles/solutions.scss';
import '../styles/contact.scss';
import '../styles/aboutUs.scss';
import '../styles/posts.scss';
import '../styles/postDetail.scss';
import Layout from './../components/Layout';
import Head from 'next/head'
import "@fortawesome/fontawesome-svg-core/styles.css";
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';
import { config } from "@fortawesome/fontawesome-svg-core";
// import '../i18n';
import { appWithTranslation } from 'next-i18next';
import { useGeolocation } from 'react-use';
import { useEffect } from 'react';

config.autoAddCss = false;

function MyApp({ Component, pageProps }){
    const state = useGeolocation();
    useEffect(() => {
        if(state){
            const test = JSON.stringify(state, null, 2)
            console.log(test);
        }
    }, [state])
    return(
        <Layout>
            <Head>
                <title>Data Tangente</title>
                <meta  name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="UTF-8" />
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/assets/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}
export default appWithTranslation(MyApp);