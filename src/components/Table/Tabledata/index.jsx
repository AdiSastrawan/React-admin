function Td({ className = "", children, key }) {
  return (
    <td className={"table-cell  border-secondary py-1 px-2 text-center text-base border-y-2" + className} key={key}>
      {children}
    </td>
  );
}

export default Td;
