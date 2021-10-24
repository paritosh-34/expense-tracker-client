import { FC } from 'react';
import { Box } from '@mui/system';
import useFetch from '@hooks/useFetch';
import { endpoints } from '@constants/apiEndpoints';
import formatDate from '@utils/formatDate';
import Loading from '@components/Loading';
import MyTable from '@ui/MyTable';
import { AllExpenses, IExpense } from '@interfaces/expenses';
import { Data, HeadCell } from '@interfaces/table';

type INewData = Omit<IExpense, 'title'> & Data;

const getData = (data: IExpense[]): INewData[] => {
  return data.map((item) => {
    const { title: name, ...rest } = item;
    return { name, ...rest };
  });
};

const Expenses: FC = () => {
  const { data, loading } = useFetch<AllExpenses>(endpoints.allExpenses);

  if (!data || loading) return <Loading />;
  const newData = getData(data.data);

  const headCells: readonly HeadCell<INewData>[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: 'checkbox',
      label: 'Title',
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: 'normal',
      label: 'Date',
      formatter: formatDate,
    },
    {
      id: 'expense',
      numeric: true,
      disablePadding: 'normal',
      label: 'Expenses',
    },
    {
      id: 'state',
      numeric: false,
      disablePadding: 'normal',
      label: 'State',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      py={4}
    >
      {loading && <Loading />}

      <MyTable<INewData>
        tableTitle="Expenses"
        headCells={headCells}
        rows={newData}
        initialSortOrder="name"
      />
    </Box>
  );
};

export default Expenses;
