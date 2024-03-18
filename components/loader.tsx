import { BarLoader } from 'react-spinners';
export const Loader = () => {
  return (
    <div className='w-sreen flex h-screen items-center justify-center bg-white'>
      <BarLoader color='#dddddd' />
    </div>
  );
};
