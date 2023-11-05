import { TextField, TextAreaField } from "../components/Fields";
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function ContactFormFooter() {
  const { t } = useTranslation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
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
    <form onSubmit={handleOnSubmit} className="footer-form">
      <TextField
        name="name"
        type="text"
        required
        label={t("contact.fieldNameTitle") + "*"}
        // placeholder={t("contact.fieldNamePlaceholder")}
        inputClass={`footer-input ${errorList.name ? "error" : ""}`}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
        value={fullname}
        errorClass={`footer-error ${errorList.name ? "show" : ""}`}
      />

      <TextField
        type="email"
        name="email"
        required
        label={t("contact.fieldEmailTitle") + "*"}
        // placeholder={t("contact.fieldEmailPlaceholder")}
        inputClass={`footer-input ${errorList.email ? "error" : ""}`}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        errorClass={`footer-error ${errorList.email ? "show" : ""}`}
        // errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
      />

      <TextField
        name="company"
        type="text"
        label={t("contact.fieldOrgTitle")}
        // placeholder={t("contact.fieldOrgPlaceholder")}
        inputClass={`footer-input ${errorList.org ? "error" : ""}`}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
        errorClass={`footer-error${errorList.company ? "show" : ""}`}
      />

      <TextAreaField
        name="message"
        type="text"
        label={t("contact.fieldMsgTitle") + "*"}
        // placeholder={t("contact.fieldMsgPlaceholder")}
        inputClass={`footer-input ${errorList.msg ? "error" : ""}`}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        errorClass={`footer-error ${errorList.msg ? "show" : ""}`}
        row={3}
      />
      <div className="footer-btn-container">
        <button className="footer-button">{t("contact.sendMsg")}</button>
      </div>
    </form>
  );
}
