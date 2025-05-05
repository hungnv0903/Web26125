import React, { Fragment,} from 'react'
import YourFlights from '../flight/YourFlights'
import { Decrypt } from '../../utils/crypto';
import { useSearchParams } from 'react-router-dom';

const SelectService = () => {
  const [searchParams] = useSearchParams();
  const encryptedStr = searchParams.get('data');
  let decryptedData = null;
  if (encryptedStr) {
    try {
      console.log(encryptedStr.length) ; 
      decryptedData = Decrypt(encryptedStr, import.meta.env.VITE_KEY_CRYPTO);
      console.log('Decrypted data:', decryptedData);
    } catch (e) {
      console.error('Decrypt error:', e);
    }
  }
  return (
    <Fragment>
        <div className="grid grid-cols-6 gap-0 px-2 md:p-5 w-full xl:w-3/4 mx-auto transition-all duration-500 ease-in-out">
        <div className="col-left hidden lg:block col-span-2 cursor-pointer">
          <div className="sticky px-2 top-0">
            <div className="shadow-sm rounded-lg">
              <YourFlights />
            </div>
          </div>
        </div>
        <div className="col-right col-span-6 lg:col-span-4 rounded-md md:ps-7"> 
        </div>
      </div>
    </Fragment>
  )
}

export default SelectService