

import { useRef, useState } from 'react';
import AppNavigation from './src/navigation/Appnavigation';
import { initialTasks } from './src/data/tasks';

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
    } catch  {
      setLoadError(
        'Não foi possivel carregar suas tarefas. Tente novamente'
      );
    }
  }


  function handleLogin(name) {
    setUserName(name);
  }

  return (
    <AppNavigation
      userName={userName}
      tasks={tasks}
      onLogin={handleLogin}
      onAddTask={handleAddTask}
    />
  );
}