const mongoose = require("mongoose");
const transporter = require("../config/Transporter")

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    tags: {
      type: String,
    },

    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.post("save", async (doc) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: doc.email,
      subject: "File Uploaded At Cloudinary",

      html: `
        <h1>File Uploaded to Cloudinary Successfully</h1>

        <p>Click here to view the uploaded file:</p>

        <a href="${doc.imageUrl}">
           ${doc.imageUrl}
        </a>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
