const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // 1. Generate a temporary Ethereal test account automatically
        const testAccount = await nodemailer.createTestAccount();

        // 2. Create the transporter using the temporary account credentials
        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // 3. Define the email options
        const message = {
            from: '"College Portal Admin" <admin@collegeportal.com>',
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html || `<p>${options.message}</p>`,
        };

        // 4. Send the email
        const info = await transporter.sendMail(message);

        console.log('Message sent: %s', info.messageId);
        
        // 5. Log the preview URL so you can click it in the terminal to view the fake email
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;