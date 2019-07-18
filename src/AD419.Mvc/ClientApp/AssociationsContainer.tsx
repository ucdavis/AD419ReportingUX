import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpenseGrouping from './ExpenseGrouping';
import MoneyTotals from './MoneyTotals';
import { IDepartments } from './types';

export default function AssociationsContainer() {
  const [departments, setDepartments] = useState<IDepartments[]>([]);

  useEffect(() => {
    const fetchDeps = async () => {
      const deps = await axios('/api/getdepartments');
      setDepartments(deps.data);
    };
    fetchDeps();
  }, []);

  const departmentList = departments.map(x => <li key={x.orgR}>{x.orgR}</li>);
  return (
    <div>
      <h1>Associations</h1>
      <h3>Department:</h3>
      <ul>{departmentList}</ul>
      <ExpenseGrouping />
      <MoneyTotals />
    </div>
  );
}
