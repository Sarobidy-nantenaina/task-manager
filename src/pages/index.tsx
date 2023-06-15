import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {

  const timeDiff = Math.abs(server.getTime() - client.getTime());
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000).toString().padStart(2, "0");
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

};


export default function Home({ serverTime }: { serverTime: string }) {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  const cleanServerTime = serverTime.replace(/GMT.*$/, ""); // Supprimer le texte indésirable

  const [clientTimeDiff, setClientTimeDiff] = useState("");

  useEffect(() => {
    const clientTime = new Date();
    const timeDiff = calculateTimeDifference(new Date(serverTime), clientTime);
    setClientTimeDiff(timeDiff);
  }, []);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{cleanServerTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{clientTimeDiff}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const serverTime = new Date().toString();
  return {
    props: {
      serverTime,
    },
  };
}
