/* istanbul ignore file */
export default class Mail {
  /**
 * @constructor
 * @param {string} text - The link to be sent to the user's alternate email.
 * @param {integer} to - The destination address.
 * @returns {JSON} - The mailoptions containing sender, receiver, subject, message body
 */
  static mailOptions(text, to) {
    return {
      from: 'youremail@gmail.com',
      to,
      subject: 'Reset your password',
      html: `<h2>From Epicm@il</h2><em>Reset Your Password With the link below</em><br>${text}`,
    };
  }

  /**
 * @constructor - This sets some authentication information such as username and password for the account used to send the mail
 */
  static transportOptions() {
    return {
      service: 'gmail',
      auth: {
        user: process.env.MUSER,
        pass: process.env.MPASS,
      },
    };
  }
}
