import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";


export default function SplashScreen({ navigation }) {

    const opacity = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(
            opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
        }
        ).start();

        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 1600)

        return () => clearTimeout(timer);

    })


    return (
        <View style={styles.container}>

            <Animated.View
                style={[
                    styles.logoBox,
                    { opacity },
                ]}
            >
                {/* Símbolo */}
                <Text style={styles.symbol}>
                    {'\u2713'}
                </Text>

                {/* Nome do aplicativo*/}

                <Text style={styles.title}> TaskFlow</Text>

                {/* Frase de apoio */}

                <Text style={styles.subTitle}> Organize. Priorize. Conclua.</Text>

            </Animated.View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical:24,
    },
    logoBox: {
        alignItems: 'center',
    },
    symbol : {
        color: colors.surface,
        fontSize:64,
        fontWeight: '900',
        lineHeight: 68,
    },
    title: {
        marginTop: 10,
        color: colors.surface,
        fontSize:36,
        fontWeight: '900',
        lineHeight:42,
    },
    subTitle : {
        marginTop: 10,
        color: '#E7E8FF',
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center'
    }
})