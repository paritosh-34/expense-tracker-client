import { baseApiReturn } from '.';

export interface IExpense {
  _id: string;
  date: string;
  title: string;
  expense: number;
  state: string;
  __v: number;
}

export interface AllExpenses extends baseApiReturn {
  data: IExpense[];
}
