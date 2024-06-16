const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  'type': 'service_account',
  'project_id': process.env.FIREBASE_PROJECT_ID,
  'private_key': process.env.FIREBASE_PRIVATE_KEY,
  'client_email': process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
  
const db = admin.firestore();


module.exports = db;