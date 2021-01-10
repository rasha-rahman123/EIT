import admin from "firebase-admin";



export const verifyIdToken = (token) => { 
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
  }
  return admin.auth().verifyIdToken(token).catch(err => {
    throw err;
  })
}

export default admin;
