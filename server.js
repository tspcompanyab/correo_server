import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Web Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "Nuevo mensaje desde la web",
      html: `
        <b>Nombre:</b> ${name}<br>
        <b>Email:</b> ${email}<br>
        <b>Mensaje:</b> ${message}
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
