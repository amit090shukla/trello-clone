import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { MdClose } from "react-icons/md";
import { renameBoardName, removeBoard, addItem } from "../actions";
import ListItem from "./ListItem";
import { connect } from "react-redux";
import { BoardInterface } from "../utils/board";

interface Props {
  data: BoardInterface;
  renameBoardName: (id: number, name: string) => void;
  removeBoard: (id: number) => void;
  addItem: (id: number) => void;
}
const Board: React.FC<Props> = props => {
  const handleBoardNameChange = (id: number, name: string) => {
    props.renameBoardName(id, name);
  };
  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "lightblue" : "transparent",
    padding: 8,
    width: 250
  });
  return (
    <Droppable droppableId={props.data.id.toString()}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className="flex border-gray-400 p-6 shadow-lg m-4 w-1/3 flex-col cursor-pointer"
        >
          <div className="flex justify-between w-full items-center border-b-2 pb-2 mb-2">
            <input
              value={props.data.name}
              placeholder="Board Name"
              className="flex-1 font-medium text-gray-800 text-lg outline-none"
              onChange={e =>
                handleBoardNameChange(props.data.id, e.target.value)
              }
            ></input>
            <MdClose
              className="cursor-pointer ml-4"
              onClick={() => props.removeBoard(props.data.id)}
            />
          </div>
          <div className="flex flex-col">
            {props.data.list.length > 0 &&
              props.data.list.map(item => (
                <ListItem
                  key={item.id}
                  listData={item}
                  listId={item.id}
                  boardId={props.data.id}
                />
              ))}
          </div>
          <div className="flex w-full justify-center align-middle mt-2">
            <button
              className="border p-1 pl-4 pr-4 rounded-lg"
              onClick={() => props.addItem(props.data.id)}
            >
              Add Item
            </button>
          </div>
        </div>
      )}
    </Droppable>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  renameBoardName: (id: number, name: string) =>
    dispatch(renameBoardName(id, name)),
  removeBoard: (id: number) => dispatch(removeBoard(id)),
  addItem: (id: number) => dispatch(addItem(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
