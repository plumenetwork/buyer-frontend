export default function StepperBar({ tabs }: { tabs: number }) {
  return (
    <div className=' w-full bg-gray-50'>
      <div className='ml-[62px] mt-[123px] flex w-[344px] flex-col  items-center gap-10'>
        <div className='w-full text-3xl font-semibold leading-9 text-dark-blue'>
          {tabs == 0 ? (
            <>Identity Verification</>
          ) : tabs == 1 ? (
            <>Document Signing</>
          ) : (
            <>Token Purchase</>
          )}
        </div>
        <div className='navigation_menu flex w-full flex-col items-center'>
          <ul className='navigation_tabs'>
            <li className={tabs == 0 ? 'tab_active' : 'tab_inactive'}>
              <div className='text-xs font-semibold uppercase leading-4 tracking-wide'>
                Identity Verification
              </div>
              <div className='text-sm font-normal leading-5 text-gray-500'>
                Verify your identity before purchase
              </div>
            </li>
            <li
              className={
                tabs == 0
                  ? 'tab_disabled'
                  : tabs == 1
                    ? 'tab_active'
                    : 'tab_inactive'
              }
            >
              <div className='text-xs font-semibold uppercase leading-4 tracking-wide'>
                DOCUMENT SIGNING
              </div>
              <div className='text-sm font-normal leading-5 text-gray-500'>
                Read documents carefully before signing{' '}
              </div>
            </li>
            <li
              className={
                tabs == 0 || tabs == 1
                  ? 'tab_disabled'
                  : tabs == 2
                    ? 'tab_active'
                    : 'tab_inactive'
              }
            >
              <div className='text-xs font-semibold uppercase leading-4 tracking-wide'>
                Token purchase
              </div>
              <div className='text-sm font-normal leading-5 text-gray-500'>
                Sign a transaction to purchase the token{' '}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
