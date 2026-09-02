import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen({ navigation, onLogin }) {

    // estado responsavel pelos dados digitados no formulario.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [error, setError] = useState('');

    function handleSubmit() {
        if (
            !name.trim()
            || !email.trim()
            || !passWord.trim()
        ) {
            setError('Preencha todos os campos.');

            return;
        }

        if (
            email !== 'aluno@senac.com'
            || passWord !== '123'
        ) {
            setError('E-mail e senha inválidos.')
        }

        setError('');

        // Função recebida via props

        // onLogin  foi recebida do componente pai

        onLogin(name.trim());


        navigation.reset({
            // index informa qual rota sera considerada ativa
            index: 0,

            routes: [
                {
                    name: 'Home'
                },
            ],
        })
    }

    return (

        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >

            <ScrollView
                contentContainerStyle={styles.container}
                // permite que tenhamos interações com os campos mesmo com o teclado aberto.
                keyboardShouldPersistTaps="handled"
            >
            
            <View styles={styles.brand}>

                {/* Logo */}
                <View style={styles.logo}>
                    <Text style={styles.logoText}>{'\u2713'}</Text>
                </View>


                {/* Titulo */}
                <Text style={styles.title}>
                    Bem-Vindo ao TaskFlow
                </Text>

            




            </View>


            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    
})