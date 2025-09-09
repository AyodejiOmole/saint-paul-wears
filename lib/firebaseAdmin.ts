import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
  });
} else {
  app = getApps()[0]!;
}

export const rtdb = getDatabase(app);
