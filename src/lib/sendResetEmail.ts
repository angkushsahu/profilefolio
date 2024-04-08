import "server-only";

import { createTransport } from "nodemailer";
import { env } from "~/env";

export interface SendResetEmailArgs {
   email: string;
   resetToken: string;
   origin: string;
}

export async function sendResetEmail({ email, origin, resetToken }: SendResetEmailArgs) {
   const brandName = "PROFILEFOLIO";

   try {
      const transporter = createTransport({
         service: env.MAIL_SERVICE,
         auth: {
            user: env.MAIL,
            pass: env.MAIL_PASS,
         },
      });

      // eslint-disable-next-line
      const text: string = `
        WE GOT YOUR REQUEST TO RESET YOUR PASSWORD

        CLICK ON THE LINK BELOW WHICH WILL REDIRECT TO A PAGE WHERE YOU CAN SAFELY RESET YOUR PASSWORD

        LINK - ${origin}/auth/reset-password/${resetToken}

        THANKS.
        ${brandName}
        `;

      const mailOptions = {
         from: env.MAIL,
         to: email,
         subject: `${brandName} RESET PASSWORD`,
         text,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Mail sent successfully" };
   } catch (_) {
      return { success: false, message: "Unable to send e-mail" };
   }
}
