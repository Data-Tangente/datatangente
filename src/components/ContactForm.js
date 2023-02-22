import { Grid, Typography } from "@material-ui/core";
import { TextField, TextAreaField, NumericField } from "../components/Fields";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactForm() {
  const { t } = useTranslation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hearOfUs, setHearOfUs] = useState("");
  const [message, setMessage] = useState("");
  const [errorList, setErrorList] = useState({});
  const [messageSent, setMessageSent] = useState(false);

  async function handleOnSubmit(e) {
    setMessageSent(true);
    clearForm();
    e.preventDefault();

    const formData = {};

    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    await fetch("/api/sendgrid", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  function clearForm() {
    setFullname("");
    setEmail("");
    setCompany("");
    setPosition("");
    setPhoneNumber("");
    setHearOfUs("");
    setMessage("");
  }

  return (
    <>
      <Grid className="contact-title">
        <div className="contact-container">
          <Typography variant="h4" className="contact-title-text">
            <span>{t("contact.title")}</span>
          </Typography>
          <form onSubmit={handleOnSubmit} className="message-form-container">
            <Typography variant="h6" className="message-title-text">
              <span>{t("contact.messageTitle")}</span>
            </Typography>

            <TextField
              name="name"
              type="text"
              required
              label={t("contact.fieldNameTitle") + "* :"}
              placeholder={t("contact.fieldNamePlaceholder")}
              inputClass={`input-subscribe ${errorList.name ? "error" : ""}`}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              value={fullname}
              errorClass={`error-msg ${errorList.name ? "show" : ""}`}
            />

            <TextField
              type="email"
              name="email"
              required
              label={t("contact.fieldEmailTitle") + "* :"}
              placeholder={t("contact.fieldEmailPlaceholder")}
              inputClass={`input-subscribe ${errorList.email ? "error" : ""}`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              errorClass={`error-msg ${errorList.email ? "show" : ""}`}
              errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
            />

            <TextField
              name="company"
              type="text"
              label={t("contact.fieldOrgTitle") + " :"}
              placeholder={t("contact.fieldOrgPlaceholder")}
              inputClass={`input-subscribe ${errorList.company ? "error" : ""}`}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              value={company}
              errorClass={`error-msg ${errorList.company ? "show" : ""}`}
            />
            <TextField
              name="position"
              type="text"
              label={t("contact.fieldOrgPositonTitle") + " :"}
              placeholder={t("contact.fieldOrgPositonPlaceholder")}
              inputClass={`input-subscribe ${errorList.company ? "error" : ""}`}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              value={position}
              errorClass={`error-msg ${errorList.company ? "show" : ""}`}
            />
            <TextField
              name="phoneNumber"
              type="text"
              label={t("contact.fieldPhoneNumberTitle") + " :"}
              placeholder={t("contact.fieldNamePlacehPlaceholder")}
              inputClass={`input-subscribe ${
                errorList.phoneNumber ? "error" : ""
              }`}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              value={phoneNumber}
              errorClass={`error-msg ${errorList.phoneNumber ? "show" : ""}`}
            />
            <TextField
              name="hearOfUs"
              type="text"
              label={t("contact.fieldHearOfUsTitle") + " :"}
              placeholder={t("contact.fieldHearOfUsPlaceholder")}
              inputClass={`input-subscribe ${
                errorList.hearOfUs ? "error" : ""
              }`}
              onChange={(e) => {
                setHearOfUs(e.target.value);
              }}
              value={hearOfUs}
              errorClass={`error-msg ${errorList.hearOfUs ? "show" : ""}`}
            />
            <TextAreaField
              required
              name="message"
              type="text"
              label={t("contact.fieldMsgTitle") + "* :"}
              placeholder={t("contact.fieldMsgPlaceholder")}
              inputClass={`input-subscribe message ${
                errorList.msg ? "error" : ""
              }`}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              errorClass={`error-msg ${errorList.msg ? "show" : ""}`}
              row={2}
            />
            {messageSent ? (
              <div className="message-sent">{t("contact.messageSent")}</div>
            ) : (
              <div className="contact-button-container">
                <button type="submit" className="contact-button">
                  {t("contact.sendMsg")}
                </button>
              </div>
            )}
          </form>
        </div>

        <Grid className="contact-info-container">
          <div className="info-container">
            <div className="address">
              <span className="address--icon-container">
                <Icon icon={faMapMarkerAlt} />
              </span>
              {t("footer.address")}
            </div>
            <div className="phone-email-container">
              <div className="phone-number">
                <span className="phone--icon-container">
                  <Icon icon={faPhoneAlt} />
                </span>
                {"+1(829)-891-1171"}
              </div>
              <div className="email">
                <span className="email--icon-container">
                  <Icon icon={faEnvelope} />
                </span>
                {"info@datatangente.com"}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
