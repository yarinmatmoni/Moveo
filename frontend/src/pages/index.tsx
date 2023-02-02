import { useEffect, useState } from 'react';
import Head from 'next/head';
import style from '../styles/index.module.scss';
import CodeBlock from '../components/codeBlock/CodeBlock';
import { blockCodeType } from '../types/types';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', { transports: ['websocket'], });

socket.on('clientCount', (count) => {
  console.log('Number of clients:', count);
});

export default function Home() {
  const [codeBlockList, setCodeBlockList] = useState<blockCodeType[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/codeBlock')
      .then((res) => res.json())
      .then((data) => setCodeBlockList(data.data));

  }, []);

  return (
    <div className={style.lobbyContainer}>
      <Head>
        <title>Looby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Lobby</h1>
      <p>Choose code block</p>
      <div className={style.codeBlockList}>
        {codeBlockList?.map((codeBlock: blockCodeType) => (
          <CodeBlock key={codeBlock._id} title={codeBlock.title} href={codeBlock.href} />
        ))}
      </div>
    </div>
  );
}
