import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Form from '../components/form';

import { useMember } from '../utils/swr';
import { formatDate } from '../utils/date-format';

export default function Home() {
  const { member, isLoading } = useMember();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Greenly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Form />

        <ul>
          {member.map((data) => (
            <li key={data.id}>
              <div>name: {data.name}</div>
              <div>phone: {data.phone}</div>
              <div>address: {data.address}</div>
              <div>joined since: {formatDate(data.created_at)}</div>
              <div>last updated:{formatDate(data.updated_at)}</div>
              <button>edit member</button>
              <button>delete member</button>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
