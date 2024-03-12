'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div
              className={`relative w-[400px] ${props.variant === 'pass' ? 'rounded-xl border border-[#0E9F6E]' : props.variant === 'fail' ? 'rounded-xl border border-[#F05252]' : 'rounded-xl border border-[#3d55b8]'} w-full bg-white p-1`}
            >
              <div className='flex flex-row'>
                <ToastStatusIcon className='' icon={props.variant} />
                <div className='w-[300px] py-2 pl-2'>
                  {title && (
                    <ToastTitle
                      className={`mb-2 text-sm font-semibold leading-5 ${props.variant === 'pass' ? 'text-[#0E9F6E]' : props.variant === 'fail' ? 'text-[#E02424]' : 'text-[#3d55b8]'}`}
                    >
                      {title}
                    </ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className='text-sm font-normal text-[#525252]'>
                      {description}
                    </ToastDescription>
                  )}
                </div>
              </div>
              {action}
              <ToastClose />
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

const ToastStatusIcon = ({ icon }: any) => {
  return icon !== 'default' ? (
    <div className='m-1 flex min-w-[38px] self-start'>
      {icon === 'pass' && (
        <Image
          src='/check-toast.svg'
          alt='check toast'
          width={38}
          height={38}
        />
      )}
      {icon === 'fail' && (
        <Image
          src='/alert-toast.svg'
          alt='alert toast'
          width={38}
          height={38}
        />
      )}
    </div>
  ) : null;
};
