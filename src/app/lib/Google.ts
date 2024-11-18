import config from "@config/google";
// import firebase from "@config/firebase";
// import { google } from "googleapis";
// import { Message } from "firebase-admin/lib/messaging/messaging-api";

export default class Google {
  // static accessToken() {
  //   const oauth2Client = new google.auth.OAuth2(
  //     config.web.oauth.clientId,
  //     config.web.oauth.clientSecret,
  //     config.web.oauth.redirectUri
  //   );
  //   oauth2Client.setCredentials({
  //     refresh_token: config.web.oauth.refreshToken,
  //   });
  //   return oauth2Client.getAccessToken();
  // }
  // static sendNotif(message: Message) {
  //   firebase
  //     .messaging()
  //     .send(message)
  //     .then((value) => {
  //       console.log("send notif:", value);
  //     })
  //     .catch((e) => {
  //       console.log("send notif error:", e);
  //     });
  // }
}
