import React , {useState} from 'react';
import { View , TouchableOpacity, StyleSheet} from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Colors';


const NewEntryDatePicker = ({value,onChange}) => {

    const [modalVisible, setmodalVisible] = useState();

    const onChangeValue = (date) => {
        onChange(date);  
        onCancel();
    }

    const onCancel = () => {
        setmodalVisible(false);
    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => setmodalVisible(true)}
            >
               <Icon name="today" size={30} color={Colors.white} />           
            </TouchableOpacity>

            <DateTimePickerModal 
                mode="calendar" 
                datePickerModeAndroid="calendar"
                titleIOS="Data de Vencimento"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Ok"
                date={value}
                isVisible={modalVisible}
                onConfirm={onChangeValue}
                onCancel={onCancel}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.asphalt,
        width: 59,
        height:59,
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    }
});

export default NewEntryDatePicker;

