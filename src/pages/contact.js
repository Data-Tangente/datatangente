import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import SubsDivision from "../components/SubscribeDivision";
import CircularProgressLoading from "../components/Loading";
import SimpleDialog from "../components/SimpleDialog";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import emailjs from "emailjs-com";
import { TextField, NumericField, TextAreaField } from "../components/Fields";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BookingDivision from "../components/BookingDivision";
import ContactForm from "../components/ContactForm";

function Contact() {
  const { t } = useTranslation();
  const defaultVal = {
    name: "",
    email: "",
    org: "",
    msg: "",
    orgPositon: "",
    phoneNumber: "",
    hearOfUs: "",
  };
  const [dialog, setDialog] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(defaultVal);
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState({});
  const required = ["name", "email", "msg"];
  const emailRegx = // email reg expression
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChangeInput = (event, val) => {
    const name = event?.target?.name || val?.event?.target?.name;
    const value = event?.target?.value || val?.event?.target?.value;
    setErrorList({ ...errorList, [name]: false });
    setFormInfo({ ...formInfo, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let hasError = false;
    required.forEach((item) => {
      let currentErr = false;
      switch (item) {
        case "email":
          currentErr = !Boolean(
            emailRegx.test(String(formInfo[item]).toLocaleLowerCase())
          );
          break;
        default:
          currentErr = !Boolean(formInfo[item].trim());
          break;
      }
      errors[item] = currentErr;
      if (!hasError && currentErr) {
        hasError = currentErr;
      }
    });
    setError(hasError);
    setErrorList({ ...errors });
    return hasError;
  };

  const handleSubmitForm = () => {
    if (validateForm()) {
      return;
    }
    const templateId = "template_iv7nt41";
    const info = {
      from_name: formInfo.name,
      message: formInfo.msg,
      org_positon: formInfo.orgPositon,
      phone_number: formInfo.phoneNumber,
      hear_of_us: formInfo.hearOfUs,
      from_email: formInfo.email,
      from_org: formInfo.org || "---",
    };
    sendFeedback(templateId, info);
  };

  const sendFeedback = (template, vars) => {
    setLoading(true);
    emailjs
      .send("service_fncue1a", template, vars, "ON2z6ecngBZ9QoCwL")
      .then(() => {
        toggleDialog("success");
        setFormInfo({ ...defaultVal });
        setLoading(false);
      })
      .catch(() => {
        toggleDialog("failure");
        setLoading(false);
      });
  };

  const toggleDialog = (dialog) => {
    setDialog(dialog);
  };

  return (
    <>
      <ContactForm />
      <BookingDivision />
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
