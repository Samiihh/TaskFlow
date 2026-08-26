import { Pressable } from "react-native";

export default function TaskCard({
        task,
        onPress,
        onToggleDone
}) {
    return(

        <Pressable
            onPress={onPress}
            style={({pressed}) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >
            

        </Pressable>

    )
}