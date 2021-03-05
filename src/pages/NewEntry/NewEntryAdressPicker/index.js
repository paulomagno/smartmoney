import React from 'react';
import {Alert, View, TouchableOpacity, StyleSheet} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../styles/Colors';

const NewEntryAdressPicker = ({address, onChange}) => {

    const getLocation = (latitude,longitude) => {
    
        Geocoder.init('AIzaSyA1K3BaJZrW-og84Hew6mwg3zBfonr-qG8');
        
        Geocoder.from({latitude,longitude})
        .then(json => {
            const formattedAddress = json.results[0].formatted_address;
            Alert.alert("Localização", formattedAddress, [
                {
                  text: 'Cancelar',
                  style: 'cancel',
                  onPress : () => {}
                },
                {
                    text: 'Confirmar',
                    onPress: () => { 
                        onChange({
                          latitude: latitude, 
                          longitude: longitude,
                          address: formattedAddress
                        });
                    }  
                }
            ]);
        })
        .catch(error => {
            Alert.alert('Houve um erro ao recuperar sua localização, por favor, tenha certeza que autorizou este aplicativo');
            console.error('NewEntryAddressPicker :: getLocation :: erro ao recuperar a localização',error);
        });
    
    }
    
    const getPosition = () => {

        Geolocation.getCurrentPosition((position) => {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude ${latitude} , Longitude ${longitude}`);
          
          getLocation(latitude,longitude);
      
        },(err) => {
          console.log('NewEntryAddressPicker :: getPosition ',err);
          Alert.alert('Houve um erro ao recuperar sua posição, por favor, tenha certeza que autorizou este aplicativo');
      
        }, { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 });
    }

    const onButtonPress = () => {
        
        if(address){
            Alert.alert('Localização', address, [
               {
                 text: 'Apagar',
                 onPress: () => {
                     onChange({latitude: null, longitude: null, address: null});
                 } ,
                 style: 'cancel', 
               },
               {
                 text: 'Ok',
                 onPress: () => console.log('Ok Pressed'),    
               } 
            ])
        }
        else{
           getPosition();
        }

    }
    
    return ( <View>
                <TouchableOpacity 
                   style={[styles.button, address ? styles.buttonActived : '']} 
                   onPress={onButtonPress}
                >
                <Icon name="person-pin" size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>);
}

const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 150,
      backgroundColor: Colors.asphalt,
      width: 59,
      height: 59,
      marginHorizontal: 3,
    },
    buttonActived:{
      backgroundColor: Colors.blue,
    }
});

export default NewEntryAdressPicker;
