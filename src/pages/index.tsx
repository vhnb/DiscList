import styles from "@/styles/Home.module.css";
import Head from "next/head";

export default function Home() {

  return (
    <main className={styles.container}>
      <Head>
        <title>DiscList</title>
      </Head>
      <h1>Your easy tasks</h1>
      <p>DiscList is a user-friendly task list website designed to help you stay organized and manage your daily tasks effortlessly. With DiscList, you can easily create, view, and keep track of your tasks all in one place.</p>
      <div className={styles.contentOptionsHome}>
        <a href="/dashboard">Go to Dashboard</a>
        <a style={{backgroundColor:'transparent', color:'#fff',}} href="https://discord.com/oauth2/authorize?client_id=1265882278219874304&permissions=8&integration_type=0&scope=bot" target="blank">Add the application</a>
      </div>
    </main>
  );
}
