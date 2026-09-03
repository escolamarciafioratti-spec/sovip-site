import { IncomingForm } from "formidable";
import fs from "fs";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "jpg", "jpeg", "png"]);

function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false,
      maxFileSize: MAX_FILE_SIZE,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { ok: false, message: "Método não permitido." });
  }

  try {
    const { fields, files } = await parseForm(req);

    const name = String(first(fields.nome ?? fields.name) ?? "").trim();
    const email = String(first(fields.email) ?? "").trim();
    const phone = String(first(fields.telefone ?? fields.phone) ?? "").trim();
    const message = String(first(fields.mensagem ?? fields.message) ?? "").trim();

    if (!name || !email) {
      return sendJson(res, 422, {
        ok: false,
        message: "Informe seu nome e e-mail.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendJson(res, 422, {
        ok: false,
        message: "Informe um e-mail válido.",
      });
    }

    let attachment = null;
    const uploaded = first(files.arquivo ?? files.curriculo);

    if (uploaded) {
      const file = uploaded;
      const originalName = file.originalFilename || file.newFilename || "arquivo";
      const extension = originalName.split(".").pop().toLowerCase();

      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return sendJson(res, 422, {
          ok: false,
          message: "Formato de arquivo não permitido.",
        });
      }

      if ((file.size || 0) > MAX_FILE_SIZE) {
        return sendJson(res, 422, {
          ok: false,
          message: "O arquivo ultrapassa o limite de 10 MB.",
        });
      }

      attachment = {
        filename: originalName.replace(/[^a-zA-Z0-9._-]/g, "_"),
        path: file.filepath,
      };
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      SOVIP_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SOVIP_EMAIL) {
      console.error("Variáveis SMTP não configuradas.");
      return sendJson(res, 500, {
        ok: false,
        message:
          "O servidor de e-mail ainda não está configurado. Configure as variáveis SMTP na Vercel.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: Number(SMTP_PORT || 587) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const text = [
      "Novo contato recebido pelo site Sovip Servicces.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      "",
      "Mensagem:",
      message || "(sem mensagem)",
    ].join("\n");

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SOVIP_EMAIL,
      replyTo: email,
      subject: `Novo contato pelo site Sovip — ${name}`,
      text,
      attachments: attachment ? [attachment] : [],
    });

    return sendJson(res, 200, {
      ok: true,
      message: "Mensagem enviada com sucesso. A Sovip recebeu seus dados.",
    });
  } catch (error) {
    console.error("Erro no envio:", error);
    return sendJson(res, 500, {
      ok: false,
      message: "Não foi possível enviar agora. Tente novamente em alguns instantes.",
    });
  }
}
