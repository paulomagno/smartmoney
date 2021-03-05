import {useEffect, useState} from 'react';

import {getBalanceSumByCategory} from '../services/Balance';

const useBalanceSumByCategory = (days = 7) => {
    const [balanceSum, setBalanceSum] = useState([]);

    useEffect(() => {

        const loadBalanaceSumByCategory = async () => {
            const data = await getBalanceSumByCategory(days);
            setBalanceSum([...data]);
        }

        loadBalanaceSumByCategory();
      
    },[days]);

    return [balanceSum];
}

export default useBalanceSumByCategory;