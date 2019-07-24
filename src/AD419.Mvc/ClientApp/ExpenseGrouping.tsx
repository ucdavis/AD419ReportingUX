import React from 'react';
import { IExpensesByRecordGrouping } from './types';

interface IProps {
  expenses: IExpensesByRecordGrouping[];
}

export default function ExpenseGrouping(props: IProps) {
  if (!props || !props.expenses) {
    return null;
  }

  const expensesList = props.expenses.map((x, i) => (
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
