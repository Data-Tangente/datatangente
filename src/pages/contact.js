import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContactForm from "../components/ContactForm";
function Contact() {
  return (
    <>
      <ContactForm />
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
