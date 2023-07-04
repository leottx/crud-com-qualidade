interface TodoRepositoryParams {
  page: number;
  limit: number;
}

interface TodoRepositoryOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

// Model ou Schema
interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

function get({
  page,
  limit,
}: TodoRepositoryParams): Promise<TodoRepositoryOutput> {
  return fetch(`/api/todos?page=${page}&limit=${limit}`).then(async (res) => {
    const todosString = await res.text();
    const responseParsed = parseTodosFromServer(JSON.parse(todosString));

    return {
      todos: responseParsed.todos,
      total: responseParsed.total,
      pages: responseParsed.pages,
    };
  });
}

function parseTodosFromServer(responseBody: unknown): {
  total: number;
  pages: number;
  todos: Array<Todo>;
} {
  if (
    responseBody !== null &&
    typeof responseBody === "object" &&
    "total" in responseBody &&
    "pages" in responseBody &&
    "todos" in responseBody &&
    Array.isArray(responseBody.todos)
  ) {
    return {
      total: Number(responseBody.total),
      pages: Number(responseBody.pages),
      todos: responseBody.todos.map((todo: unknown) => {
        if (todo === null && typeof todo !== "object") {
          throw new Error("Invalid todo from API");
        }

        const { id, content, date, done } = todo as {
          id: string;
          content: string;
          date: string;
          done: string;
        };

        return {
          id,
          content,
          done: String(done).toLowerCase() === "true",
          date: new Date(date),
        };
      }),
    };
  }

  return {
    pages: 1,
    total: 0,
    todos: [],
  };
}

export const todoRepository = {
  get,
};
