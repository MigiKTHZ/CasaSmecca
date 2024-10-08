import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "lx64.hoststar.hosting",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

export interface MailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async (mailOptions: MailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: mailOptions.to, // list of receivers
            subject: mailOptions.subject, // Subject line
            text: mailOptions.text, // plain text body (optional)
            html: mailOptions.html, // html body (optional)
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred while sending email:', error);
    }
};