import TextInput from './TextInput';

export default function Table(props) {
  const { ths, trs, onChangeInput } = props;
  console.log('>>>TRS', trs);
  return (
    <table className="border-separate border-spacing-y-2 text-sm">
      <thead className="text-black dark:text-white hidden md:table-header-group">
        <tr>
          {ths.map((th, index) => (
            <th key={index} className="p-3 text-left">
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trs.map((tr, index) => (
          <tr className="tr-class" key={index}>
            {tr.tds.map((td, index) => (
              <td key={index} className="td-class" width={td.width}>
                {td.checked ? (
                  <TextInput
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
