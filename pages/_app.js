import { wrapper } from "../store";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export const getInitialProps = async ({ Component, ctx }) => {
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      appProp: ctx.pathname,
    },
  };
};
export default wrapper.withRedux(MyApp);
