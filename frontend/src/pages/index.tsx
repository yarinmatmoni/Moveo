import { useEffect, useState } from 'react';
import Head from 'next/head';
import style from './index.module.scss';
import CodeBlock from '../components/codeBlock/CodeBlock';
import { blockCodeType } from '../types/types';

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
      </Head>
      <h1>Looby</h1>
      <p>Choose code block</p>
      <div className={style.codeBlockList}>
        {codeBlockList?.map((codeBlock: blockCodeType) => (
          <CodeBlock key={codeBlock.id} title={codeBlock.title} href={codeBlock.href} />
        ))}
      </div>
    </div>
  );
}
