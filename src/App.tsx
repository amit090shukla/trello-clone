import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/Header";
import { connect } from "react-redux";
import { addBoard, setInitialData, moveListItem, DNDProps } from "./actions";
import Board from "./components/Board";
import { BoardInterface } from "./utils/board";

interface IProps {
  boards: Array<BoardInterface>;
  addBoard: () => void;
  setInitialData: (data: any) => void;
  moveListItem: (source: DNDProps, dest: DNDProps, listId: string) => void;
}

const App: React.FC<IProps> = props => {
  useEffect(() => {
    getInitialBoardData();
  }, []);

  const getInitialBoardData = async () => {
    const response = await fetch("http://localhost:8080/v1/boards", {
      method: "GET"
    });
    const res = await response.json();
    props.setInitialData(res.data);
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    props.moveListItem(source, destination, draggableId);
  };

  return (
    <div>
      <Header />
      <div className='flex flex-no-wrap overflow-y-scroll items-baseline'>
        {props.boards.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            {props.boards.map(board => (
              <Board key={board.id} data={board} />
            ))}
          </DragDropContext>
        ) : (
          <span>Loading...</span>
        )}
      </div>
      <button onClick={props.addBoard}>Add Board</button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  boards: state.main
});

const mapDispatchToProps = (dispatch: any) => ({
  addBoard: () => dispatch(addBoard()),
  setInitialData: (data: any) => dispatch(setInitialData(data)),
  moveListItem: (source: DNDProps, dest: DNDProps, listId: string) =>
    dispatch(moveListItem(source, dest, listId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
