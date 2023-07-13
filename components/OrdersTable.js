import { useState } from 'react';
import classNames from 'classnames';
import useSortingInTable from '@/hooks/useSortingInTable';

export default function OrdersTable({ data, columns }) {
  const [tableData, handleSorting] = useSortingInTable(data, columns);
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('ASC');

  const handleSortingChange = (field) => {
    const sortOrder = field === sortField && order === 'ASC' ? 'DESC' : 'ASC';
    setSortField(field);
    setOrder(sortOrder);
    handleSorting(field, sortOrder);
  };

  return (
    <table className="table-lines">
      <thead className="thead-transparent">
        <tr>
          {columns.map(({ label, field }) => {
            const cl =
              typeof field !== 'undefined'
                ? sortField === field && order === 'ASC'
                  ? 'up'
                  : sortField === field && order === 'DESC'
                  ? 'down'
                  : 'default'
                : '';
            return (
              <th
                key={field}
                onClick={
                  typeof field !== 'undefined'
                    ? () => handleSortingChange(field)
                    : null
                }
                className={`${cl} p-3 text-left cursor-pointer`}
              >
                {label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id} className="tr-class">
              {columns.map(({ field }) => {
                const tData = data[field] ? data[field] : '——';
                return (
                  <td
                    key={field}
                    className={classNames({
                      'td-class': true,
                      processing: tr.taskStatus === 2,
                      done: tr.taskStatus === 1,
                      canceled: tr.taskStatus === 0,
                    })}
                  >
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
