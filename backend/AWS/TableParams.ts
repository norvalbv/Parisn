import { TableParamsProps } from '../Types';

export const TableParams = ({ TableName = 'Products', Key }: TableParamsProps) => {
  return {
    TableName,
    Key,
  };
};

export const ScanParams = (collection: string) => {
  const capitalizeFirstLetter = collection.charAt(0).toUpperCase() + collection.slice(1);
  return {
    TableName: 'Products',
    FilterExpression: 'Category = :Collection',
    ExpressionAttributeValues: {
      ':Collection': capitalizeFirstLetter,
    },
  };
};
