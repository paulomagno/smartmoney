import {useEffect, useState} from 'react';

import {getBalanceSumByDate} from '../services/Balance';

const useBalanceSumByDate = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState([]);

    useEffect(() => {

        const loadBalanceSumByDate = async () => {
             const data = await getBalanceSumByDate(days);
             setBalanceSum([...data]);
        }
       
        loadBalanceSumByDate();
        
    }, [days]);

    return [balanceSum];
}

export default useBalanceSumByDate;

