'use client'
import DataTable from '../../../components/table'
import { useEffect, useState } from 'react'
import { createLastName, deleteLastName, getAllLastNames, updateLastName } from '../../../lib/lastnames'
import { lastNameColumns } from './lastnames.table.conf'
import { LastName } from '@/models/name'
import { Button, message } from 'antd'
import CreateLastnameForm from './create-lastname.form'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const LastNamesTab = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<LastName[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    refreshData();
  },[])

  const refreshData = () => {
    getAllLastNames()
    .then((res) => {
        setData(res)
    })
  }

  const addRow = (newRow: LastName) => {
    createLastName(newRow)
    .then(()=>{
      refreshData();
      setOpen(false);
    })
    .catch((error)=>{
      messageApi.error(error)
    })
  }

  const editRow = (row: LastName) => {
    updateLastName(row)
    .then(()=>{
      refreshData();
    })
    .catch((error)=>{
      messageApi.error(error)
    })
  }

  const deleteRow = (id: string) => {
    deleteLastName(id)
    .then(()=>{
      refreshData();
    })
    .catch((error)=>{
      messageApi.error(error)
    })
  }

  const tableFooter = () => {
    return open
          ? <CreateLastnameForm save={addRow}/>
          : undefined;
  }
  
  return (
    <>
    <div>
      <DataTable
      data={data}
      columns={lastNameColumns(editRow, deleteRow)}
      style={{width: "500px"}}
      footer={tableFooter}
      />
        {open?
          <Button variant="outlined" className='w-full' icon={<CloseOutlined/>} onClick={()=>setOpen(false)}>
            Cancel
          </Button>
          :<Button variant="outlined" className='w-full' icon={<PlusOutlined/>} onClick={()=>setOpen(true)}>
            Add
          </Button>
        }
    </div>
    {contextHolder}
    </>
  )
}

export default LastNamesTab;