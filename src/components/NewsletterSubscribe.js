import { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { decode } from "html-entities";
import { useTranslation } from "react-i18next";

const url =
  "https://datatangente.us21.list-manage.com/subscribe/post?u=f09b1088871b5172f97c0f563&amp;id=2b966ad276";

// simplest form (only email)
const NewsletterForm = ({ status, message, onValidated }) => {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    if (status === "success") {
      setEmail("");
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <>
      <div className="container">
        <div className="subscribe-input-form">
          {/* Input */}
          <div className="contact-input-container">
            <input
              className="input-subscribe"
              onChange={(event) => setEmail(event?.target?.value ?? "")}
              type="email"
              placeholder={t("contact.fieldEmailTitle") + " (*)"}
              onKeyUp={(event) => handleInputKeyEvent(event)}
            />
          </div>
          {/* Button */}
          <div className="button-subscribe">
            <span onClick={handleFormSubmit}>
              {t("home.buttons.subscribe")}
            </span>
          </div>
        </div>

        <div>
          {status === "sending" && <div>Sending...</div>}
          {status === "error" || error ? (
            <div
              className="msg-container"
              dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
            />
          ) : null}
          {status === "success" && status !== "error" && !error && (
            <div
              className="thank-you-msg"
              dangerouslySetInnerHTML={{ __html: decode(message) }}
            />
          )}
        </div>
      </div>
    </>
  );
};

// use the render prop and your custom form
const NewsletterSubscribe = () => {
  const { t } = useTranslation();

  return (
    <div className="subscribe-division-wrap">
      <div className="subscribe-title-text">
        <span style={{ fontWeight: 700 }}>
          {t("home.subscribe.subscribe")}&nbsp;
        </span>
        <span style={{ fontWeight: 300 }}>{t("home.subscribe.news")}</span>
      </div>
      <div style={{ color: "#fff", width: "100%" }}>
        <span>{t("home.subscribe.keepUp")}</span>
      </div>

      <MailchimpSubscribe
        url={url}
        render={(props) => {
          const { subscribe, status, message } = props || {};
          return (
            <NewsletterForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          );
        }}
      />
    </div>
  );
};

export default NewsletterSubscribe;
