import React from "react";
import SubsDivision from "../components/SubscribeDivision";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BookingDivision from "../components/BookingDivision";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <>
      <ContactForm />
      <SubsDivision />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Contact;
