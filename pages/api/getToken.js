
import { verifyIdToken } from "../../firebase-admin";

export default async (_, res) => {
  try {
    const token = await _.query.token;

    const tok = await verifyIdToken(token);

    return res.send(tok);
    
  } catch (err) {
    return res.send(err);
  }
};
