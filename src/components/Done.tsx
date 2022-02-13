// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setTodoStatus } from "../redux/todoSlice";
import { useDrop } from "react-dnd";
import Card from "../components/Card";

function Done() {

    //React Redux Hooks
    const todoList = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "todo",
        drop: (todo: { id: string; status: string }) => {
            dispatch(setTodoStatus({ status: "done", id: todo.id }));
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));


    //Rendering
    return (
        <Container maxWidth="xs" style={{ display: "inline-table", alignContent: "center", width: "50%", padding: "10px" }} ref={drop}>
            <Typography style={{ textAlign: "center" }} variant="h5">
                Done List
            </Typography>
                {todoList.filter((todo) => todo.status == "done").map((todo) => (
                    <><Card id={todo.id} description={todo.description} status={todo.status} title={todo.title}/></>
                ))}
        </Container>
    );
}

export default Done