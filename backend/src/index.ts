import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Vollständiger Override der Passwort-Email-Funktion
    const userService = strapi.plugins['users-permissions'].services.user;
    
    // Die Original-Funktion überschreiben
    const originalSendPasswordEmail = userService.sendPasswordEmail;
    
    userService.sendPasswordEmail = async (email: string, resetToken: string) => {
      try {
        // Vollständige URL erstellen
        const resetPasswordURL = `http://localhost:3000/reset-password?code=${resetToken}`;
        
        // E-Mail direkt mit dem nodemailer-Provider senden (Umgehung der Template-Funktionalität)
        const emailOptions = {
          to: email,
          from: strapi.config.get('plugin.email.settings.defaultFrom') || 'noreply@picksoffice.com',
          replyTo: strapi.config.get('plugin.email.settings.defaultReplyTo') || 'noreply@picksoffice.com',
          subject: 'Reset your password for PicksOffice',
          text: `We heard that you lost your password. Sorry about that!

But don't worry! You can use the following link to reset your password:
${resetPasswordURL}

Thanks,
The PicksOffice Team`,
          html: `<p>We heard that you lost your password. Sorry about that!</p>
<p>But don't worry! You can use the following link to reset your password:</p>
<p><a href="${resetPasswordURL}">Reset Password</a></p>
<p>Thanks,</p>
<p>The PicksOffice Team</p>`
        };
        
        // E-Mail direkt über den Email-Provider senden
        await strapi.plugin('email').service('email').send(emailOptions);
        
        // Log der erfolgreichen E-Mail mit vollständigem Link
        console.log('Password reset email sent to', email);
        console.log('Reset URL:', resetPasswordURL);
      } catch (error) {
        console.error('Failed to send password reset email:', error);
      }
    };
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
