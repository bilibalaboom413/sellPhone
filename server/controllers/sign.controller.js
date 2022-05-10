const { ObjectId } = require("mongodb");

const User = require("../models/User");
const Link = require("../models/Link");
const mail = require("../models/email");

const WEBSITE = "http://localhost:3000";
const EMAIL_FROM_ADDRESS = "eCommerce <NoReply>";
const REGISTER_EMAIL = {
  subject: "Registration Activation",
  content:
    "Dear User,\r\n\r\nPlease click the below link to activate your account!\r\n\r\n",
};
const RESET_EMAIL = {
  subject: "Password Reset",
  content:
    "Dear User,\r\n\r\nPlease click the below link to reset your password!\r\n\r\n",
};
const EMAIL_ENDING = "\r\n\r\nBest regards,\r\nGroup 13";

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
      var activatation = WEBSITE + "/register/" + id;
      // Send an register activation link to the email
      var message = {
        from: EMAIL_FROM_ADDRESS,
        to: `${firstname} ${lastname} <${email}>`,
        subject: REGISTER_EMAIL.subject,
        text: REGISTER_EMAIL.content + activatation + EMAIL_ENDING,
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

// Activation Function
module.exports.activate = async (req, res) => {
  id = req.params.id;

  // Check if the register activation id exists in Link
  Link.checkRegisterIdExists(id, (err, result) => {
    if (err) {
      // res.send("Sorry! Page Not Found");
      console.log(`${err}`);
      res.status(500).json({ error: err });
      return;
    }

    // If the link doesn't exist
    if (!result) {
      res.send("Sorry! Page Not Found");
      return;
    }

    Link.findRegisterLinkById(id, (err, result) => {
      if (err) {
        console.log(`${err}`);
        res.status(500).json({ error: err });
        return;
      }

      let data = {
        _id: ObjectId(),
        firstname: result["firstname"],
        lastname: result["lastname"],
        email: result["email"],
        password: result["password"],
      };

      // Create the user in the userlist database
      User.createUser(data, (err, result) => {
        if (err) {
          console.log(`${err}`);
          res.status(500).json({ error: err });
          return;
        }

        console.log("Create New User Document: ");
        console.log(result);
        res.send("Activated! You can now sign in using your email address.");

        // Remove the link document in links database
        Link.deleteRegisterLinkById(id, (err, result) => {
          if (err) {
            console.log(`${err}`);
            // res.status(500).json({ error: err });
            return;
          }

          console.log(`Delete Link Document ${id}`);
        });
      });
    });
  });
};

// Password Reset Function
module.exports.reset = async (req, res) => {
  email = req.body.email;

  // If the input email exists
  User.checkEmailExists(email, (err, result) => {
    if (err) {
      console.log(`${err}`);
      res.status(500).json({ error: err });
      return;
    }

    if (!result) {
      // The email address already exists
      res.send("Sorry! This email address has not been used.");
      return;
    }
    // If the input email has a pending reset
    Link.findResetLinkByEmail(email, (err, result) => {
      if (err) {
        console.log(`${err}`);
        res.status(500).json({ error: err });
        return;
      }

      // If exists
      if (result != null) {
        res.send(
          "Sorry! There's already a reset pending for this email address. Please check your inbox!"
        );
        return;
      }

      // Create a link document in DB
      var id = ObjectId();
      var reset_link = WEBSITE + "/reset/" + id;
      // Send a reset link to the email
      var message = {
        from: EMAIL_FROM_ADDRESS,
        to: `<${email}>`,
        subject: RESET_EMAIL.subject,
        text: RESET_EMAIL.content + reset_link + EMAIL_ENDING,
      };
      mail.send(message, (err, result) => {
        if (err) {
          console.log(`${err}`);
          res.status(500).json({ error: err });
          return;
        }
        console.log("Send New Password Reset Email: ");
        console.log(result);

        Link.createLink(
          {
            _id: id,
            email: email,
            type: "reset",
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
              "The reset link has been sent. Please check your inbox to proceed!"
            );
          }
        );
      });
    });
  });
};

// Password Reset Link Function
module.exports.reset2 = async (req, res) => {
  id = req.params.id;

  // Check if the reset request id exists in Link
  Link.checkResetIdExists(id, (err, result) => {
    if (err) {
      // res.send("Sorry! Page Not Found");
      console.log(`${err}`);
      res.status(500).json({ error: err });
      return;
    }

    // If the link doesn't exist
    if (!result) {
      res.send("Sorry! Page Not Found");
      return;
    }

    res.send("Reset Password");
  });
};

module.exports.resetpassword = async (req, res) => {
  id = req.body.id;
  password = req.body.password;

  Link.findResetLinkById(id, (err, result) => {
    if (err) {
      console.log(`${err}`);
      res.status(500).json({ error: err });
      return;
    }

    // Change Password
    var data = {
      email: result["email"],
      password: password,
    };

    User.changePassword(data, (err, result) => {
      if (err) {
        console.log(`${err}`);
        res.status(500).json({ error: err });
        return;
      }

      console.log("Change User's Password: ");
      console.log(result);

      // Remove the link document in links database
      Link.deleteResetLinkById(id, (err, result) => {
        if (err) {
          console.log(`${err}`);
          // res.status(500).json({ error: err });
          return;
        }

        console.log(`Delete Link Document ${id}`);
      });

      res.send("Successed! You can now sign in using your new password.");
    });
  });
};
