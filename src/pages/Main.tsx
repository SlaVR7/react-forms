import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { dataFields, TableRow } from '../components/TableRow';

export function Main() {
  const uncontrolledData = useSelector(
    (state: RootState) => state.uncontrolledSlice
  );

  return (
    <>
      <header>
        <nav>
          <Link to="/controlled">Controlled</Link>
          <Link to="/uncontrolled">Uncontrolled</Link>
        </nav>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Input name</th>
              <th>Uncontrolled data</th>
              <th>Controlled data</th>
            </tr>
          </thead>
          <tbody>
            {dataFields.map(({ label, key }) => (
              <TableRow
                key={key}
                label={label}
                uncontrolledData={
                  uncontrolledData[key as keyof typeof uncontrolledData]
                }
              />
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
