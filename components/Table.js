export const Table = ({ arr, index, waterIntake }) => {
  return (
    <table>
      {" "}
      <tr>
        <th>Recency</th>
        <th>Food I Ate</th>
        <th>Water Intake</th>
      </tr>
      <tr>
        <td>
          {index}
        </td>
        <td>
          <ul>
            {arr && arr.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </td>
        <td>{waterIntake} cups</td>
      </tr>
    </table>
  );
};

export default Table;
