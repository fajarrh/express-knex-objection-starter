// import nodemailer from "nodemailer";
// import Google from "./Google";
// import fs from "fs";
// import Mail from "nodemailer/lib/mailer";
// import Handlebars from "handlebars";
// import { default as pth } from "path";
// import Utils from "./Utils";

// export default class Email {
//   private async transporter() {
//     try {
//       const { token } = await Google.accessToken();
//       return nodemailer.createTransport({
//         pool: true,
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//           type: "OAuth2",
//           user: "hajatan.officials@gmail.com",
//           accessToken: String(token),
//         },
//       });
//     } catch (error) {
//       Utils.logError(error, "googleAccessToken");
//       throw error;
//     }
//   }

//   readHtml(path: string, callback) {
//     fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, html);
//       }
//     });
//   }

//   static sendTemplate(options: Mail.Options & { data?: any; path: string }) {
//     const email = new Email();
//     const { data, path, ...opt } = options;

//     const source = pth.join(__dirname, "/../resources/", path);
//     email.readHtml(source, (err, html) => {
//       if (err) {
//         throw err;
//       }

//       const compile = Handlebars.compile(html);
//       const template = compile(data);
//       opt.from = "hajatan.officials@gmail.com";
//       opt.html = template;

//       email
//         .transporter()
//         .then((transporter) => {
//           transporter.sendMail(opt, (err, info) => {
//             if (err) {
//               Utils.logError(err, "sendMail");
//               throw err;
//             }
//             console.log("mail response: ", info.response);
//           });
//         })
//         .catch((e) => {
//           Utils.logError(e, "emailTransporter");
//           console.log("error transporter:", e);
//         });
//     });
//   }

//   static sendMail(options: Mail.Options) {
//     const email = new Email();
//     options.from = "hajatan.officials@gmail.com";
//     email
//       .transporter()
//       .then((transporter) => {
//         transporter.sendMail(options, (err, info) => {
//           if (err) {
//             Utils.logError(err, "sendMail");
//             throw err;
//           }
//           console.log("mail response: ", info.response);
//         });
//       })
//       .catch((e) => {
//         Utils.logError(e, "emailTransporter");
//         console.log("error transporter:", e);
//       });
//   }
// }
