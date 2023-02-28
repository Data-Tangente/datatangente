import React, { useEffect } from 'react';
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
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { langs } from './../utils';
// import '../i18n';
config.autoAddCss = false;

function MyApp({ Component, pageProps }){
    const router = useRouter();
    const pushLocation = (lang) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: lang });
        localStorage.setItem("default_lang", lang);
    }
    const handleLocationLangChange = async () => {
        const getCurrentLocale = router.locale;
        const localLang = localStorage.getItem("selected_lang") || localStorage.getItem("default_lang");
        if(localLang) {
            if(localLang !== getCurrentLocale) pushLocation(localLang);
            return;
        };
        const apiLocationRes = await fetch("/api/location");
        const apiLocationData = await apiLocationRes.json();
        const includesLang = langs.find(l => l.value === apiLocationData?.lang);
        if(apiLocationData?.lang &&  includesLang) {
            pushLocation(apiLocationData.lang);
        }
    }
    useEffect(() => {
        handleLocationLangChange();
    }, [])
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