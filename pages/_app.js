import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import firebase from "firebase";
import firebaseConfig from "../config/firebase";
import { loadProgressBar } from "axios-progress-bar";
import "../prog.css";
import { useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import { DefaultSeo } from "next-seo";
import { parseCookies } from "nookies";
import {Provider, useSession} from 'next-auth/client'
import Router from 'next/router'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
    } catch (err) {
      console.log("failed");
    }
  }
}

function MyApp({ Component, pageProps, token }) {
  useEffect(() => {
    loadProgressBar();
    registerSW();
  }, []);


  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Provider session={pageProps.session}>
        <DefaultSeo
          title="EIT: Self Care Reformed"
          description="Emotional Intelligence Trainer (EIT) is a revolutionary look at self care. Rather than have people meditate all day long, EIT looks at CBT practical methodology though mental brain exercises that actually work."
          canonical="https://eitrainer.app/"
          openGraph={{
            url: "https://eitrainer.app/",
            title: "EIT: Self Care Reformed",
            description:
              "Emotional Intelligence Trainer (EIT) is a revolutionary look at self care. Rather than have people meditate all day long, EIT looks at CBT practical methodology though mental brain exercises that actually work.",
            images: [
              {
                url: "https://i.imgur.com/JOmP8ea.png",
                width: 2880,
                height: 1640,
                alt: "EIT Home Page",
              },
              {
                url: "https://i.imgur.com/MjLGmCg.png",
                width: 1125,
                height: 2436,
                alt: "EIT Toxic Message Detector Start Page",
              },
              {
                url: "https://i.imgur.com/oAHVpJS.png",
                width: 1125,
                height: 2436,
                alt: "EIT External Resource Screen",
              },
            ],
            site_name: "Emotional Intelligence Trainer (EIT)",
          }}
          twitter={{
            handle: "@raaahhh_sha",
            site: "@raaahhh_sha",
            cardType: "summary_large_image",
          }}
        />
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link
            href="/apple-splash-2048-2732.png"
            sizes="2048x2732"
            rel="apple-touch-startup-image"
          />
          <link
            href="/apple-splash-1668-2224.png"
            sizes="1668x2224"
            rel="apple-touch-startup-image"
          />
          <link
            href="/apple-splash-1536-2048.png"
            sizes="1536x2048"
            rel="apple-touch-startup-image"
          />
          <link
            rel="apple-touch-startup-image"
            href="/apple-splash-1125-2436.png"
            media="(device-width: 563px) and (device-height: 1218px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          />
          <link
            href="/apple-splash-1242-2208.png"
            sizes="1242x2208"
            rel="apple-touch-startup-image"
          />
          <link
            href="/apple-splash-750-1334.png"
            sizes="750x1334"
            rel="apple-touch-startup-image"
          />
          <link
            href="/apple-splash-640-1136.png"
            sizes="640x1136"
            rel="apple-touch-startup-image"
          />

          <link rel="manifest" href="/manifest.json" />
          <link href="/logo/favicon/favicon.ico" rel="shortcut icon" />

          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Layout session={'sesh'}>
          <Component {...pageProps}  session={'sesh'}/>
        </Layout>
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;

// function redirectUser(ctx, location) {
//   if (ctx.req) {
//       ctx.res.writeHead(302, { Location: location });
//       ctx.res.end();
//   } else {
//       Router.push(location, {query:{prevPath: ctx.pathname}});
//   }
// }

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   let pageProps = {};

//   const jwt = parseCookies(ctx).token
//   const domain = await process.env.NEXT_PUBLIC_DOMAIN
//   const token = await jwt && fetch(
//     `${domain}/api/getToken?token=${jwt}`
//   ).then((data) => data.json());
  
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   if (!jwt) {
//     switch(ctx.pathname.substr(0,5)){
//       case '/home':
//         return redirectUser(ctx,'/login')
//         case '/exer':
//           return redirectUser(ctx,'/login')
//         case '/prof':
//           return redirectUser(ctx, '/login')
//     }
  
    
// }

// return {
//   pageProps,
//   token: await token
// }
// };
