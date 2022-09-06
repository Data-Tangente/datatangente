import {Typography, Grid} from '@material-ui/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function Custom404() {
    const { t } = useTranslation();
    return (
        <div style={{backgroundColor:'#212121', height:'50rem', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography style={{color: '#FFFFFF'}} variant="h4"> {t('notFound')}</Typography>
        </div>
    );
}

export async function getStaticProps({locale}) {
	return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        }
    }
}