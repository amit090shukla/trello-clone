export interface BoardInterface {
  id: number;
  name: string;
  list: Array<ListInterface>;
}

export interface ListInterface {
  id: number;
  title: string;
  description:string
}