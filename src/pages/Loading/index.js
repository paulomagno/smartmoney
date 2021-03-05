import React, {useEffect} from 'react';
import { StatusBar, ActivityIndicator, View, StyleSheet } from 'react-native';

import {isInitialized} from '../../services/Welcome';

import Colors from '../../styles/Colors';

const Loading = ({navigation}) => {

    useEffect(() => {
        const makeRedirect = async () => {
          const isInitBalance =  await isInitialized();
          navigation.navigate(isInitBalance === true ? 'Main' : 'Welcome');
        }
        makeRedirect();
    },[]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <ActivityIndicator color={Colors.violet} size={60}  />
        </View>
    )
}

export default Loading;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
