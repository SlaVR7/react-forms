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

function isBase64(str: string | null) {
  if (str) {
    const base64Regex = /^data:[A-Za-z0-9+/]+;base64,([A-Za-z0-9+/]|=(?![^"]))/;
    return base64Regex.test(str);
  }
}

export const TableRow = ({
  label,
  uncontrolledData,
  controlledData,
}: tableRow) => {
  return (
    <tr>
      <td>{label}:</td>
      {uncontrolledData && isBase64(uncontrolledData) ? (
        <td>
          <img src={uncontrolledData} alt="uploaded image" width={'200px'} />
        </td>
      ) : (
        <td>{uncontrolledData}</td>
      )}
      <td>{controlledData}</td>
    </tr>
  );
};
