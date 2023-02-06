import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './codeBlockPage.module.scss';
import io from 'socket.io-client';
import { Header } from '../../components/header/Header';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { getServerUrl } from '../../common/function';

const CodeEditor = dynamic(() => import('@uiw/react-textarea-code-editor').then((mod) => mod.default), { ssr: false });

export async function getServerSideProps(context: any) {
  const { params } = context;
  const serverUrl = getServerUrl();
  const response = await fetch(`${serverUrl}/codeBlocks/${params.id}`);
  const data = await response.json();

  // will be passed to the page component as props
  return {
    props: {
      codeBlock: data?.data,
    },
  };
}

function CodeBlockPage({ codeBlock }: any) {
  const [code, setCode] = useState(codeBlock.code);
  const [users, setUsers] = useState<number>();
  const socketUrl = getServerUrl();

  const [socket, setSocket] = useState(io(`${socketUrl}`, { transports: ['websocket'] }));

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);


  socket.on('clientsCounter', (data: number) => {
    setUsers(data);
  });

  socket.on('sendEditCode', (data: string) => {
    // setCode(data);
    // console.log(data);
    if (users !== 1) {
      setCode(data);
    }
  });


  // useEffect(() => {
  //   const socketUrl = getServerUrl();
  //   const socket = io(`${socketUrl}`, { transports: ['websocket'] });

  //   socket.on('clientsCounter', (data: number) => {
  //     setUsers(data);
  //   });

  //   socket.on('sendEditCode', (data: string) => {
  //     setCode(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // setCode(e.target.value);
    socket.emit('codeChange', { data: e.target.value });
  };


  return (
    <div className={style.codeBlockPage}>
      <Header
        tabName={codeBlock.title}
        title={codeBlock.title}
        subTitle={`${users === 1 ? 'Mentor' : 'Student'} Panel`}
      ></Header>
      <CodeEditor
        value={code}
        language="js"
        onChange={handleCodeChange}
        padding={25}
        className={style.codeEditor}
        readOnly={users === 1}
      />
    </div>
  );
}

export default CodeBlockPage;
