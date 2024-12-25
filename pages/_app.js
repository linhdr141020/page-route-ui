import "@/styles/globals.css";
import App from "next/app";
export default function MyApp({ Component, pageProps, example }) {
  return <Component {...pageProps} />;
}
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
  return { ...ctx, example: "data" };
}
