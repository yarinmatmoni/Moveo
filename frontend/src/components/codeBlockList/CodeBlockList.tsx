import React from 'react';
import { CodeBlock } from './codeBlock/CodeBlock';
import { BlockCodeType } from '../../types/types';
import style from './CodeBlockList.module.scss';

export const CodeBlockList = ({ data }: { data: BlockCodeType[] }) => {
  return (
    <div className={style.codeBlockList}>
      {data.map((codeBlock: BlockCodeType) => (
        <CodeBlock key={codeBlock.id} title={codeBlock.title} href={codeBlock.href} />
      ))}
    </div>
  );
}

