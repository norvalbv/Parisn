type TableName = 'Products';
type Key_ID = string | null;
type KEY_Category = string;

export interface TableParamsProps {
  TableName?: TableName;
  Key?: { ID?: Key_ID; Category?: KEY_Category };
}
