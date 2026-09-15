// tasks.js
// -----------------------------------------------------------------------------
// FUNÇÃO DESTE ARQUIVO:
// Guardar dados locais usados somente para simular conteúdo.
//
// Ainda não temos banco de dados nem API. Por isso, criamos um array JavaScript
// com algumas tarefas prontas. Na UC seguinte esses dados podem vir de uma fonte
// externa ou de persistência.
// -----------------------------------------------------------------------------

export const initialTasks = [
  {
    id: '1',
    title: 'Revisar Flexbox',
    description: 'Revisar flexDirection, alignItems e justifyContent.',
    category: 'Estudos',
    priority: 'Alta',
    done: false,
  },
  {
    id: '2',
    title: 'Finalizar atividade',
    description: 'Organizar os componentes e revisar as importações.',
    category: 'Curso',
    priority: 'Média',
    done: false,
  },
  {
    id: '3',
    title: 'Ler documentação',
    description: 'Pesquisar exemplos de TextInput e Pressable.',
    category: 'Estudos',
    priority: 'Baixa',
    done: true,
  },
];
