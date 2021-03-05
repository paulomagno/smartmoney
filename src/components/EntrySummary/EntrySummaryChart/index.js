import React from 'react';
import {View,StyleSheet } from 'react-native';

import {PieChart} from 'react-native-svg-charts';

const EntrySummaryChart = ({data}) => {

    const chartData = data.map(({category,amount}) => ({
          key: category.id,
          value: amount,
          svg:{
             fill: category.color,
          },
          arc: {
             outerRadius: '100%',
             innerRadius: '80%',
          }
    }));

    return (<View styles={styles.container}>
                <PieChart style={styles.chart} data={chartData} />            
            </View>
    );
}

const styles = StyleSheet.create({
    chart: {
        height: 100,
        width: 100,
        marginRight: 10,
    }
})

export default EntrySummaryChart;
