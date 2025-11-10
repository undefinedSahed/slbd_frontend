import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { user_name, user_email, phone, message } = await req.json();

    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${user_name}" <${user_email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from Superlighting BD Website - ${user_name}`,
      text: `
        Name: ${user_name}
        Email: ${user_email}
        Phone: ${phone}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
