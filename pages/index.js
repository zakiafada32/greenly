import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Form from '../components/Form';
import List from '../components/List';

import { useMember } from '../utils/swr';

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
        <List member={member} />
      </main>

      <footer className={styles.footer}>zaki</footer>
    </div>
  );
}
