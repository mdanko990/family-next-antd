import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import type { FormInstance, GetRef, InputRef, TableProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';

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

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: any;
  record: any;
  handleSave: (record: any) => void;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
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

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        // rules={[{ required: true }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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

const DataTable2 = ({title, data, footer,cols}: {cols: any[], title?: string, data: any[], footer?: ReactNode}) => {
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [defaultColumns, setDefaultColumns] = useState(cols)

  const handleDelete = (key: React.Key) => {
    console.log('delete')

  };

  useEffect(()=>{
    // console.log('COLUMNS', cols, data)
    // setDefaultColumns([...cols,{
    //     title: 'operation',
    //     dataIndex: 'operation',
    //     render: (_, record: any) =>
    //       dataSource.length >= 1 ? (
    //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //           <a>Delete</a>
    //         </Popconfirm>
    //       ) : null,
    //   }])
    setDataSource(data);
    setDefaultColumns(cols)
  }, [cols, data]);

  const handleAdd = () => {
    console.log('add')
  };

  const handleSave = (row: any) => {
    console.log('save')

  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    console.log(col.key)
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
      size='small'
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default DataTable2