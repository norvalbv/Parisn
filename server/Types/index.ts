type TableName = 'Products';
type Key_ID = '1' | '2' | '3' | '4';
type KEY_Category = 'Shoes';

export interface TableParamsProps {
  TableName?: TableName;
  Key?: { ID?: Key_ID; Category?: KEY_Category };
}
