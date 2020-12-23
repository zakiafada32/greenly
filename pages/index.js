import Head from 'next/head';

import styles from '../styles/Home.module.css';
import Form from '../components/Form';
import List from '../components/List';

import { useMember } from '../utils/swr';

export default function Home() {
  const { member, isLoading } = useMember();

  console.log(member);

  return (
    <div className={styles.container}>
      <Head>
        <title>Greenly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Form />
        {isLoading ? <div>loading</div> : <List member={member} />}
      </main>

      <footer className={styles.footer}>zaki</footer>
    </div>
  );
}
