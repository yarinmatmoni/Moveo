import React, { ChangeEvent, useEffect, useState } from 'react';
import style from './codeBlockPage.module.scss';
import io from 'socket.io-client';
import Header from '../../components/header/Header';
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

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
  const [counter, setCounter] = useState();
  const [socket, setSocket] = useState<any>(null);

  useEffect((): any => {
    const s = io('http://localhost:4000', { transports: ['websocket'] });
    setSocket(s);

    return () => s.disconnect();
  }, [setSocket]);

  if (socket) {
    socket.on('clientCount', (count: any) => {
      setCounter(count);
    });

    socket.on('sendEditCode', (data: any) => {
      setCode(data.data);
    });
  }

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    socket.emit('codeChange', { data: e.target.value });
  };

  console.log(counter)

  return (
    <div className={style.codeBlockPage}>
      <Header tabName={`BLock Code - ${codeBlock.title}`} title={codeBlock.title} subTitle={counter === 1 ? 'Mentor Panel' : 'Student Panel'} />
      <CodeEditor
        value={code}
        language="js"
        onChange={handleCodeChange}
        padding={25}
        className={style.codeEditor}
        readOnly={counter === 1 ? true : false}
      />
    </div>
  );
}

export default CodeBlockPage;
