import React from 'react';
import Link from 'next/link';
import style from './CodeBlock.module.scss';
import type { BlockCodeCardType } from '../../../types/types';

export const CodeBlock = ({ title, href }: BlockCodeCardType) => {
  return (
    <Link href={href} className={style.link}>
      <div className={style.codeBlockContainer}>
        <p>{title}</p>
      </div>
    </Link>
  );
}


