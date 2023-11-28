import React from 'react';

interface tableRow {
  label: string;
  uncontrolledData: string | null;
  controlledData?: string | null;
}

export const dataFields = [
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'E-mail', key: 'email' },
  { label: 'Password', key: 'password' },
  { label: 'Gender', key: 'gender' },
  { label: 'Accept', key: 'accept' },
  { label: 'File', key: 'file' },
  { label: 'Country', key: 'country' },
];

export const TableRow = ({
  label,
  uncontrolledData,
  controlledData,
}: tableRow) => (
  <tr>
    <td>{label}:</td>
    <td>{uncontrolledData}</td>
    <td>{controlledData}</td>
  </tr>
);
