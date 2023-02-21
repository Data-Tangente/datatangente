import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Typography, Grid } from "@material-ui/core";
import { TextField, NumericField, TextAreaField } from "../components/Fields";

export default function ContactForm() {
  const { t } = useTranslation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorList, setErrorList] = useState({});

  async function handleOnSubmit(e) {
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

  return (
    <>
      <Grid className="contact-title">
        <Grid className="contact-title-text-container" container item>
          <Typography variant="h4" className="contact-title-text">
            <span>{t("contact.title")}</span>
          </Typography>
        </Grid>
        <form onSubmit={handleOnSubmit} className="message-form-container">
          <Typography variant="h6" className="message-title-text">
            <span>{t("contact.messageTitle")}</span>
          </Typography>

          {/* <label htmlFor={t("contact.fieldNameTitle") + "(*)"}>
            Full name<span>*</span>
          </label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            name="fullname"
          /> */}
          <TextField
            name="name"
            type="text"
            required
            label={t("contact.fieldNameTitle") + "(*)"}
            placeholder={t("contact.fieldNamePlaceholder")}
            inputClass={`input-subscribe ${errorList.name ? "error" : ""}`}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            value={fullname}
            errorClass={`error-msg ${errorList.name ? "show" : ""}`}
          />

          {/* <label htmlFor="email">
            E-mail<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          /> */}
          <TextField
            type="email"
            name="email"
            required
            label={t("contact.fieldEmailTitle") + "(*)"}
            placeholder={t("contact.fieldEmailPlaceholder")}
            inputClass={`input-subscribe ${errorList.email ? "error" : ""}`}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            errorClass={`error-msg ${errorList.email ? "show" : ""}`}
            errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
          />

          <label htmlFor="subject">
            Subject<span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />

          <label htmlFor="message">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}></textarea>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Grid>
    </>
  );
}
