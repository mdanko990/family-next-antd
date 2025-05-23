import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Flex, Form, Input, Popconfirm, Select, Space, Table } from 'antd';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import palette from '../lib/color-palette';

const EditableRow = ({ index, ...props }: any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

type FormControlType = "select" | "selectSearch" | "inputText" | "inputNumber" | "date" | "textarea" | "switch"

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  controlType: FormControlType;
  options?: any[];
  dataIndex: any;
  record: any;
  handleSave: (record: any) => void;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  controlType,
  options,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  const renderFormItem = () => {
          switch(controlType){
            case "selectSearch":
              return <Select
                  showSearch
                  allowClear
                  placeholder={"First name"}
                  options={options?.map(item=>({...item, label: item.name, value: item.name}))}
                  onSelect={save} onBlur={save}
                  // onSelect={(value: any, option: any)=>form.setFieldValue(["members", field.key, "firstName"], option)}
              />
            case "inputText":
            default:
              return <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          }
  }

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        // rules={[{ required: true }]}
      >
        { renderFormItem() }
      </Form.Item>
    ) : (
      <div
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditMode = "cell" | "row" | "all" | "none";
type RowAction = "edit" | "delete";

interface DataTableProps {
  data: any[],
  defaultColumns: any[],
  mode?: EditMode,
  actions?: RowAction[],
  title?: string,
  footer?: ReactNode,
  save?: (value: any) => void
  remove?: (value: any) => void
}

const DataTable2 = ({data, defaultColumns, mode, actions, remove, save}: DataTableProps) => {
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [columns, setColumns] = useState(defaultColumns);
  const [components, setComponents] = useState<any>(null);
  const [rowForm] = Form.useForm();
  const [editingRowKey, setEditingRowKey] = useState<any>('');

  const isRowEditing = (record: any) => record.key === editingRowKey;

  const editRow = (record: Partial<any> & { key: React.Key }) => {
    rowForm.setFieldsValue({ /*name: '', age: '', address: '', */...record });
    setEditingRowKey(record.key);
  };

  const cancelRow = () => {
    setEditingRowKey('');
  };

  const handleDelete = (record: any) => {
    remove?remove(record._id): console.log("delete", record._id);
  };

  useEffect(()=>{
    const newColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      console.log(col.key)
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: mode==="cell"?col.editable:isRowEditing(record),
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });
    if(actions?.length) {
      newColumns.push(
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_: any, record: any) => {
            const editable = isRowEditing(record);
            return (
              <>
              {
                editable && save ? (
                  <Flex gap={8}>
                    <Check size={18} color={palette.grey} style={{cursor: "pointer"}} onClick={() => save(record)}/>
                    <X onClick={cancelRow} />
                  </Flex>
                ) : (
                  <Pencil size={18} color={editingRowKey !== ''?palette.lightGrey:palette.grey} style={{cursor: "pointer"}} onClick={editingRowKey !== ''?undefined:() => editRow(record)}/>
                )
              }
              {
                remove ? (
                <Popconfirm
                    title="Delete the status"
                    onConfirm={()=>handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Trash2 size={18} color={palette.grey} style={{cursor: "pointer"}}/>
                </Popconfirm>
                ) : null
              }
              </>
            )
          },
        },
      )
    }
    setDataSource(data);
    setColumns(newColumns)
  }, [defaultColumns, data]);

  useEffect(()=>{
    switch(mode) {
      case "cell":
        setComponents({
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        });
        break;
      case "row":
        setComponents({
          body: { cell: EditableCell },
        });
      case "all":
      case "none":
      default:
        setComponents(null);
    }
  }, [])

  const handleSave = (row: any) => {
    save?save(row): console.log("save", row);
    mode==="row"? setEditingRowKey(''):null;
    
  };

  return (
    <div>
      <Table
      size='small'
        components={components}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default DataTable2