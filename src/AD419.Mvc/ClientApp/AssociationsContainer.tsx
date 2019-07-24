import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpenseGrouping from './ExpenseGrouping';
import MoneyTotals from './MoneyTotals';
import { IDepartments, ITotalExpensesByDept } from './types';

export default function AssociationsContainer() {
  const [departments, setDepartments] = useState<IDepartments[]>([]);
  const [department, changeDepartment] = useState<string>('');
  const [totalExpenses, setTotalExpenses] = useState<ITotalExpensesByDept[]>(
    []
  );

  useEffect(() => {
    const fetchDeps = async () => {
      const deps = await axios('/api/GetDepartments');
      setDepartments(deps.data);
      changeDepartment(deps.data[0].OrgR);
    };
    fetchDeps();
  }, []);

  useEffect(() => {
    const fetchTotalExpensesByDept = async () => {
      const expenses = await axios(
        `/api/getTotalExpensesByDept?OrgR=${department}`
      );
      setTotalExpenses(expenses.data);
    };
    fetchTotalExpensesByDept();
  }, [department]);

  const departmentList = departments.map(x => (
    <option key={x.OrgR} value={x.OrgR}>
      {x['Org-Dept']}
    </option>
  ));

  return (
    <div>
      <h1>Associations</h1>
      <h3>Department:</h3>
      <select onChange={e => changeDepartment(e.target.value)}>
        {departmentList}
      </select>
      <ExpenseGrouping />
      <MoneyTotals totalExpenses={totalExpenses} />
    </div>
  );
}
