import { useEffect, useState } from 'react';
import style from './index.module.scss';
import { BlockCodeType } from '../types/types';
import { CodeBlockList } from '../components/codeBlockList/CodeBlockList';
import { Header } from '../components/header/Header';
import { getServerUrl } from '../common/function';

export default function Home() {
  const [codeBlockList, setCodeBlockList] = useState<BlockCodeType[]>([]);

  const getCodeBlockList = async () => {
    const serverUrl = getServerUrl();
    const codeBlockListResponse = await fetch(`${serverUrl}`);
    if (codeBlockListResponse.ok) {
      const codeBlockListBody = await codeBlockListResponse.json();
      setCodeBlockList(codeBlockListBody?.data);
    }
  };

  useEffect(() => {
    getCodeBlockList();
  }, []);

  return (
    <div className={style.lobbyContainer}>
      <Header tabName={'Lobby'} title={'Lobby'} subTitle={'Choose code block'} />
      {codeBlockList ? <>
        <CodeBlockList data={codeBlockList} />
      </> : 'Loading... please wait'}
    </div>
  );
}
