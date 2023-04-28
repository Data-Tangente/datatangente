import React, { useEffect } from "react";
import Slideshow from "./../components/Slideshow";
import Division from "./../components/Division";
import BigDivision from "./../components/BigDivision";
import WorkedDivision from "./../components/WorkedDivision";
import PostCard from "./../components/PostCard";
import BookingDivision from "./../components/BookingDivision";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getPostsData } from "../functions/generalMethods";
import NewsletterSubscribeContact from "../components/NewsletterSubscribeContact";
import Footer from "../components/Footer";

export default function Home({ posts }) {
  const { t } = useTranslation();
  return (
    <div className="page-wrap scroll-container">
      <Slideshow />
      <BigDivision />
      <BookingDivision />
      <WorkedDivision bgColor="#f05638" />
      <Division
        boldText={t("home.divisions.posts")}
        // normalText={t('home.divisions.recent')}
        bgColor="#fff"
        textColor="#f05638"
      />
      <PostCard posts={posts} />
      <NewsletterSubscribeContact />
      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const data = await getPostsData(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...data,
    },
  };
}
