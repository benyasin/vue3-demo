import {createStore} from 'vuex'

type Todo = {
    id: number,
    title: string,
    completed: boolean,
}

type State = {
    todoList: Array<Todo>
}

const state: State = {
    todoList: []
};

const mutations = {
    createTodo(state: State, todo: Todo) {
        state.todoList.push(todo);
    },
    editTodo(state: State, todo: Todo) {
        const index = state.todoList.findIndex(
            item => item.id === todo.id
        );
        state.todoList[index] = todo;
    },
    removeTodo(state: State, id: number) {
        state.todoList = state.todoList.filter(
            item => item.id !== id
        );
    },
    removeCompleted(state: State, id: number) {
        state.todoList = state.todoList.filter(
            item => item.completed === false
        );
    },
    markAsAllDone(state: State, allCompleted: boolean) {
        state.todoList.forEach(
            item => item.completed = allCompleted
        );
    },
};

const getters = {
    allDone(state: State) {
        return !state.todoList.filter((todo: Todo) => todo.completed === false).length
    },
    remaining(state: State) {
        return state.todoList.filter((todo: Todo) => todo.completed === false).length
    },
    filteredTodoList(state: State) {
        return {
            all: () => state.todoList,
            active: () => state.todoList.filter((todo: Todo) => todo.completed === false),
            completed: () => state.todoList.filter((todo: Todo) => todo.completed === true)
        }
    }
}

export const store = createStore({
    state,
    mutations,
    getters,
    actions: {},
    modules: {},
});
