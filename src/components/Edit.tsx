// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { editTodo } from "../redux/todoSlice";


function Edit(todo: { id: string; description: string; title: string; status: string }) {
    //React Hooks
    const [todoDescription, setTodoDescription] = useState(todo.description);
    const [todoTitle, setTodoTitle] = useState(todo.title);
    //React Redux Hooks
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();




    //Rendering
    return (
        <Container maxWidth="xl" style={{ alignContent: "center", width: "50%", padding: "10px" }}>
            <TextField
                variant="outlined"
                label="Title of the tasks"
                fullWidth
                onChange={(e) => setTodoTitle(e.target.value)}
                value={todoTitle}
                style={{ padding: "10px" }}
            />
            <TextField
                variant="outlined"
                label="Write something here"
                fullWidth
                onChange={(e) => setTodoDescription(e.target.value)}
                value={todoDescription}
                style={{ padding: "10px" }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                    dispatch(editTodo({description: todoDescription,id: todo.id,title: todoTitle}));
                    setTodoDescription("");
                }}
                style={{ padding: "10px" }}
            >
                Edit
            </Button>
        </Container>
    );
}

export default Edit