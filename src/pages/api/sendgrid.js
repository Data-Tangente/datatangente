const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
  Name: ${body.name}\r\n
  Email: ${body.email}\r\n
<<<<<<< HEAD
  Company: ${body.company}\r\n
  Position: ${body.position}\r\n
  Phone number: ${body.phoneNumber}\r\n
  Heard of us: ${body.hearOfUs}\r\n
=======
  Phone number: ${body.phoneNumber}\r\n
>>>>>>> a8c6a6c7f0f273f5a56f80c206430400b3033bbb
  Message: ${body.message}
  `;

  const data = {
    to: "info@datatangente.com",
    from: "info@datatangente.com",
    subject: "New message",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };
  await mail.send(data);

  res.status(200).json({ status: "Ok" });
};
