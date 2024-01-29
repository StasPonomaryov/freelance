import classNames from 'classnames';
import TableInput from './UI/TableInput';

export default function Table(props) {
  const { ths, trs, onChangeInput, onRowClick } = props;

  return (
    <table className="table-lines">
      <thead className="thead-transparent">
        <tr>
          {ths.map((th) => (
            <th key={th.field || th.label} className="th-class">
              {th.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trs.map((tr, index) => (
          <tr
            className="tr-class"
            key={index}
            onClick={() => onRowClick(tr.id)}
          >
            {tr.tds.map((td, index) => (
              <td
                key={index}
                className={classNames({
                  'td-class': true,
                  processing: tr.taskStatus === 2,
                  done: tr.taskStatus === 1,
                  canceled: tr.taskStatus === 0,
                  checked: tr.checked === true,
                })}
                width={td.width}
              >
                {td.checked ? (
                  <TableInput
                    id={tr.id}
                    value={td.cell}
                    name={td.label}
                    required={td.required}
                    onChangeInput={onChangeInput}
                  />
                ) : (
                  td.cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
