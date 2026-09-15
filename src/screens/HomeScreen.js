import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import Card from "../components/Card";
import { colors } from "../styles/colors";

export default function HomeScreen({ navigation, userName, tasks, onToggleTask }) {

    // Método filter ele percorrer um array  e criar um novo, contendo apenas os elementos que foram selecionados
    // filtra as uque não foram concluidas  
    const pendingCount = tasks.filter((task) => !task.done).length;
    // filtra as que foram concluidas
    const doneCount = tasks.filter((task) => task.done).length;

    // function openTask(task) {
    //     navigation.navigate('Detalhes', { taskId: task.id });
    // }

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

                            <Text style={styles.subtitle}>Vamos organizar suas prioridades</Text>
                        </View>

                        {/* Cards de Resumo */}

                        <View style={styles.summaryRow}>

                            <Card
                                value={pendingCount}
                                label={"Pendentes"}
                            />

                            <Card
                                value={doneCount}
                                label={"Concluídas"}
                            />
                        </View>

                        {/* Cabeçalho da seção de tarefas */}

                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionTitle}>
                                Suas Tarefas
                            </Text>

                            {/* Botão de Nova Tarefa */}

                            <Pressable

                                // Quando o usuario pressiona o botão, envia/navegar para a tela de nova tarefa
                                onPress={() => navigation.navigate('NovaTarefa')}

                                style={({ pressed }) => [
                                    styles.addButton,
                                    pressed && styles.addButtonPressed,
                                ]}
                            >

                                <Text style={styles.addButtonText}>
                                    + Nova
                                </Text>


                            </Pressable>
                        </View>

                    </View>
                }

                contentContainerStyle={styles.content}

                ListEmptyComponent={

                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>
                            Nenhuma tarefa ainda
                        </Text>

                        <Text style={styles.emptyText}>
                            Crie a sua primeira tarefa usando o botao nova
                        </Text>
                    </View>
                }


            />



        </View>
    )
}

const styles = StyleSheet.create({

    // Container Principal

    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 36,
        paddingBottom: 40,
    },

    headerContent: {
        marginBottom: 18,
    },

    greeting: {
        color: colors.text,
        fontSize: 28,
        fontWeight: '900',
    },

    subtitle: {
        marginTop: 6,
        color: colors.textMuted,
        fontSize: 14,
        lineHeight: 20,
    },

    summaryRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },

    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop:28,
        marginBottom: 16,
    },

    sectionTitle: {
        color: colors.text,
        fontSize:20,
        fontWeight: '800',
    },

    addButton :{
        backgroundColor: colors.secondary,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical:9,
    },

    addButtonPressed :{
        opacity: 0.72,
    },

    addButtonText :{
        color:colors.primary,
        fontWeight: '800',
    },

    separador: {
        height: 14,
    },

    empty :{
        marginTop:40,
        alignItems: 'center',
        padding: 24,
    },

    emptyTitle :{
        color: colors.text,
        fontSize: 18,
        fontWeight: '800',
    },

    emptyText : {
        color: colors.textMuted,
        marginTop:8,
        textAlign: 'center',
    },


})