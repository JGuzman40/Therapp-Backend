// utils/sendSessionNotificationEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Enviar notificación de sesión al participante
 * @param {Object} options - datos de la sesión
 * @param {string} options.to - correo del participante
 * @param {string} options.participantName - nombre del participante
 * @param {string} options.sessionName - nombre de la sesión
 * @param {string[]} options.dates - array de fechas programadas
 * @param {string} options.time - hora de la sesión (HH:MM:SS)
 * @param {string} options.meetingLink - enlace de reunión
 * @param {string} options.sessionType - "individual" o "grupal"
 * @param {string} [options.message] - mensaje adicional
 */
const sendSessionNotificationEmail = async ({
  to,
  participantName,
  sessionName,
  dates,
  time,
  meetingLink,
  sessionType,
  message = "",
}) => {
  const formattedDates = dates.join(", ");

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject: `📅 Nueva sesión ${sessionType === "grupal" ? "grupal" : "individual"}: ${sessionName}`,
    html: `
      <h2>Hola ${participantName},</h2>
      <p>Has sido programado(a) para una <strong>sesión ${sessionType}</strong> dentro del evento <strong>${sessionName}</strong>.</p>
      <p><strong>📅 Fechas:</strong> ${formattedDates}</p>
      <p><strong>⏰ Hora:</strong> ${time}</p>
      <p><strong>🔗 Enlace de reunión:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
      ${message ? `<p><strong>📝 Mensaje:</strong> ${message}</p>` : ""}
      <br>
      <p>Nos vemos pronto,</p>
      <p><em>Equipo Therapp</em></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendSessionNotificationEmail;
