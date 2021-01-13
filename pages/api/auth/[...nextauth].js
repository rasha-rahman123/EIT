import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../config/prisma";
import { Provider } from "next-auth/client";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Facebook({
        clientId: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_KEY,
        clientSecret: process.env.TWITTER_SECRET,
      }),
    ],
    callbacks: {
      redirect: async (url, baseUrl) => {
        return Promise.resolve(baseUrl + "/login");
      },
      session: async (session, user) => {
        session.user.id = user.uid;
        return Promise.resolve(session);
      },
      jwt: async (token, user, account, profile, isNewUser) => {
        if (user) {
          token.uid = user.id;
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
