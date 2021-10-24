import { FC, useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { endpoints } from '@constants/apiEndpoints';
import apiService from '@services/apiService';
import formatDate from '@utils/formatDate';
import showToast from '@utils/showToast';
import Loading from '@components/Loading';
import MyTable from '@ui/MyTable';
import MyModal from '@ui/MyModal';
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<INewData[]>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);

    const r = await apiService<AllExpenses>(endpoints.allExpenses);
    if (r) setData(getData(r.data));

    setLoading(false);
  };

  useEffect(() => {
    void fetchExpenses();
  }, []);

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

  const handleDelete = async () => {
    const r = await apiService(endpoints.deleteExpenses, {
      ids: selected,
    });

    setOpen(false);
    setSelected([]);
    if (r) {
      showToast(r.message);
      void fetchExpenses();
    }
  };

  if (loading) return <Loading />;
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
        rows={data}
        initialSortOrder="name"
        selected={selected}
        setSelected={setSelected}
        handleDelete={() => setOpen(true)}
      />

      <MyModal
        open={open}
        title="Are you sure?"
        content="This action is irreversible"
        handleCancel={() => setOpen(false)}
        handleOk={() => handleDelete()}
      />
    </Box>
  );
};

export default Expenses;
