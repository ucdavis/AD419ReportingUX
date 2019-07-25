import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { IExpensesByRecordGrouping } from './types';

interface IProps {
  expenses: IExpensesByRecordGrouping[];
}

export default function ExpenseGrouping(props: IProps) {
  if (!props || !props.expenses) {
    return null;
  }

  const columns = [
    {
      Header: props.expenses.length,
      accessor: 'Num',
      maxWidth: 100
    },
    {
      Header: 'Chart',
      accessor: 'Chart',
      maxWidth: 100
    },
    {
      Header: 'Code',
      accessor: 'Code'
    },
    {
      Header: 'Name',
      accessor: 'Description'
    },
    {
      Header: 'Spent',
      accessor: 'Spent'
    },
    {
      Header: 'FTE',
      accessor: 'FTE'
    }
  ];

  return <ReactTable data={props.expenses} columns={columns} />;
}
