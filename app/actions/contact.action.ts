"use server";

import { formSchema } from "@/components/header/custom/form-schema";
import { parseWithZod } from "@conform-to/zod";
import sgMail from "@sendgrid/mail";

export async function sendContact(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: formSchema });

  if (submission.status === "error") {
    console.log(submission.error);
    return submission.reply();
  }

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("Sendgrid API key not found");
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  const msg = {
    to: "alex@alexshiresroth.com",
    from: "alexroth96@gmail.com",
    subject: "Client Contact Form Submission",
    text: "and easy to do anywhere, even with Node.js",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Request</title>
    <style>
        body {
            font-family:'Cormorant Garamond', 'Garamond', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .email-container {
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        .header {
            background-color: #fefefe;
            padding: 10px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .header img {
            max-width: 150px;
            margin: 10px 0;
        }
        .header h1 {
            color: #ecf0f1;
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #2c3e50;
            border-bottom: 2px solid #e74c3c;
            padding-bottom: 5px;
            margin-bottom: 20px;
        }
        .content p {
            margin: 10px 0;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://images.ctfassets.net/9kcg7kh97ei0/7KhQHQxy5C6zS0miG8QMhj/6f10770da18c804f43beb7d9eee46534/Black_s394t0.png" alt="Company Logo">
            <h1>Contact Request</h1>
        </div>
        <div class="content">
            <h2>New Contact Request Details</h2>
            <p><strong>Name:</strong> ${submission.payload.firstName} ${
      submission.payload.lastName
    }</p>
            <p><strong>Email:</strong> ${submission.payload.email}</p>
            <p><strong>Phone:</strong> ${submission.payload.phone}</p>
            <p><strong>Message:</strong> ${submission.payload.message}</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Italiano Bros Enterprise. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  };

  return await sgMail
    .send(msg)
    .then(() => {
      return submission.reply();
    })
    .catch((error) => {
      return submission.reply(error);
    });
}
