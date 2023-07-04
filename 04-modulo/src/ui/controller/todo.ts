import { todoRepository } from "@ui/repository/todo";

interface TodoCrontrollerParams {
  page?: number;
}

async function get({ page }: TodoCrontrollerParams = {}) {
  return todoRepository.get({ page: page || 1, limit: 10 });
}

export const todoController = {
  get,
};
