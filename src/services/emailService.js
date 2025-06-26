const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Puedes cambiarlo según tu proveedor
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAdminWelcomeEmail = async ({ name, email, password }) => {
  await transporter.sendMail({
    from: `"TherApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenido Administrador",
    html: `
      <h3>Hola ${name}</h3>
      <p>Has sido registrado como <strong>administrador</strong>.</p>
      <p><strong>Usuario:</strong> ${email}<br><strong>Contraseña:</strong> ${password}</p>
    `,
  });
};

const sendFacilitadorWelcomeEmail = async ({ name, email, password }) => {
  await transporter.sendMail({
    from: `"TherApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenido Facilitador",
    html: `
      <h3>Hola ${name}</h3>
      <p>Has sido registrado como <strong>facilitador</strong>.</p>
      <p><strong>Usuario:</strong> ${email}<br><strong>Contraseña:</strong> ${password}</p>
    `,
  });
};

const sendParticipantWelcomeEmail = async ({ name, email, password }) => {
  await transporter.sendMail({
    from: `"TherApp" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenido a tu Bitácora Terapéutica",
    html: `
      <h3>Hola ${name}</h3>
      <p>Has sido registrado como <strong>participante</strong> en el programa terapéutico.</p>
      <p><strong>Usuario:</strong> ${email}<br><strong>Contraseña:</strong> ${password}</p>
      <p>Accede a tu espacio de registro personal donde podrás reflexionar y acompañar tu proceso.</p>
    `,
  });
};

module.exports = {
  sendAdminWelcomeEmail,
  sendFacilitadorWelcomeEmail,
  sendParticipantWelcomeEmail,
};
