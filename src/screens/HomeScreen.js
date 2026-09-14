import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";

export default function HomeScreen({ navigation, userName, tasks, onToggleTask }) {
    return (
        <View style={styles.container}>

            <FlatList
                // data receber   as infomrações de um array para exibir na lista 
                data={tasks}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onPress={() => openTask(item)}
                        onToggleDone={onToggleTask}

                    />
                )}

                ItemSeparatorComponent={() => (
                    <View style={styles.separador} />
                )}


                ListHeaderComponent={

                    <View style={styles.headerContent}>
                        {/* saudaçao */}
                        <View>
                            <Text style={styles.greeting}>
                                Olá, {userName || 'Aluno'}!
                            </Text>

                            <Text>Vamos organizar suas prioridades</Text>
                        </View>


                    </View>
                }


            />



        </View>
    )
}

const styles = StyleSheet.create({

})