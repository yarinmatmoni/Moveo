import { useEffect, useState } from 'react';
import style from './index.module.scss';
import { BlockCodeType } from '../types/types';
import CodeBlockList from '../components/codeBlockList/CodeBlockList';
import Header from '../components/header/Header';

export default function Home() {
  const [codeBlockList, setCodeBlockList] = useState<BlockCodeType[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/codeBlock')
      .then((res) => res.json())
      .then((data) => setCodeBlockList(data.data));
  }, []);

  return (
    <div className={style.lobbyContainer}>
      <Header tabName={'Looby'} title={'Looby'} subTitle={'Choose code block'} />
      <CodeBlockList data={codeBlockList} />
    </div>
  );
}
