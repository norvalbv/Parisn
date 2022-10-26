import { TableParamsProps } from '../Types';

export const TableParams = ({
  TableName = 'Products',
  Key = { ID: '1', Category: 'Shoes' },
}: TableParamsProps) => {
  return {
    TableName,
    Key,
  };
};
