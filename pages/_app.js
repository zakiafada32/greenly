import '../styles/globals.css';
import '../styles/app.scss';
import '../styles/button.scss';
import '../styles/card.scss';
import '../styles/hero.scss';
import '../styles/form.scss';
import 'react-responsive-modal/styles.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
