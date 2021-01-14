import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../config/prisma";


export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Facebook({
        clientId: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        state: false
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        state: false
      })
    ],
    callbacks: {
      redirect: async (url, baseUrl) => {
        return Promise.resolve(baseUrl + "/login");
      },
      session: async (session, user) => {

        session.user.id = user.id;
        return Promise.resolve(session);
      },
      jwt: async (token, user, account, profile, isNewUser) => {

        const isSignIn = (user) ? true : false
        if (isSignIn) {
          token.id = user.id
        }

        return Promise.resolve(token);
      },
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),
  });
