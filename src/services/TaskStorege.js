import AsyncStorage from "@react-native-async-storage/async-storage";

const TASK_KEY = '@taskflow/tasks/v1';

export async function loadTasks(fallback) {
    
    //Buscando no  AsyncStorage o conteudo associado a chave 
    const saved = await AsyncStorage.getItem(TASK_KEY);

    // se não existir nada, devolvemos a lista recebida como fallback
    if(saved === null){
        return fallback;
    }

    // Salvar as informações no formato do texto (string)
    // como vamos trabalhar com array de objetos, o json transforma em javascript 
    const tasks = JSON.parse(saved);


    if(

        !Array.isArray(tasks) || 
        tasks.some((task) =>
            
            !task ||

            typeof task.id !== 'string' ||
            typeof task.title !== 'string'||
            typeof task.description !== 'string' ||
            typeof task.category !== 'string'||
            typeof task.priority !== 'string' ||
            typeof task.done !== 'boolean'       
        )
    ){
        throw new Error('Não foi possivel ler  as tarefas salvas.')
    }
}