const admin = require("firebase-admin");

let db = null;

function initFirebase() {
  if (admin.apps.length) {
    db = admin.firestore();
    return db;
  }

  const {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
  } = process.env;

  if (
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY
  ) {
    console.warn(
      "⚠️ Firebase credentials are missing. Set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your .env file. " +
        "The /api/contact endpoint will not be able to save messages until " +
        "this is configured."
    );

    return null;
  }

  admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY,
  }),
});

  db = admin.firestore();

  return db;
}

module.exports = {
  initFirebase,
  getDb: () => db,
};