import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import InputMoney from '../../../components/Core/InputMoney';

import Colors  from '../../../styles/Colors';

const WelcomeBalanceInput = ({amount, onChangeValue}) => {
    return (
        <View>
            <Text style={styles.label}>Informe seu saldo</Text>
            <InputMoney 
               value={amount} 
               startWithDebit={false}
               onChangeValue={onChangeValue} 
            />
        </View>
    )
}

export default WelcomeBalanceInput;

const styles = StyleSheet.create({
    label:{
        color: Colors.white,
        fontSize: 28,
        textAlign: 'center'
    }
});
