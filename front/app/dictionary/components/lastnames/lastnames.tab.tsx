'use client'
import DataTable from '../../../components/table'
import { useEffect, useState } from 'react'
import { createLastName, deleteLastName, getAllLastNames, updateLastName } from '../../../lib/lastnames'
import { lastNameColumns } from './lastnames.table.conf'
import { LastName } from '@/models/name'
import { Button } from 'antd'
import CreateLastnameForm from './create-lastname.form'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';


const LastNamesTab = () => {
  const [data, setData] = useState<LastName[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllLastNames()
    .then((res) => {
        setData(res)
    })
  },[])

  const addRow = (newRow: LastName) => {
    createLastName(newRow);
    setData([...data, newRow]);
    setOpen(false);
  }

  const editRow = (row: LastName) => {
    updateLastName(row);
    const newData = data.map(item => {
      if(item._id === row?._id) {
        item.male = row.male;
        item.female = row.female;
      }
      return item;
    })
    setData(newData);
  }

  const deleteRow = (id: string) => {
    deleteLastName(id);
    const newData = data.filter(item => item._id != id);
    setData(newData);
  }

  const tableFooter = () => {
    return open
          ? <CreateLastnameForm save={addRow}/>
          : undefined;
  }
  
  return (
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
  )
}

export default LastNamesTab;