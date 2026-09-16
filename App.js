

import { useEffect, useRef, useState } from 'react';
import AppNavigation from './src/navigation/Appnavigation';
import { initialTasks } from './src/data/tasks';
import { Alert, StatusBar, Text, View, ActivityIndicator } from 'react-native';
import Botao from './src/components/Botao';
import { loadTasks } from './src/services/TaskStorege';


export default function App() {

  // guardar o nome do usuario
  const [userName, setUserName] = useState('');

  // guarda as nossas tasks iniciais
  const [tasks, setTaks] = useState(initialTasks);


  // Adicionar Tarefa
  const latestTasks = useRef(initialTasks);
  const queue = useRef(Promise.resolve());
  const [loaded, setLoade] = useState(false);
  const [loadError, setLoadError] = useState('');


  // Carregamento inicial das tarefas
  async function restoreTasks() {

    //Limpar qualquer erro que ja exista na tela
    setLoadError('');

    try {

      // Busca as tarefas salva no armazenamento do aparelho
      const saved = await loadTasks(initialTasks);

      // Atualiza a lista de referencia que guarda sempre a versão mais recente
      latestTasks.current = saved;

      // atualiza o estados das tarefas
      setTaks(saved);
      //indica o carregamento inicial terminou com sucesso.
      setLoade(true);
    } catch {
      setLoadError(
        'Não foi possivel carregar suas tarefas. Tente novamente'
      );
    }
  }

  // Executado quando o componente é carregado pela primeira vez
  useEffect(() => {
    restoreTasks();
  }, []);


  // Função  para alterar as nossas tarefas
  function changeTaks(createNextTask) {

    // Funciona como um fila de operações
    // .then() para garantir as alterações sejam feitas  depois que terminar a alteração anterior
    const operation = queue.current.then(async () => {

      // recebe a nossa lista atual, e devolve uma nova lista com as alterações realizadas
      const next = await createNextTask(latestTasks.current);

      // primeiro salvamos a nova lista
      await saveTask(next)

      // atualizamos as referencias com a versão de lista mais recente 
      latestTasks.current = next;

      //atualizamos o estado da lista.
      setTaks(next);
    });

    // Guarda a operação a atual dentro da fila, o cath é pra permitir que a fila continue executando mesmo se uma falar
    queue.current = operation.catch(() => { });

    // retorna uma Promise da operação


    return operation;

  }


  //Função  de adicionar uma nova tarefa
  function handleAddTask(newTask) {

    // Chamando  changeTaks passando uma função que recebe as tarefas atuais
    return changeTaks((currentTasks) => [

      // mantem todas as tarefas que existiam
      ...currentTasks,

      // adicionamos a nova tarefa no final da lits
      newTask
    ]);
  }


  // Função de marcar / desmarcar um tarefa como concluida

  async function handleToggleTask(taskToToggle) {
    try {

      await changeTaks(async (currentTasks) => {

        // procura dentro da nossa lista a tarefa que possui o mesmo is selecionado
        const selected = currentTasks.find(
          (task) => task.id === taskToToggle.id
        )
      });

      // caso a tarefa não exista.
      if (!selected) {
        throw new Error('Tarefa não encontrada.');
      }

      // selected.done indica se a tarefa foi concluida 
      // !selected.done ele significa:
      // Se a tarefa aidna não estiver consluida 

      // como ela está preste  a ser concluida, cancelamento qualquer notificação ou lembrete.
      if (!selected.done) {
        await cancelTaskReminder(selected.notificationId);
      }


      // map() percorrer todas as tarefas e criar um nova lista
      return currentTasks.map((task) =>

        // verifica se esta tarefa esta selecionada
        task.id === selected.id

          // se for, criamos um copia dela ultilizar spread
          // depois alteramos somente algumas propriedades
          ? {
            ...task,

            //invertendo o status
            done: !task.done,

            // removendo o ID de notificação
            notificationId: null,

            // removendo data e hora agendado
            reminderAt: null,
          }

          // caso não seja uma tarefa seleciona, não realiza nenhuma alteração 
          : task
      )

    } catch (error) {

      Alert.alert(
        'Tarefa',
        'Não foi possivel atualizar a tarefa. Tente novamente.'
      );
    }
  }

  // função de agendar um lembrete
  async function handledSheduleRemeider(taskId, minutes) {

    let reminder;


    try {
      await changeTaks(async (currentTasks) => {


        // procuramos a tarefa utilizando o ID recebido
        const task = currentTasks.find(
          (item) => item.id === taskId
        );

        if (!task || task.done) {
          throw new Error('Escolher uma tarefa pendente')
        }

        if (task.notificationId) {
          throw new Error(
            'Cancele o lembrete anterior antes de criar outro.'
          );
        }

        // agendar uma notificação para essa tarefa
        reminder = await scheduleTaskReminder(task, minutes);

        //criar nova lista de tarefas
        return currentTasks.map((item) =>

          // quando encontrar a tarefa escolhida
          item.id === taskId

          // copiamos os dados atuais da tarefa e adicionamos o lembrete
            ? {
              ...item,
              ...reminder
            }

            : item
        )

      })
    } catch (error) {
      // para cancelar notificaçao caso der algum erro.
      if(reminder) {
        await cancelTaskReminder(reminder.notificationId);
      }

      throw error;
    }
  }

  function handleLogin(name) {
    setUserName(name);
  }


  if (!loaded) return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 4, gap: 16 }}>
      {loadError ?
        <><Text>{loadError}</Text><Botao label={"Tentar novamente"} onPress={restoreTasks} /></>

        : <> <ActivityIndicator /><Text>Carregando tarefas...</Text></>
      }

    </View>
  )

  return (

    <>
      {/* Controlar  aparença da barra fuperior */}
      <StatusBar style="dark" />


      <AppNavigation
        userName={userName}
        tasks={tasks}
        onLogin={handleLogin}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
      />
    </>



  );
}