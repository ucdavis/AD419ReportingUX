import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IExpensesByRecordGrouping } from './types';

interface IProps {
  orgR: string;
}

export default function ExpenseGrouping(props: IProps) {
  if (!props || !props.orgR) {
    return null;
  }
  const [expenses, changeExpenses] = useState<IExpensesByRecordGrouping[]>([]);
  const grouping = 'Organization';
  const associated = 0;
  const unassociated = 1;
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!props.orgR) {
        return null;
      }
      const expensesObj = await axios(
        `/api/GetExpensesByRecordGrouping?Grouping=${grouping}
          &OrgR=${props.orgR}
          &Associated=${associated}
          &Unassociated=${unassociated}`
      );
      changeExpenses(expensesObj.data);
    };
    fetchExpenses();
  }, [props.orgR]);

  const expensesList = expenses.map((x, i) => (
    <tr key={i}>
      <td>{x.Num}</td>
      <td>{x.Chart}</td>
      <td>{x.Code}</td>
      <td>{x.Description}</td>
      <td>{x.Spent}</td>
      <td>{x.FTE}</td>
    </tr>
  ));

  return (
    <div>
      <h3>Expense Grouping</h3>
      <table>
        <thead>
          <tr>
            <th />
            <th>Chart</th>
            <th>OrgCode</th>
            <th>OrgName</th>
            <th>Spent ($)</th>
            <th>FTE</th>
          </tr>
        </thead>
        <tbody>{expensesList}</tbody>
      </table>
    </div>
  );
}
