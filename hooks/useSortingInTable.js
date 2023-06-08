import { useState } from 'react';

function getDefaultSorting(tableData, columns) {
  const sorted = [...tableData].sort((a, b) => {
    const columnFiltered = columns.filter((column) => column.sortbyOrder);

    let { field = 'start', sortbyOrder = 'ASC' } = Object.assign(
      {},
      ...columnFiltered
    );

    if (a[field] === null || typeof a[field] === 'undefined') return 1;
    if (b[field] === null || typeof b[field] === 'undefined') return -1;
    if ((a[field] === null || typeof a[field] === 'undefined') && (b[field] === null || typeof b[field] === 'undefined')) return 0;

    const ascending = a[field]
      .toString()
      .localeCompare(b[field].toString(), 'uk', {
        numeric: true,
      });

    return sortbyOrder === 'asc' ? ascending : -ascending;
  });

  return sorted;
}

const useSortingInTable = (data, columns) => {
  const [tableData, setTableData] = useState(getDefaultSorting(data, columns));

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null || typeof a[sortField] === 'undefined') return 1;
        if (b[sortField] === null || typeof b[sortField] === 'undefined') return -1;
        if ((a[sortField] === null || typeof a[sortField] === 'undefined') && (b[sortField] === null || typeof b[sortField] === 'undefined')) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'uk', {
            numeric: true,
          }) * (sortOrder === 'ASC' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return [tableData, handleSorting];
};

export default useSortingInTable;