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
  const [users, setUsers] = useState<number>(0);
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
    if (users !== 1) {
      setCode(data);
    }
  });

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    socket.emit('codeChange', { data: e.target.value });
  };

  return (
    <div className={style.codeBlockPage}>
      {users !== 0 && <>
        <Header
          tabName={codeBlock.title}
          title={codeBlock.title}
          subTitle={`${users === 1 ? 'Mentor' : 'Student'} Panel`}
        ></Header>
        <CodeEditor
          value={code}
          language="js"
          onChange={handleCodeChange}
          className={style.codeEditor}
          readOnly={users === 1}
          padding={25}
          style={{
            fontFamily: 'Poppins',
          }}
        />
      </>
      }
    </div>
  );
}

export default CodeBlockPage;
