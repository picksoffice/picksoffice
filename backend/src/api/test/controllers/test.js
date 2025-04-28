'use strict';

module.exports = {
  async sendTestEmail(ctx) {
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'test@example.com',
        from: 'no-reply@picksoffice.com',
        subject: 'Test Email from Strapi',
        text: 'Dies ist eine Test-E-Mail.',
      });
      ctx.body = { message: 'E-Mail gesendet' };
    } catch (error) {
      ctx.body = { error: error.message };
    }
  },
};