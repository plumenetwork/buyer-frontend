'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className='bg-gray-25'>
      <div className='max-w-screen mx-8 flex flex-wrap items-center justify-between p-4'>
        <div>
          <h1 className='font-grey-950 self-center whitespace-nowrap font-serif text-2xl font-normal'>
            COMPANY.XYZ
          </h1>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-950 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden '
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
          id='navbar-default'
        >
          <ul className='mt-4 flex flex-col rounded-lg border p-4 font-medium md:mt-0 md:flex-row  md:border-0 md:p-0 rtl:space-x-reverse'>
            <li>
              <Link
                href='/project'
                className={`mx-4 block px-3 py-2 text-sm font-normal text-gray-950 ${inter.className} `}
                aria-current='page'
              >
                Project
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className={`mx-4 block px-3 py-2 text-sm font-normal text-gray-950 ${inter.className}`}
                aria-current='page'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/careers'
                className={`mx-4 block px-3 py-2 text-sm font-normal text-gray-950 ${inter.className}  `}
                aria-current='page'
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href='/support'
                className={`mx-4 block px-3 py-2 text-sm font-normal text-gray-950 ${inter.className} `}
                aria-current='page'
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
