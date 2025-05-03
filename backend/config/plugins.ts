export default ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'emmanuelle.abshire19@ethereal.email',
            pass: '7fefuPZUm2TMPg47yd',
          },
          secure: false,
          debug: true, // Show debug output
          logger: true, // Log information about the mail request
          tls: {
            rejectUnauthorized: false // Accepts self-signed certificates
          }
        },
        settings: {
          defaultFrom: 'noreply@picksoffice.com',
          defaultReplyTo: 'noreply@picksoffice.com',
          testPath: 'test'
        },
      },
    },
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
        forgotPassword: {
          from: 'noreply@picksoffice.com',
          replyTo: 'noreply@picksoffice.com',
          emailTemplate: 'reset-password',
          baseUrl: 'http://localhost:3000'
        },
        providers: {
          // Diese Werte müssen mit deinen eigenen Client-IDs und Secrets ersetzt werden
          // Für den Test werden Beispielwerte verwendet
          google: {
            enabled: true,
            icon: 'google',
            key: env('GOOGLE_CLIENT_ID', 'placeholder-client-id'),
            secret: env('GOOGLE_CLIENT_SECRET', 'placeholder-client-secret'),
            callback: '/api/connect/google/callback',
            scope: ['email', 'profile'],
          },
          apple: {
            enabled: true,
            icon: 'apple',
            key: env('APPLE_CLIENT_ID', 'placeholder-client-id'),
            secret: env('APPLE_CLIENT_SECRET', 'placeholder-client-secret'),
            callback: '/api/connect/apple/callback',
            scope: ['name', 'email'],
          },
          twitter: {
            enabled: true,
            icon: 'twitter',
            key: env('TWITTER_CLIENT_ID', 'placeholder-client-id'),
            secret: env('TWITTER_CLIENT_SECRET', 'placeholder-client-secret'),
            callback: '/api/connect/twitter/callback',
          },
        },
      },
    },
  });