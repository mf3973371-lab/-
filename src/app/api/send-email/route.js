import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { to, subject, message } = await request.json();

    // إعداد الـ Transporter الخاص بـ Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'appsafaa804@gmail.com', // <-- سنقوم بتغيير هذا للإيميل بتاعك
        pass: 'grea nmxe dqas yubh' // الباسورد اللي إنت لسه جايبه
      }
    });

    // إعداد شكل الإيميل
    const mailOptions = {
      from: '"منصة شفاء الطبية" <appsafaa804@gmail.com>', // اسم المرسل والإيميل
      to: to, // إيميل الشخص اللي رايحله الإشعار (المريض أو الدكتور)
      subject: subject,
      html: `
        <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f8fafc; border-radius: 15px;">
          <h2 style="color: #0ea5e9;">إشعار من منصة شفاء الطبية 🩺</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-top: 20px;">
            <p style="font-size: 16px; color: #334155; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
            هذه الرسالة تم إرسالها آلياً من نظام شفاء. يرجى عدم الرد على هذا البريد.
          </p>
        </div>
      `
    };

    // إرسال الإيميل
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'تم إرسال الإيميل بنجاح' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ message: 'فشل إرسال الإيميل', error: error.message }, { status: 500 });
  }
}
