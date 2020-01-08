import {
  RENAME_BOARD_NAME,
  ADD_BOARD,
  REMOVE_BOARD,
  EDIT_LIST_ITEM_TITLE,
  REMOVE_LIST_ITEMS,
  ADD_LIST_ITEMS,
  SET_INITIAL_DATA,
  MOVE_LIST_ITEM
} from "../actions/index";
import { BoardInterface, ListInterface } from "../utils/board";

let defaultListId = 7; //Based on dummy data

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case SET_INITIAL_DATA:
      return action.payload;
    case ADD_BOARD:
      return [
        ...state,
        {
          id: state.length + 1,
          name: `Untitled-${state.length + 1}`,
          list: []
        }
      ];
    case ADD_LIST_ITEMS:
      const bId = action.payload.boardId;
      const z = state.reduce((acc: any, currVal: any) => {
        if (currVal.id === bId) {
          return [
            ...acc,
            {
              ...currVal,
              list: [
                ...currVal.list,
                { id: defaultListId + 1, title: "", destination: "" }
              ]
            }
          ];
        } else {
          return [...acc, currVal];
        }
      }, []);
      defaultListId++;
      return z;

    case RENAME_BOARD_NAME:
      let boardId = action.payload.id;
      let newName = action.payload.name;
      let newState: Array<any> = state.map((board: any) => {
        if (board.id === boardId) {
          return { ...board, name: newName };
        } else {
          return board;
        }
      });
      return newState;

    case REMOVE_BOARD:
      let boardIdToRemove = action.payload.id;
      let updatedState = state.filter(
        (board: any) => board.id !== boardIdToRemove
      );
      return updatedState;

    case EDIT_LIST_ITEM_TITLE:
      let boardIdOfList = action.payload.boardId;
      let listId = action.payload.listId;
      let title = action.payload.title;
      const x = state.reduce((acc: any, currVal: any) => {
        if (currVal.id === boardIdOfList) {
          return [
            ...acc,
            {
              ...currVal,
              list: currVal.list.map((list: any) => {
                if (list.id === listId) {
                  return {
                    ...list,
                    title: title
                  };
                } else {
                  return list;
                }
              })
            }
          ];
        } else {
          return [...acc, currVal];
        }
      }, []);
      return x;

    case REMOVE_LIST_ITEMS:
      const y = state.reduce((acc: any, currVal: any) => {
        if (currVal.id === action.payload.boardId) {
          return [
            ...acc,
            {
              ...currVal,
              list: currVal.list.filter((l: any) => {
                return l.id !== action.payload.listId;
              })
            }
          ];
        } else {
          return [...acc, currVal];
        }
      }, []);
      return [...y];

    case MOVE_LIST_ITEM:
      const { source, destination, listItemId } = action.payload;
      console.log("object", action.payload, state);
      const sourceBoard = state.find((board: BoardInterface) => {
        console.log(board.id, +source.droppableId);
        return board.id === +source.droppableId;
      });
      const destBoard =
        source.droppableId === destination.droppableId
          ? sourceBoard
          : state.find(
              (board: BoardInterface) => board.id === +destination.droppableId
            );
      console.log("object", sourceBoard, destBoard);
      let listItem = {};
      let sourceListId = 0;
      let destListId = 0;
      sourceBoard.list.forEach((list: ListInterface, index: number) => {
        if (list.id === +listItemId) {
          listItem = list;
        }
        if (list.id === source.index) {
          sourceListId = index;
        }
      });
      destBoard.list.forEach((list: ListInterface, index: number) => {
        if (list.id === destination.index) {
          destListId = index;
        }
      });
      console.log("zz", sourceListId, destListId);
      sourceBoard.list.splice(sourceListId, 1);
      destBoard.list.splice(destListId, 0, listItem);
      console.log("object,2", sourceBoard, destBoard);
      return state.map((board: BoardInterface) => {
        if (board.id === sourceBoard.id) {
          return sourceBoard;
        } else if (board.id === destBoard.id) {
          return destBoard;
        }
        return board;
      });

    default:
      return state;
  }
};
