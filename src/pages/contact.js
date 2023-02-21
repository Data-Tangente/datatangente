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
      <Grid className="contact-container" container style={{ width: "100%" }}>
        <div className="contact-title">
          <Grid className="contact-title-text-container" container item>
            <Typography variant="h3" className="contact-title-text">
              <span>{t("contact.title")}</span>
            </Typography>
          </Grid>

          {/* <Grid container className="contact-info-container max-width--"> */}
          <Grid container className="contact-info-container">
            <div className="address-container">
              <div className="address">{t("footer.address")}</div>
              <div className="phone-number">{"+1(829)-891-1171"}</div>
            </div>

            <div className="social-media-container">
              <span className="social-icon-container">
                <a
                  href="https://www.instagram.com/datatangente/"
                  target="_blank">
                  <Icon icon={faInstagram} />
                </a>
              </span>
              <span className="social-icon-container">
                <a
                  href="https://www.linkedin.com/company/data-tangente"
                  target="_blank">
                  <Icon icon={faLinkedin} />
                </a>
              </span>
            </div>
          </Grid>

          {/* <Grid container className="message-container max-width--"> */}
          <Grid container className="message-container">
            <form className="message-form-container">
              <Typography variant="h6" className="message-title-text">
                <span>{t("contact.messageTitle")}</span>
              </Typography>
              {/* <div className="message-form-inputs-container" style={{display:'flex', justifyContent:'space-between'}}>
                                <TextField 
                                    name="name" 
                                    type="text"
                                    required
                                    placeholder="Nombre (*)"
                                    inputClass={`input-subscribe ${errorList.name ? 'error' : ''}`}
                                    onChange={handleChangeInput} 
                                    value={formInfo.name}
                                    errorClass={`error-msg ${errorList.name ? 'show' : ''}`}
                                />
                                <TextField
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email (*)" 
                                    inputClass={`input-subscribe ${errorList.email ? 'error' : ''}`}
                                    onChange={handleChangeInput}
                                    value={formInfo.email}
                                    errorClass={`error-msg ${errorList.email ? 'show' : ''}`}
                                    errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
                                />
                                <TextField
                                    name="org"
                                    type="text"
                                    required
                                    placeholder="Empresa" 
                                    inputClass={`input-subscribe ${errorList.org ? 'error' : ''}`}
                                    onChange={handleChangeInput}
                                    value={formInfo.org}
                                    errorClass={`error-msg ${errorList.org ? 'show' : ''}`}
                                />
                            </div> */}
              <TextField
                name="name"
                type="text"
                required
                label={t("contact.fieldNameTitle") + "(*)"}
                placeholder={t("contact.fieldNamePlaceholder")}
                inputClass={`input-subscribe ${errorList.name ? "error" : ""}`}
                onChange={handleChangeInput}
                value={formInfo.name}
                errorClass={`error-msg ${errorList.name ? "show" : ""}`}
              />
              <TextField
                type="email"
                name="email"
                required
                label={t("contact.fieldEmailTitle") + "(*)"}
                placeholder={t("contact.fieldEmailPlaceholder")}
                inputClass={`input-subscribe ${errorList.email ? "error" : ""}`}
                onChange={handleChangeInput}
                value={formInfo.email}
                errorClass={`error-msg ${errorList.email ? "show" : ""}`}
                errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
              />
              <TextField
                name="org"
                type="text"
                label={t("contact.fieldOrgTitle")}
                placeholder={t("contact.fieldOrgPlaceholder")}
                inputClass={`input-subscribe ${errorList.org ? "error" : ""}`}
                onChange={handleChangeInput}
                value={formInfo.org}
                errorClass={`error-msg ${errorList.org ? "show" : ""}`}
              />
              <TextField
                name="orgPositon"
                type="text"
                label={t("contact.fieldOrgPositonTitle")}
                placeholder={t("contact.fieldOrgPositonPlaceholder")}
                inputClass={`input-subscribe ${errorList.org ? "error" : ""}`}
                onChange={handleChangeInput}
                value={formInfo.orgPositon}
                errorClass={`error-msg ${errorList.org ? "show" : ""}`}
              />
              <NumericField
                name="phoneNumber"
                type="text"
                label={t("contact.fieldPhoneNumberTitle")}
                placeholder={t("contact.fieldNamePlacehPlaceholder")}
                inputClass={`input-subscribe ${
                  errorList.phoneNumber ? "error" : ""
                }`}
                format={"(###)-###-####"}
                onChange={handleChangeInput}
                value={formInfo.phoneNumber}
                errorClass={`error-msg ${errorList.phoneNumber ? "show" : ""}`}
              />
              <TextField
                name="hearOfUs"
                type="text"
                label={t("contact.fieldHearOfUsTitle")}
                placeholder={t("contact.fieldHearOfUsPlaceholder")}
                inputClass={`input-subscribe ${
                  errorList.hearOfUs ? "error" : ""
                }`}
                onChange={handleChangeInput}
                value={formInfo.hearOfUs}
                errorClass={`error-msg ${errorList.hearOfUs ? "show" : ""}`}
              />
              <TextAreaField
                name="msg"
                type="text"
                label={t("contact.fieldMsgTitle") + "(*)"}
                placeholder={t("contact.fieldMsgPlaceholder")}
                inputClass={`input-subscribe message ${
                  errorList.msg ? "error" : ""
                }`}
                onChange={handleChangeInput}
                value={formInfo.msg}
                errorClass={`error-msg ${errorList.msg ? "show" : ""}`}
                row={5}
              />
              {/* <TextField
                                name="msg"
                                type="text"
                                required
                                label={t('contact.fieldMsgTitle') + "(*)"}
                                placeholder={t('contact.fieldMsgPlaceholder')}
                                inputClass={`input-subscribe ${errorList.msg ? 'error' : ''}`}
                                onChange={handleChangeInput}
                                value={formInfo.msg}
                                errorClass={`error-msg ${errorList.msg ? 'show' : ''}`}
                            /> */}
              {/* <TextAreaField 
                                type="text"
                                required
                                inputClass={`input-subscribe ${errorList.msg ? 'error' : ''} message`}
                                name="message" 
                                rows="10" 
                                placeholder="Mensaje (*)" 
                                style={{resize:'none'}}
                                onChange={handleChangeInput}
                                value={formInfo.msg}
                                errorClass={`error-msg ${errorList.msg ? 'show' : ''}`}
                            /> */}
              {loading ? (
                <div className="send-message-btn-container">
                  <div
                    className="button-subscribe-loading"
                    style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgressLoading />
                  </div>
                </div>
              ) : (
                <div
                  className="send-message-btn-container"
                  onClick={handleSubmitForm}>
                  <label className="button-subscribe" htmlFor="submit-form">
                    <span>{t("contact.sendMsg")}</span>
                  </label>
                </div>
              )}
            </form>
          </Grid>
        </div>
      </Grid>
      {dialog === "success" && (
        <SimpleDialog
          open={true}
          title={t("contact.success")}
          response={t("contact.successBody")}
          setDialog={setDialog}
          toggleDialog={toggleDialog}
        />
      )}
      {dialog === "failure" && (
        <SimpleDialog
          open={true}
          title={t("contact.error")}
          response={t("contact.errorBody")}
          setDialog={setDialog}
          toggleDialog={toggleDialog}
        />
      )}
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
