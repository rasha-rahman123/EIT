import admin from "firebase-admin";

export default async (_, res) => {
 try{
  const token = await _.query.token

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
  const tok = await admin.auth().verifyIdToken(token)
  return res.send(tok)
 }
 catch (err) {
return res.send(err)
 }
  
}