import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 as uuidv1 } from 'uuid';

interface Todo {
    id: string;
    done: boolean;
    text: string;
}

interface TodosSliceState {
    todos: Todo[];
}

const initialState: TodosSliceState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: 'reduxTodos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos = [
                ...state.todos,
                {
                    id: uuidv1(),
                    text: action.payload,
                    done: false,
                },
            ];
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(({ id }) => id !== action.payload);
        },
    },
});

export const { addTodo, removeTodo } = todosSlice.actions;

const store = configureStore({
    reducer: { todos: todosSlice.reducer },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;

export default store;
