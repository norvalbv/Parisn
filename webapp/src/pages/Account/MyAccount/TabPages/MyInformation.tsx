import useUser from '../../../../hooks/useUser';

const MyInformation = () => {
  const { user } = useUser();

  return (
    <div className="w-full">
      <h4 className="underline"> My Information</h4>
      <table className="my-4 w-95">
        <tr className="divide-x">
          <th className="p-2">username</th>
          <td className="p-2">{user.username}</td>
        </tr>
        <tr className="divide-x">
          <th className="p-2">Name</th>
          <td className="p-2">
            {user.firstName} {user.lastName}
          </td>
        </tr>
        <tr className="divide-x">
          <th className="p-2">Email Address</th>
          <td className="p-2">{user.email}</td>
        </tr>
      </table>
    </div>
  );
};

export default MyInformation;
