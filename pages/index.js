import Head from 'next/head';
import List from '../components/List';
import Hero from '../components/Hero';
import Loading from '../components/Loading';
import { useMember } from '../utils/swr';

export default function Home() {
  const { member, isLoading } = useMember();

  return (
    <div>
      <Head>
        <title>Greenly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={`main`}>
          <Hero />
          {isLoading ? <Loading /> : <List member={member} />}
        </div>
        <footer className="site-footer">
          <p>
            &copy; {new Date().getFullYear()} Greenly &bull; Crafted with{' '}
            <span role="img" aria-label="love">
              &#9998;
            </span>{' '}
            by <a href="http://zakiafada.me/">Zaki Afada</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
