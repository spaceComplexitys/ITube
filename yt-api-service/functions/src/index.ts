import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

initializeApp();

const firestore = getFirestore();

export const createUser = functions.identity.beforeUserCreated(
  (UserRecord) => {
    if (UserRecord && UserRecord.data) {
      const userInfo = {
        uid: UserRecord.data.uid || "",
        email: UserRecord.data.email || "",
        photoUrl: UserRecord.data.photoURL || "",
      };

      // Store in collection "users", in the document with the user's UID,
      // and use all of 'userInfo' data to store
      firestore.collection("users").doc(userInfo.uid).set(userInfo);
      logger.info(`User Created: ${JSON.stringify(userInfo)}`);
    } else {
      logger.error("UserRecord data is undefined");
    }
    return;
  }
);

// Ensure there's a newline at the end of the file.
