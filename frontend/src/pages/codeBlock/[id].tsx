import React, { ChangeEvent, useState } from 'react';
import style from './codeBlockPage.module.scss';
import io from 'socket.io-client';
import Header from '../../components/header/Header';

const socket = io('http://localhost:4000', { transports: ['websocket'] });

/* ************************************************************************************ */
socket.on('clientCount', (count) => {
  console.log('Number of clients:', count);
});
/* ************************************************************************************ */

//FIXME: type - any
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

function CodeBlockPage({ codeBlock }: any) {
  const [code, setCode] = useState(codeBlock.code);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    socket.emit('codeChange', { data: e.target.value });
  };

  socket.on('sendEditCode', (data) => {
    setCode(data.data);
  });

  return (
    <div className={style.codeBlockPage}>
      <Header tabName={`BLock Code - ${codeBlock.title}`} title={codeBlock.title} />
      <textarea value={code} onChange={handleCodeChange} />
    </div>
  );
}

export default CodeBlockPage;
