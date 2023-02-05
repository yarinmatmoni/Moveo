import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './codeBlockPage.module.scss';
import io from 'socket.io-client';
import Header from '../../components/header/Header';
import dynamic from 'next/dynamic';
import '@uiw/react-textarea-code-editor/dist.css';
import { getServerUrl } from '../../common/function';

const CodeEditor = dynamic(() => import('@uiw/react-textarea-code-editor').then((mod) => mod.default), { ssr: false });

export async function getServerSideProps(context: any) {
  const { params } = context;
  const response = await fetch(`${getServerUrl()}/${params.id}`);
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
  const [users, setUsers] = useState<number>();

  useEffect(() => {
    const socket = io(getServerUrl(), { transports: ['websocket'] });

    socket.on('clientsCounter', (data: number) => {
      setUsers(data);
    });

    socket.on('sendEditCode', (data: string) => {
      setCode(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    const socket = io(getServerUrl(), { transports: ['websocket'] });
    socket.emit('codeChange', { data: e.target.value });
  };

  return (
    <div className={style.codeBlockPage}>
      <Header
        tabName={codeBlock.title}
        title={codeBlock.title}
        subTitle={users === 1 ? 'Mentor Panel' : 'Student Panel'}
      ></Header>
      <CodeEditor
        value={code}
        language="js"
        onChange={handleCodeChange}
        padding={25}
        className={style.codeEditor}
        readOnly={users === 1 ? true : false}
      />
    </div>
  );
}

export default CodeBlockPage;
