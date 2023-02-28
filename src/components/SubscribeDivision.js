import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import CircularProgressLoading from "./Loading";
import SimpleDialog from "./SimpleDialog";
import { TextField, NumericField } from "../components/Fields";
import emailjs from "emailjs-com";
import { useTranslation, Trans } from "react-i18next";

function SubsDivision(props) {
  const { t } = useTranslation();

  const defaultVal = {
    name: "",
    email: "",
    org: "",
  };
  const [dialog, setDialog] = useState("");
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(defaultVal);
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState({});
  const required = ["name", "email"];
  const emailRegx = // email reg expression
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // const handleChangeInput = (type, event) => {
  const handleChangeInput = (event, val) => {
    // setErrorList({...errorList, [type]: false});
    // setFormInfo({...formInfo, [type]: event.target.value});
    setErrorList({ ...errorList, [event.target.name]: false });
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
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
    const templateId = "template_ivtlaly";
    const info = {
      from_name: formInfo.name,
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
    <Grid id="subscribe-division" container className="subscribe-division-wrap">
      <div className="container max-width--">
        <Typography variant="h4" className="subscribe-title-text">
          <span style={{ fontWeight: 700 }}>
            {t("home.subscribe.subscribe")}&nbsp;
          </span>
          <span style={{ fontWeight: 300 }}>{t("home.subscribe.news")}</span>
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ color: "#fff", width: "100%" }}
          className="subscribe-title-text-body">
          <span>{t("home.subscribe.keepUp")}</span>
        </Typography>
        <Grid container className="subscribe-input-form">
          {/* <input className="input-subscribe" placeholder="Nombre" />
                    <input className="input-subscribe" placeholder="Email" />
                    <input className="input-subscribe" placeholder="Empresa" /> */}

          <TextField
            name="name"
            type="text"
            required
            // label={t('contact.fieldNameTitle') + "(*)"}
            placeholder={t("contact.fieldNameTitle") + " (*)"}
            inputClass={`input-subscribe ${errorList.name ? "error" : ""}`}
            onChange={handleChangeInput}
            value={formInfo.name}
            errorClass={`error-msg ${errorList.name ? "show" : ""}`}
          />
          <TextField
            type="email"
            name="email"
            required
            // label={t('contact.fieldEmailTitle') + "(*)"}
            placeholder={t("contact.fieldEmailTitle") + " (*)"}
            inputClass={`input-subscribe ${errorList.email ? "error" : ""}`}
            onChange={handleChangeInput}
            value={formInfo.email}
            errorClass={`error-msg ${errorList.email ? "show" : ""}`}
            errorText={"INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com"}
          />
          <TextField
            name="org"
            type="text"
            // label={t('contact.fieldOrgTitle')}
            placeholder={t("contact.fieldOrgTitle")}
            inputClass={`input-subscribe ${errorList.org ? "error" : ""}`}
            onChange={handleChangeInput}
            value={formInfo.org}
            errorClass={`error-msg ${errorList.org ? "show" : ""}`}
          />

          {/* <div className="contact-input-container" >
                        <input 
                            name="name" 
                            type="text" required 
                            className={"input-subscribe "+(errorList.name && 'error' || '')} 
                            placeholder="Nombre (*)" 
                            onChange={handleChangeInput.bind(this, 'name')} 
                            value={formInfo.name}
                        />
                        <span className={"error-msg-subs "+(errorList.name && 'show' || '')}>ESTE CAMPO ES REQUERIDO</span>
                    </div>
                    <div className="contact-input-container">
                        <input
                            type="email"
                            name="email"
                            required 
                            className={"input-subscribe "+(errorList.email && 'error' || '')}
                            placeholder="Email (*)" 
                            onChange={handleChangeInput.bind(this, 'email')}
                            value={formInfo.email}
                        />
                        <span className={"error-msg-subs "+(errorList.email && 'show' || '')}>INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com</span>
                    </div>
                    <div className="contact-input-container">
                        <input 
                            type="text" 
                            className={"input-subscribe"} 
                            placeholder="Empresa" 
                            name="organization" 
                            onChange={handleChangeInput.bind(this, 'org')}
                            value={formInfo.org}
                        />
                    </div> */}
          {loading ? (
            <div
              className="button-subscribe-loading"
              style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgressLoading />
            </div>
          ) : (
            <div className="button-subscribe" onClick={handleSubmitForm}>
              <span>{t("home.buttons.subscribe")}</span>
            </div>
          )}
        </Grid>
        {dialog === "success" && (
          <SimpleDialog
            open={true}
            title="¡Éxito!"
            response="Se ha suscrito correctamente."
            setDialog={setDialog}
            toggleDialog={toggleDialog}
          />
        )}
        {dialog === "failure" && (
          <SimpleDialog
            open={true}
            title="Oops..."
            response="La suscripción no pudo ser completada correctamente, favor intentar nuevamente."
            setDialog={setDialog}
            toggleDialog={toggleDialog}
          />
        )}
      </div>
    </Grid>
  );
}

export default SubsDivision;
