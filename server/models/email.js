const email = require("emailjs");

const client = email.server.connect({
	host: "mail.usyd.edu.au",
});

module.exports = client;
