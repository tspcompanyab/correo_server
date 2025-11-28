import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());
import dotenv from "dotenv";

dotenv.config(); // <-- Cargar variables .env
// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Ruta POST para enviar correo
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const result = await resend.emails.send({
      from: "info@mtg-cleaningservices.com",  // Puedes poner otro dominio cuando lo verifiques
      to: "tspcompanyab@gmail.com",
      subject: "Nuevo mensaje desde la web",
      html: `
        <h2>Nuevo mensaje desde tu página web</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b></p>
        <p>${message}</p>
      `,
    });

    console.log(result);

    return res.json({ success: true });

  } catch (error) {
    console.error("Resend Error:", error);
    return res.json({ success: false, error: error.message });
  }
});

// Render autodefine el puerto usando process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en " + PORT));
