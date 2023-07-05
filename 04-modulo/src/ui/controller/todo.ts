import { todoRepository } from "@ui/repository/todo";

interface TodoCrontrollerParams {
  page: number;
}

async function get(params: TodoCrontrollerParams) {
  return todoRepository.get({ page: params.page, limit: 2 });
}

function filterTodosByContent<Todo>(
  todos: Array<Todo & { content: string }>,
  search: string
): Todo[] {
  const filteredTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormalized = todo.content.toLowerCase();

    return contentNormalized.includes(searchNormalized);
  });

  return filteredTodos;
}

export const todoController = {
  get,
  filterTodosByContent,
};
