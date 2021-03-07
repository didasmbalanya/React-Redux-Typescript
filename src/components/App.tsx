import React from "react";
import { connect } from "react-redux";
import { deleteTodo, fetchTodos, Todo } from "../actions";
import { StoreState } from "../reducers";

interface AppProps {
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
  todos: Todo[];
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      fetching: false,
    };
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onItemClick = (todo: Todo) => {
    this.props.deleteTodo(todo.id);
  };

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div
          key={todo.id}
          onClick={() => this.onItemClick(todo)}
          style={{ cursor: "grab" }}
        >
          {" "}
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch Todos</button>
        <p>Current todos number: {this.props.todos?.length}</p>
        {this.state.fetching && <p>Loading...</p>}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
