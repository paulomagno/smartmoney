import React, {useState} from 'react';
import {StatusBar, View, StyleSheet } from 'react-native';

import ActionFooter, {ActionPrimaryButton, ActionSecondaryButton} from '../../components/Core/ActionFooter';

import BalanceLabel from '../../components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategoryPicker from './NewEntryCategoryPicker';
import NewEntryDatePicker from './NewEntryDatePicker';
import NewEntryAdressPicker from './NewEntryAdressPicker';
import NewEntryDeleteAction from './NewEntryDeleteAction';
import NewEntryCameraPicker from './NewEntryCameraPicker';


import useEntries from '../../hooks/useEntries';

import Colors from '../../styles/Colors';
import { add } from 'lodash';

const NewEntry = ({navigation}) => {

    const entry = navigation.getParam('entry',{
        id: null,
        amount: '0',
        category: {id: null, name: 'Selecione'},
        entryAt: new Date(),
        photo: null,
        adress: null,
        latitude: null,
        longitude: null
    });

    const [,saveEntry, deleteEntry] = useEntries();

    const [amount,setAmount] = useState(entry.amount);
    const [category,setCategory] = useState(entry.category);
    const [debit, setdebit] = useState(entry.amount <= 0 ? -1 : 1);
    const [entryAt, setentryAt] = useState(entry.entryAt);
    const [photo, setPhoto] = useState(entry.photo);
    const [address, setAddress] = useState(entry.adress);
    const [latitude, setLatitude] = useState(entry.latitude);
    const [longitude, setLongitude] = useState(entry.longitude);


    const isValid = () => {
        
        if(parseFloat(amount) !== 0 && category.id !== null ) {
            return true;
        }
        return false;
    };
    const onSave = () => {
        const data = {
          amount: parseFloat(amount),
          category: category,
          entryAt: entryAt,
          photo: photo,
          address: address,
          latitude: latitude,
          longitude: longitude,
        };
        
        console.log("New Entry :: save ", data);
        saveEntry(data,entry);
        onClose();
    }

    const onDelete = () => {
        deleteEntry(entry);
        onClose();
    }    
    const onClose = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <BalanceLabel />
            <View style={styles.formContainer}>
                
                <NewEntryInput 
                    value={amount}
                    onChangeValue={setAmount}
                    onChangeDebit={setdebit}
                />
                
                <NewEntryCategoryPicker 
                   debit={debit} 
                   category={category} 
                   onChangeCategory={setCategory}
                />
                
                <View style={styles.formActionContainer}>
                    <NewEntryDatePicker 
                        value={entryAt} 
                        onChange={setentryAt}
                    />
                    <NewEntryAdressPicker 
                        address={address}
                        onChange={({latitude,longitude,address}) => {
                            setLatitude(latitude);
                            setLongitude(longitude);
                            setAddress(address);
                        }} 
                    />

                    <NewEntryCameraPicker
                       photo={photo}
                       onChangePhoto={setPhoto} 
                    
                    />
                    
                    {entry.id &&  <NewEntryDeleteAction onOkPress={onDelete} /> }
                </View>
              
            </View>

            <View>
                <ActionFooter>
                     <ActionPrimaryButton 
                        title={entry.id ? 'Salvar' : 'Adicionar'}
                        onPress={() => { isValid() && onSave(); }} 
                     />
                     <ActionSecondaryButton 
                        title="Cancelar" 
                        onPress={onClose}
                     />
                </ActionFooter>
            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.background,
        padding:10,
    },
    formContainer:{
        flex: 1,
        paddingVertical: 20,
    },
    formActionContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    }
});

export default NewEntry;
