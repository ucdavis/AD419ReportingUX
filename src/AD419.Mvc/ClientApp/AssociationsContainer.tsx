import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpenseGrouping from './ExpenseGrouping';
import MoneyTotals from './MoneyTotals';
import { IDepartments, ITotalExpensesByDept } from './types';

export default function AssociationsContainer() {
  // list of departments
  const [departmentList, setDepartmentList] = useState<IDepartments[]>([]);
  // selected department's OrgR
  const [department, changeDepartment] = useState<string>('');
  // total expenses by department, controlled by department.OrgR
  const [totalExpenses, changeTotalExpenses] = useState<ITotalExpensesByDept[]>(
    []
  );

  useEffect(() => {
    const fetchDeps = async () => {
      const deps = await axios('/api/GetDepartments');
      setDepartmentList(deps.data);
      changeDepartment(deps.data[0].OrgR);
    };
    fetchDeps();
  }, []);

  useEffect(() => {
    const fetchTotalExpensesByDept = async () => {
      const expenses = await axios(
        `/api/getTotalExpensesByDept?OrgR=${department}`
      );
      changeTotalExpenses(expenses.data);
    };
    fetchTotalExpensesByDept();
  }, [department]);

  const departmentOptions = departmentList.map(x => (
    <option key={x.OrgR} value={x.OrgR}>
      {x['Org-Dept']}
    </option>
  ));

  return (
    <div>
      <h1>Associations</h1>
      <h3>Department:</h3>
      <select onChange={e => changeDepartment(e.target.value)}>
        {departmentOptions}
      </select>
      <ExpenseGrouping orgR={department} />
      <MoneyTotals totalExpenses={totalExpenses} />
    </div>
  );
}
