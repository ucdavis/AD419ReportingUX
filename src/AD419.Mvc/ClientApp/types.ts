export interface IDepartments {
  OrgR: string;
  'Org-Dept': string;
}

export interface ITotalExpensesByDept {
  '': string;
  SPENT: number;
  FTE: number;
  RECS: number;
}

export interface IExpensesByRecordGrouping {
  Chart: string;
  Code: string;
  Description: string;
  isAssociated: number;
  Spent: number;
  FTE: number;
  Num: number;
}
