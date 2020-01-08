export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";

export const RENAME_BOARD_NAME = "RENAME_BOARD_NAME";
export const EDIT_LIST_ITEM_TITLE = "EDIT_LIST_ITEM_TITLE";
export const ADD_LIST_ITEMS = "ADD_LIST_ITEMS";
export const REMOVE_LIST_ITEMS = "REMOVE_LIST_ITEMS";
export const SET_INITIAL_DATA = "SET_INITIAL_DATA";
export const MOVE_LIST_ITEM = "MOVE_LIST_ITEM";

export interface DNDProps {
  droppableId: string;
  index: number;
}

export const addBoard = () => {
  return {
    type: ADD_BOARD
  };
};
export const setInitialData = (data: any) => {
  return {
    type: SET_INITIAL_DATA,
    payload: data
  };
};
export const removeBoard = (id: number) => {
  return {
    type: REMOVE_BOARD,
    payload: {
      id
    }
  };
};
export const addItem = (boardId: number) => {
  return {
    type: ADD_LIST_ITEMS,
    payload: {
      boardId
    }
  };
};
export const removeItem = (boardId: number, listId: number) => {
  return {
    type: REMOVE_LIST_ITEMS,
    payload: {
      boardId,
      listId
    }
  };
};
export const renameBoardName = (id: number, name: string) => {
  return {
    type: RENAME_BOARD_NAME,
    payload: { id, name }
  };
};
export const moveListItem = (
  source: DNDProps,
  destination: DNDProps,
  listItemId: string
) => {
  return {
    type: MOVE_LIST_ITEM,
    payload: { source, destination, listItemId }
  };
};

export const editListTitle = (
  boardId: number,
  listId: number,
  title: string
) => {
  return {
    type: EDIT_LIST_ITEM_TITLE,
    payload: { boardId, listId, title }
  };
};
