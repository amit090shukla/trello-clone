import React from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { editListTitle, removeItem } from "../actions";
import { MdCancel } from "react-icons/md";
import { ListInterface } from "../utils/board";

interface Props {
  listData: ListInterface;
  boardId: number;
  listId: number;
  editListTitle: (boardId: number, listId: number, title: string) => void;
  removeItem: (boardId: number, listId: number) => void;
}
const ListItem: React.FC<Props> = props => {
  const handleListTitleChange = (e: any) => {
    e.persist();
    const newTitle = e.target.value;
    const boardId = props.boardId;
    const listId = props.listData.id;
    props.editListTitle(boardId, listId, newTitle);
  };

  const removeListItem = () => {
    props.removeItem(props.boardId, props.listData.id);
  };
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    borderBottom: `1px solid #d2d2d2`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "transparent",

    // styles we need to apply on draggables
    ...draggableStyle
  });
  return (
    <Draggable
      key={props.listId}
      draggableId={props.listId.toString()}
      index={props.listId}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="flex justify-between items-center pt-1 pb-1"
        >
          <input
            className="flex text-gray-600 mb-2 flex-1 mr-2"
            value={props.listData.title}
            onChange={handleListTitleChange}
            placeholder="Enter Data"
          ></input>
          <MdCancel
            className="text-gray-600 cursor-pointer"
            onClick={removeListItem}
          />
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  editListTitle: (boardId: number, listId: number, title: string) =>
    dispatch(editListTitle(boardId, listId, title)),
  removeItem: (boardId: number, listId: number) =>
    dispatch(removeItem(boardId, listId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
