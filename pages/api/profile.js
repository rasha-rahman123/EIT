import admin from '../../firebase-admin';


export default async (_, res) => {
    const path = await _.query.uuid
    console.log(path)
    const snapshot = await admin.firestore().collection('Users').where('email','==',path).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  
    console.log(snapshot)

   

    
  
}