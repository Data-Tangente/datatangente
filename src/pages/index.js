import React from 'react';
import Slideshow from './../components/Slideshow';
import Division from './../components/Division';
import BigDivision from './../components/BigDivision';
import WorkedDivision from './../components/WorkedDivision';
import PostCard from './../components/PostCard';
import SubsDivision from './../components/SubscribeDivision';
import BookingDivision from './../components/BookingDivision';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPostsData } from '../functions/generalMethods';

export default function Home({ posts }) {
    const { t } = useTranslation();
    return (
        <div className="page-wrap">
            <Slideshow />
            <Division
                boldText={t('home.divisions.solutions')}
                normalText={t('home.divisions.needs')}
                bgColor="#f05638"
                textColor="#fff"
            />
            <BigDivision />
            <Division
                boldText={t('home.divisions.trusted')}
                normalText={t('home.divisions.work')}
                bgColor="#fff"
                textColor="#f05638"
            />
            <WorkedDivision
                bgColor="#f05638"
            />
            <Division
                boldText={t('home.divisions.posts')}
                // normalText={t('home.divisions.recent')}
                bgColor="#fff"
                textColor="#f05638"
            />
            <PostCard
                posts={posts}
            />
            <SubsDivision />
            <BookingDivision />
        </div>
    )
}

export async function getStaticProps({ locale }) {

    const data = await getPostsData(locale);
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            ...data
        }
    };
}