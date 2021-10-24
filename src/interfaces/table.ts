export type Order = 'asc' | 'desc';

export interface Data {
  name: string;
  _id: string;
}

export interface EnhancedTableProps<T extends Data> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T & string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell<T extends Data> {
  disablePadding: 'checkbox' | 'none' | 'normal';
  id: keyof T & string;
  label: string;
  numeric: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (data: any) => string;
}
