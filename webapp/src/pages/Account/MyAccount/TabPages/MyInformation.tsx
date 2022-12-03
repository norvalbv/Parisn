import HorizontalTable from '../../../../components/HorizontalTable';
import useUser from '../../../../hooks/useUser';

const MyInformation = () => {
  const { user } = useUser();

  return (
    <div className="w-full">
      <h4 className="underline"> My Information</h4>
      <div className="mt-4">
        <HorizontalTable title={{ TitleLabel: 'Username' }} value={{ ValueLabel: user.username }} />
        <HorizontalTable
          title={{ TitleLabel: 'Name' }}
          value={{ ValueLabel: `${user.firstName} ${user.lastName}` }}
        />
        <HorizontalTable
          borderBottomRequired={false}
          title={{ TitleLabel: 'Email' }}
          value={{ ValueLabel: user.email }}
        />
      </div>
    </div>
  );
};

export default MyInformation;
