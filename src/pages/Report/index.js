import React , {useState} from 'react';
import {StatusBar, View, TouchableOpacity ,Text, ScrollView, StyleSheet} from 'react-native';

import ActionFooter , {ActionPrimaryButton} from '../../components/Core/ActionFooter'

import BalanceLabel from '../../components/BalanceLabel';
import EntrySummary from '../../components/EntrySummary';
import EntryList from '../../components/EntryList';
import RelativeDaysModal from '../../components/RelativeDaysModal';
import CategoryModal from '../../components/CategoryModal';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../styles/Colors';

const Report = ({navigation}) => {
    const [relativeDaysModalVisibile, setRelativeDaysModalVisibile] = useState(false);
    const [categoryModalVisibile, setCategoryModalVisibile] = useState(false);

    const [relativeDays, setRelativeDays] = useState(7);
    const [category, setCategory] = useState({id: null, name: 'Todas Categorias'});
    
    const onRelativeDaysPress = (item) => {
        setRelativeDays(item);
        onRelativeDaysClosePress();
    }
    
    const onCategoryPress = (item) => {
        setCategory(item);
        onCategoryClosePress();
    }

    const onRelativeDaysClosePress = () =>{
        setRelativeDaysModalVisibile(false);
    }

    const onCategoryClosePress = () => {
        setCategoryModalVisibile(false);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor={Colors.background} />
            <BalanceLabel />
            <View style={styles.filtersContainer}>
                <TouchableOpacity 
                   style={styles.filterButton}
                   onPress={() => setRelativeDaysModalVisibile(true)}
                >
                   <Text style={styles.filterButtonText}>Últimos {relativeDays} dias</Text>
                    <Icon 
                        name='keyboard-arrow-down'
                        size={20}
                        color={Colors.champagneDark}
                    /> 
                </TouchableOpacity>

                <TouchableOpacity 
                   style={styles.filterButton}
                   onPress={() => setCategoryModalVisibile(true) }
                >
                   <Text style={styles.filterButtonText}>{category.name}</Text>
                    <Icon 
                        name='keyboard-arrow-down'
                        size={20}
                        color={Colors.champagneDark}
                    /> 
                </TouchableOpacity>
                
                <CategoryModal 
                  categoryType='all' 
                  isVisible={categoryModalVisibile}
                  onConfirm={onCategoryPress}
                  onCancel={onCategoryClosePress}
                />
                
                
                <RelativeDaysModal 
                    isVisible={relativeDaysModalVisibile} 
                    onConfirm={onRelativeDaysPress}
                    onCancel={onRelativeDaysClosePress}
                />
            </View>
            
            <ScrollView>
                <EntrySummary days={relativeDays} />
                <EntryList days={relativeDays} category={category} />
            </ScrollView>
           

            <ActionFooter>
                <ActionPrimaryButton 
                    title='Fechar'
                    onPress={() => navigation.navigate('Main')}
                />
            </ActionFooter>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       flex: 1,
       backgroundColor: Colors.background,
    },
    filtersContainer:{
       flexDirection: 'row',
       justifyContent: 'center',
       marginVertical: 5,

    },
    filterButton:{
       flexDirection: 'row',
       borderColor: Colors.champagneDark,
       borderWidth: 1,
       borderRadius: 150,
       paddingVertical: 5,
       paddingHorizontal:10,
       marginHorizontal: 5,
    },
    filterButtonText:{
       color: Colors.champagneDark,
       textAlign: 'center',
    }
});

export default Report;




