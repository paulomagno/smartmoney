import React , {useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import {TextInputMask} from 'react-native-masked-text';

import Colors from '../../../styles/Colors';

const InputMoney = ({value, startWithDebit = true, onChangeDebit, onChangeValue}) => {
    
    const setDefaultDebit = () => {
        if(value === 0){
            return startWithDebit ? -1 : 1;
        }
        else{
            return value <= 0 ? -1 : 1;
        }
    }

    const setDefaultDebitPrefix = () => {
        if(value === 0){
            return startWithDebit ? '-' : '';
        }
        else{
            return value <= 0 ? '-' : '';
        }
    }
    
    //const [debit, setdebit] = useState(value <= 0 ? -1 : 1);
    //const [debitPrefix, setdebitPrefix] = useState(value <= 0 ? '-' : '+');
    const [debit, setdebit] = useState(setDefaultDebit());
    const [debitPrefix, setdebitPrefix] = useState(setDefaultDebitPrefix());

    const onChangeDebitCredit = () => {
        if(debit < 0){
            setdebit(1);
            setdebitPrefix('');
            onChangeDebit && onChangeDebit(1);
        }
        else {
            setdebit(-1);
            setdebitPrefix('-');
            onChangeDebit && onChangeDebit(-1);
        }

        onChangeValue(value * -1);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.debitButton} 
                onPress={onChangeDebitCredit}
            >
              <Text style={styles.debitButtonPrefix}>{debitPrefix}</Text>
              <Text style={styles.debitButtonText}>R$</Text>
            </TouchableOpacity>              
             <TextInputMask
                style={styles.input}
                type={'money'}
                options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                }}

                value={value}
                includeRawValueInChangeText={true}
                onChangeText={(maskedValue, rawValue) => {
                    onChangeValue(rawValue * debit);
                }}
            
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor:Colors.asphalt,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical:10,
        
    },
    debitButton:{
       flexDirection: 'row',
       color: Colors.white,
       paddingVertical: 20,
       paddingHorizontal:20,
    },
    debitButtonPrefix:{
        fontSize:28,
        color: Colors.white,
        minWidth:8,
      
    },
    debitButtonText:{
        fontSize:28,
        color: Colors.white,
    },
    input:{
        flex: 1,
        fontSize:28,
        color: Colors.white,
        textAlign: 'right',
        paddingLeft:0,
        paddingRight: 20,
    },
});

export default InputMoney;

