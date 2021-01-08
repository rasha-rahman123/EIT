import admin from '../../firebase-admin';


export default async (_, res) => {
    const uid = await _.query.uid
  

    admin.auth().createCustomToken(uid, {
        // Add a custom claim indicating an expiration time of 30 days.
        expiresAt: Date.now() + (1000 * 60 * 60 * 24 * 30),
      })
        .then((customToken) => {
          // Send token back to client for authentication...
        })
        .catch((error) => {
          console.log("Failed to create custom token:", error);
        });

    
  
}