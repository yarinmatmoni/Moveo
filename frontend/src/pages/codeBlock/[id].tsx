import React, { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import style from '../../styles/codeBlockPage.module.scss';
import { blockCodeType } from '../../types/types';

//FIXME: type - any + url 
export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await fetch(`http://localhost:4000/codeBlock/${params.id}`);
  const data = await response.json();

  // will be passed to the page component as props
  return {
    props: {
      codeBlock: data.data,
    },
  };
}

function CodeBlock({ codeBlock }: any) {
  const [code, setCode] = useState(codeBlock.code);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  return (
    <div className={style.codeBlockPage}>
      <Head>
        <title>{`BLock Code - ${codeBlock.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{codeBlock.title}</h1>
      <textarea value={code} onChange={handleCodeChange} />
    </div>
  );
}

export default CodeBlock;
