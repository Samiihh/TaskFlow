
import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '../styles/colors';
import Input from '../components/Input';
import Botao from '../components/Botao';


export default function LoginScreen({ navigation, onLogin }) {



  // Estado responsável pelo nome digitado.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {

    if (
      !name.trim()
      || !email.trim()
      || !password.trim()
    ) {

      setError('Preencha todos os campos.');
      return;
    }

    if (
      email !== 'aluno@senac.com'
      || password !== '1234'
    ) {

      setError('E-mail ou senha inválidos.');

      return;
    }

    // Limpamos uma possível mensagem de erro anterior.
    setError('');

    onLogin(name.trim());


    navigation.reset({

      // index informa qual rota será considerada ativa.
   
      index: 0,

      // routes define quais telas existirão
      // na nova pilha de navegação.
      routes: [
        {
          name: 'Home',
        },
      ],
    });
  }


  return (

    <KeyboardAvoidingView

      style={styles.flex}

      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >



      <ScrollView

        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.brand}>

          <View style={styles.logo}>

            <Text style={styles.logoText}>
              ✓
            </Text>

          </View>


          {/* -----------------------------------------------------------------
              TÍTULO
          ----------------------------------------------------------------- */}

          <Text style={styles.title}>
            Bem-vindo ao TaskFlow
          </Text>


          {/* -----------------------------------------------------------------
              SUBTÍTULO
          ----------------------------------------------------------------- */}

          <Text style={styles.subtitle}>
            Entre para organizar suas tarefas do dia.
          </Text>

        </View>


        {/* -------------------------------------------------------------------
            FORMULÁRIO
        ------------------------------------------------------------------- */}

        <View style={styles.form}>

          <Input
            label="Seu nome"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />


          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="aluno@senac.com"
            keyboardType="email-address"
          />
          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="1234"
            secureTextEntry
          />


          
          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}


          {/* botão */}

          <Botao
            label="Entrar"
            onPress={handleSubmit}
          />

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
flex: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 32,
    },
    brand: {
        alignItems: 'center'
    },

    logo: {
        width: 70,
        height: 70,
        borderRadius: 22,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        color: colors.surface,
        fontSize: 34,
        fontWeight: '900',
        lineHeight:38,
    },
    title: {
        marginTop: 18,
        color: colors.text,
        fontSize: 26,
        fontWeight: '900',
        textAlign: 'center',
        lineHeight: 32,
    },
    subtitle: {
        marginTop: 8,
        color: colors.textMuted,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 300,
    }, 

    form: {
        width:'100%',
        maxWidth: 420,
        alignSelf:'center',
        gap: 10,
    }, 
    error : {
        color:colors.danger,
        fontSize:13,
        fontWeight:'600',
        lineHeight:18,
    }
});