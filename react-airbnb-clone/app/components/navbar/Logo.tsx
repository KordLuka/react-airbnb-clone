'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  console.log('router: ', router);

  return (
    <Image
      alt='logo'
      className='hiddenn md:block cursor-pointer'
      height='100'
      width='100'
      src='/images/logo.png'
    />
  );
};

export default Logo;