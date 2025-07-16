module.exports = {
  subject: 'Reset your password for PicksOffice',
  text: `We heard that you lost your password. Sorry about that!

But don't worry! You can use the following link to reset your password:
http://localhost:3000/reset-password?code=<%= token %>

Thanks,
The PicksOffice Team`,
  html: `<p>We heard that you lost your password. Sorry about that!</p>
<p>But don't worry! You can use the following link to reset your password:</p>
<p><a href="http://localhost:3000/reset-password?code=<%= token %>">Reset Password</a></p>
<p>Thanks,</p>
<p>The PicksOffice Team</p>`,
};