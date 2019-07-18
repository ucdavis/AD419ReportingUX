import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpenseGrouping from './ExpenseGrouping';
import MoneyTotals from './MoneyTotals';
import { IDepartments } from './types';

export default function AssociationsContainer() {
  const [departments, setDepartments] = useState<IDepartments[]>([]);
  const [department, changeDepartment] = useState<string>('');

  useEffect(() => {
    const fetchDeps = async () => {
      const deps = await axios('/api/getdepartments');
      setDepartments(deps.data);
    };
    fetchDeps();
  }, []);

  const departmentList = departments.map(x => (
    <option key={x.orgR} value={x.orgR}>
      {x.orgR} ({x.orgName})
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
      <MoneyTotals />
    </div>
  );
}
