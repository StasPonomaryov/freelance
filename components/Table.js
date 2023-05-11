export default function Table(props) {
  const { ths, trs } = props;

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
            {tr.map((td, index) => (
              <td key={index} className="td-class">
                {td}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
