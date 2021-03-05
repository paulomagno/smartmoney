import React from 'react';
import {Text, View,FlatList,StyleSheet } from 'react-native';

import EntrySummaryListItem from './EntrySummariyListItem';

const EntrySummaryList = ({data}) => {
    return (
        <View>
            <FlatList 
                style={styles.container}
                data={data}
                keyExtractor={ item => item.category.id}
                renderItem={({item}) => <EntrySummaryListItem entry={item} /> }
            
            />

            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex:1,     
    },
  
})

export default EntrySummaryList;
