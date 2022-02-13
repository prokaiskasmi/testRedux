import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

const initialState = [] as Todo[];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (description: string,title: string) => ({
        payload: {
          id: uuidv4(),
          title,
          description,
          status: "todo",
        } as Todo,
      }),
    },
    editTodo(
      state,
      action: PayloadAction<{ description: string; id: string ; title:string ; }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].description = action.payload.description;
      state[index].title = action.payload.title;
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(
      state,
      action: PayloadAction<{ status: string; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].status = action.payload.status;
    },
  },
});

export const { addTodo, removeTodo, setTodoStatus, editTodo} = todoSlice.actions;
export default todoSlice.reducer;
