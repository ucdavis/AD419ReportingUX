import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpenseGrouping from './ExpenseGrouping';
import MoneyTotals from './MoneyTotals';
import {
  IDepartments,
  IExpensesByRecordGrouping,
  ITotalExpensesByDept
} from './types';

export default function AssociationsContainer() {
  // list of departments
  const [departmentList, setDepartmentList] = useState<IDepartments[]>([]);
  // selected department's OrgR
  const [orgR, changeOrgR] = useState<string>('');
  // total expenses by department, controlled by department.OrgR
  const [totalExpenses, changeTotalExpenses] = useState<ITotalExpensesByDept[]>(
    []
  );
  // expenses grouped by org, PI, etc. used to populate expense grouping table
  const [groupedExpenses, changeGroupedExpenses] = useState<
    IExpensesByRecordGrouping[]
  >([]);

  useEffect(() => {
    const fetchDeps = async () => {
      const deps = await axios('/api/GetDepartments');
      setDepartmentList(deps.data);
      changeOrgR(deps.data[0].OrgR);
    };
    fetchDeps();
  }, []);

  useEffect(() => {
    const fetchTotalExpensesByDept = async () => {
      const expenses = await axios(`/api/getTotalExpensesByDept?OrgR=${orgR}`);
      changeTotalExpenses(expenses.data);
    };
    fetchTotalExpensesByDept();
  }, [orgR]);

  const grouping = 'Organization';
  const associated = 0;
  const unassociated = 1;
  useEffect(() => {
    const fetchGroupedExpenses = async () => {
      const expensesObj = await axios(
        `/api/GetExpensesByRecordGrouping?Grouping=${grouping}
          &OrgR=${orgR}
          &Associated=${associated}
          &Unassociated=${unassociated}`
      );
      changeGroupedExpenses(expensesObj.data);
    };
    fetchGroupedExpenses();
  }, [orgR]);

  const departmentOptions = departmentList.map(x => (
    <option key={x.OrgR} value={x.OrgR}>
      {x['Org-Dept']}
    </option>
  ));

  return (
    <div>
      <h1>Associations</h1>
      <h3>Department:</h3>
      <select onChange={e => changeOrgR(e.target.value)}>
        {departmentOptions}
      </select>
      <ExpenseGrouping expenses={groupedExpenses} />
      <MoneyTotals totalExpenses={totalExpenses} />
    </div>
  );
}
