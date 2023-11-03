import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export class MailSender {
  public constructor(firstName: string, lastName: string, email: string, date: Date, idUser: number) {
    const transporter = this.createTransporter();
    const token = this.defineToken(firstName, lastName, email, date, idUser);
    const mailOptions = this.createMailOption(firstName, lastName, token);
    this.sentMail(transporter, mailOptions);
  }

  public createTransporter() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transporter;
  }

  public defineToken(firstName: string, lastName: string, email: string, date: Date, idUser: number) {
    const token = jwt.sign(
      {
        data: {
          first: firstName,
          last: lastName,
          email: email,
          date: date,
          id: idUser,
        },
      },
      process.env.TOKEN_VERIFICATION as string,
      { expiresIn: '20m' }
    );
    return token;
  }

  public createMailOption(firstName: string, lastName: string, token: any) {
    const mailOptions = {
      from: `${firstName + ' ' + lastName} <${firstName}@gmail.com>`,
      to: 'djordjetestnikolic@gmail.com',
      subject: 'Flight verification',
      text: `Hi ${firstName + ' ' + lastName}! You have recently visited  
           our website and entered your email. 
           Please follow the given link to verify your email 
           http://localhost:3000/verify/${token}  
           Thanks`,
    };
    return mailOptions;
  }

  public sentMail(transporter: any, mailOptions: any) {
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
