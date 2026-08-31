import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

export default function TaskCard({
    task,
    onPress,
    onToggleDone
}) {
    return (

        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >

            {/* Linha superior do card */}
            <View style={styles.topRow}>
                <Text
                    style={styles.category}>{task.category}

                </Text>
                <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                </View>

            </View>

            {/* Titulo */}

            <Text style={[
                styles.title,
                task.done && styles.titleDone
            ]}>
                {task.title}
            </Text>

            {/* Descrição */}
            <Text
                style={styles.description}
                numberOfLines={2}
            >
                {task.description}
            </Text>

            {/* area de status 
                -checkbox;
                - texto de pendente ou cocluido            
            */}

            <View style={styles.statusRow}>
                <Pressable

                    //Quando o usuario tocar no checkbox
                    // chamamos a função recebida pela props
                    onPress={() => onToggleDone(task)}

                    style={[
                        styles.checkbox,
                        task.done && styles.checkboxChecked
                    ]}
                >

                    {task.done ? (
                        <Text style={styles.checkmark}>
                            &#9989
                        </Text>
                    ) : null}
                </Pressable>

                {/* texto de status */}

                <Text
                    style={
                        task.done
                            ? styles.doneText
                            : styles.pendingText
                    }
                >
                    {task.done ? 'Concluída' : 'Pendente'}

                </Text>
            </View>

        </Pressable>

    )
}

const styles = StyleSheet.create({
    card :{
        backgroundColor: colors.surface,
        borderRadius: 16, 
        borderWidth: 1,
        borderColor: colors.border,
        padding:16,
        gap: 8,
    },
    
    cardPressed : {
        opacity: 0.75,
    },

    topRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 12,
    }

})