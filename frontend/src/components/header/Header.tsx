import React from 'react';
import Head from 'next/head';
import type { HeaderType } from '../../types/types';

function Header({ tabName, title, subTitle }: HeaderType) {
  return (
    <div>
      <Head>
        <title>{tabName}</title>
      </Head>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  )
}

export default Header;