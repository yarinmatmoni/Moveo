import React from 'react';
import Link from 'next/link';
import style from './CodeBlock.module.scss';

function CodeBlock({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} className={style.link}>
      <div className={style.codeBlockContainer}>
        <p>{title}</p>
      </div>
    </Link>
  );
}

export default CodeBlock;
