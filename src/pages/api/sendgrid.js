const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
  Name: ${body.name}\r\n
  Email: ${body.email}\r\n
  Phone number: ${body.phoneNumber}\r\n
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
