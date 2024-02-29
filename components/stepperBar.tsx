export default function StepperBar(props: any) {
  return (
    <div className='w-2/6 bg-gray-50 '>
      <div className='ml-16 mt-32 text-3xl font-bold leading-9'>
        {props.tabs == 0 ? (
          <>Identity Verification</>
        ) : props.tabs == 1 ? (
          <>Document Signing</>
        ) : (
          <>Token Purchase</>
        )}
      </div>
      <div className='navigation_menu'>
        <ul className='navigation_tabs'>
          <li className={props.tabs == 0 ? 'tab_active' : 'tab_inactive'}>
            <div className='text-xs font-semibold uppercase leading-4 tracking-wide'>
              Identity Verification
            </div>
            <div className='text-sm font-normal leading-5 text-gray-500'>
              Verify your identity before purchase.
            </div>
          </li>
          <li
            className={
              props.tabs == 0
                ? 'tab_disabled'
                : props.tabs == 1
                  ? 'tab_active'
                  : 'tab_inactive'
            }
          >
            <div className='text-xs font-semibold uppercase leading-4 tracking-wide '>
              DOCUMENT SIGNING
            </div>
            <div className='text-sm font-normal leading-5 text-gray-500'>
              Please read carefully and sign documents.
            </div>
          </li>
          <li
            className={
              props.tabs == 0 || props.tabs == 1
                ? 'tab_disabled'
                : props.tabs == 2
                  ? 'tab_active'
                  : 'tab_inactive'
            }
          >
            <div className='text-xs font-semibold uppercase leading-4 tracking-wide '>
              Token purchase
            </div>
            <div className='text-sm font-normal leading-5 text-gray-500'>
              Verify your identity before purchase.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
