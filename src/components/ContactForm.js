import { useState } from "react";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Send");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let isValidForm = handleValidation();

  //   if (isValidForm) {
  //     setButtonText("Sending");
  //     const res = await fetch("/api/sendgrid", {
  //       body: JSON.stringify({
  //         email,
  //         fullname,
  //         subject,
  //         message,
  //       }),
  //       // headers: {
  //       //   "Content-Type": "application/json",
  //       // },
  //       method: "POST",
  //     });
  //     const { error } = await res.json();
  //     if (error) {
  //       // console.log(error);
  //       setShowSuccessMessage(false);
  //       setShowFailureMessage(true);
  //       setButtonText("Send");
  //       return;
  //     }
  //     setShowSuccessMessage(true);
  //     setShowFailureMessage(false);
  //     setButtonText("Send");
  //   }
  //   console.log(fullname, email, subject, message);
  // };

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
    console.log(formData);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <h1>Send a message</h1>

      <label htmlFor="fullname">
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
      />

      <label htmlFor="email">
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

      <div className="flex flex-row items-center justify-start">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
