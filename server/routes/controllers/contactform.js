const config = require("../../config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_API_KEY);

exports.sendFormMessage = function (req, res) {
  const { username, email, company, position, msg } = req.body;

  if (!username || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide your name and email!" },
      ],
    });
  }

  // if (!msg) {
  //   return res
  //     .status(422)
  //     .send({
  //       errors: [
  //         {
  //           title: "Data missing!",
  //           detail: "Provide your questions or requests!",
  //         },
  //       ],
  //     });
  // }

  const sendMsg = {
    to: "support@aeru.me",
    from: email,
    subject: "[" + username + " 様]から以下の問い合わせがきました",
    text:
      "社名：" +
      company +
      "\n\n" +
      "役職：" +
      position +
      "\n\n" +
      "氏名：" +
      username +
      "\n\n" +
      "利用用途：" +
      msg +
      "\n\n",
  };
  sgMail.send(sendMsg);

  return res.json({ Sent: true });
};
