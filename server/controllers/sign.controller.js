const { ObjectId } = require("mongodb");

const User = require("../models/User");
const Link = require("../models/Link");
const mail = require("../models/email");

const SERVER = "http://localhost:8000";
const EMAIL_FROM_ADDRESS = "eCommerce <NoReply>";
const EMAIL_SUBJECT = "Registration Activation";
const EMAIL_CONTENT1 =
  "Dear User,\r\n\r\nPlease click the below link to activate your account!\r\n\r\n";
const EMAIL_CONTENT2 = "\r\n\r\nBest regards,\r\nGroup 13";

// Register Function
module.exports.register = async (req, res) => {
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  email = req.body.email;
  password = req.body.password;

  // If the input email exists
  User.checkEmailExists(email, (err, result) => {
    if (err) {
      console.log(`${err}`);
      res.status(500).json({ error: err });
      return;
    }

    if (result) {
      // The email address already exists
      res.send("Sorry! This email address has been used.");
      return;
    }
    // If the input email has a pending activation
    Link.findRegisterLinkByEmail(email, (err, result) => {
      if (err) {
        console.log(`${err}`);
        res.status(500).json({ error: err });
        return;
      }

      // If exists
      if (result != null) {
        res.send(
          "Sorry! There's already an activation pending for this email address. Please check your inbox!"
        );
        return;
      }
      // Create a link document in DB
      var id = ObjectId();
      var activatation = SERVER + "/register/" + id;
      // Send an register activation link to the email
      var message = {
        from: EMAIL_FROM_ADDRESS,
        to: `${firstname} ${lastname} <${email}>`,
        subject: EMAIL_SUBJECT,
        text: EMAIL_CONTENT1 + activatation + EMAIL_CONTENT2,
      };
      mail.send(message, (err, result) => {
        if (err) {
          console.log(`${err}`);
          res.status(500).json({ error: err });
          return;
        }
        console.log("Send New Activation Email: ");
        console.log(result);

        Link.createLink(
          {
            _id: id,
            email: email,
            password: password,
            type: "register",
            firstname: firstname,
            lastname: lastname,
          },
          (err, result) => {
            if (err) {
              console.log(`${err}`);
              res.status(500).json({ error: err });
              return;
            }
            console.log("Create New Link Document: ");
            console.log(result);
            res.send(
              "The activation link has been sent. Please check your inbox to proceed!"
            );
          }
        );
      });
    });
  });
};
