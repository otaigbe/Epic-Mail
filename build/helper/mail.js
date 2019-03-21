"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* istanbul ignore file */
var Mail =
/*#__PURE__*/
function () {
  function Mail() {
    _classCallCheck(this, Mail);
  }

  _createClass(Mail, null, [{
    key: "mailOptions",

    /**
    * @constructor
    * @param {string} text - The link to be sent to the user's alternate email.
    * @param {integer} to - The destination address.
    * @returns {JSON} - The mailoptions containing sender, receiver, subject, message body
    */
    value: function mailOptions(text, to) {
      return {
        from: 'youremail@gmail.com',
        to: to,
        subject: 'Reset your password',
        html: "<h2>From Epicm@il</h2><em>Reset Your Password With the link below</em><br>".concat(text)
      };
    }
    /**
    * @constructor - This sets some authentication information such as username and password for the account used to send the mail
    */

  }, {
    key: "transportOptions",
    value: function transportOptions() {
      return {
        service: 'gmail',
        auth: {
          user: process.env.MUSER,
          pass: process.env.MPASS
        }
      };
    }
  }]);

  return Mail;
}();

exports.default = Mail;