import {useState, useEffect} from 'react';

import {getBalance} from '../services/Balance';

const useBalance = () => {

    const [balance, setBalance] = useState();

    useEffect(() => {
       const loadBalance = async () =>{
          const value = await getBalance();
          setBalance(value);
       }

       loadBalance();
    }, []);

    return[balance];
}

export default useBalance;

