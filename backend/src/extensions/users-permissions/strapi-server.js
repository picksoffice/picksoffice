module.exports = (plugin) => {
  // Extend the JWT callback to use httpOnly cookies
  plugin.controllers.auth.callback = async (ctx) => {
    const provider = ctx.params.provider || 'local';
    const { identifier, password } = ctx.request.body;

    try {
      if (provider === 'local') {
        if (!identifier || !password) {
          return ctx.badRequest('Please provide both identifier and password');
        }

        // Call the original callback
        const { user, jwt } = await strapi.plugins['users-permissions'].services.providers.connect(
          provider,
          { identifier, password }
        );

        // Set httpOnly cookie
        ctx.cookies.set('jwt', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          domain: process.env.NODE_ENV === 'production' ? '.picksoffice.com' : undefined,
        });

        // Return user data without JWT in response body
        return ctx.send({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            confirmed: user.confirmed,
            blocked: user.blocked,
            role: user.role,
          },
        });
      } else {
        // Handle OAuth providers
        const { jwt, user } = await strapi.plugins['users-permissions'].services.providers.connect(
          provider,
          ctx.query
        );

        // Set httpOnly cookie for OAuth
        ctx.cookies.set('jwt', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          domain: process.env.NODE_ENV === 'production' ? '.picksoffice.com' : undefined,
        });

        // Redirect to frontend success page
        ctx.redirect(`${process.env.FRONTEND_URL}/auth/success`);
      }
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  };

  // Add logout endpoint to clear cookie
  plugin.controllers.auth.logout = async (ctx) => {
    ctx.cookies.set('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      domain: process.env.NODE_ENV === 'production' ? '.picksoffice.com' : undefined,
    });

    return ctx.send({ message: 'Logged out successfully' });
  };

  // Add route for logout
  plugin.routes['content-api'].routes.push({
    method: 'POST',
    path: '/auth/logout',
    handler: 'auth.logout',
    config: {
      policies: [],
      prefix: '',
    },
  });

  // Extend register to use httpOnly cookies
  const originalRegister = plugin.controllers.auth.register;
  plugin.controllers.auth.register = async (ctx) => {
    try {
      // Call original register
      await originalRegister(ctx);
      
      // Get the response data
      const responseData = ctx.response.body;
      
      if (responseData && responseData.jwt) {
        // Set httpOnly cookie
        ctx.cookies.set('jwt', responseData.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
          domain: process.env.NODE_ENV === 'production' ? '.picksoffice.com' : undefined,
        });

        // Remove JWT from response body
        delete responseData.jwt;
        ctx.response.body = responseData;
      }
    } catch (error) {
      ctx.badRequest(error.message);
    }
  };

  return plugin;
};