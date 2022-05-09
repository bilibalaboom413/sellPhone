const { ObjectId } = require("mongodb");

const User = require("../models/User");
const Link = require("../models/Link");
const mail = require("../models/email");

const WEBSITE = "http://localhost:3000";
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
      var activatation = WEBSITE + "/register/" + id;
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

// Activation Function
module.exports.activate = async (req, res) => {
  id = req.params.id;

  // Check if the register activation id exists in Link
  Link.checkRegisterIdExists(id, (err, result) => {
    if (err) {
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
