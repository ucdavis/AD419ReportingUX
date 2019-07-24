import * as React from 'react';
import { ITotalExpensesByDept } from './types';

interface IProps {
  totalExpenses: ITotalExpensesByDept[];
}

export default function MoneyTotals(props: IProps) {
  if (!props.totalExpenses || props.totalExpenses.length < 1) {
    return null;
  }
  const expenses = props.totalExpenses.map(x => (
    <tr key={x[''].valueOf()}>
      <td>{x[''].valueOf()}</td>
      <td>{x.SPENT}</td>
      <td>{x.FTE}</td>
      <td>{x.RECS}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Money Totals</h3>
      <table>
        <thead>
          <tr>
            <th />
            <th>SPENT</th>
            <th>FTE</th>
            <th>RECS</th>
          </tr>
        </thead>
        <tbody>{expenses}</tbody>
      </table>
    </div>
  );
}
