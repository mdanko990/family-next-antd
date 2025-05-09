'use client'

import DataTable from '../../../components/table'
import { firstNameGroupColumns } from './firstname-group.table.conf'
import { useEffect, useState } from 'react'
import { createFirstName, deleteFirstName, getAllFirstNames, getAllFirstNamesByGender, getAllFirstNamesByGroups, getAllFirstNamesByNames, updateFirstName } from '../../../lib/firstnames'
import { FirstName } from '@/models/name'
import CreateFirstNameForm from './create-firstname.form'
import { Button, Space, Switch } from 'antd'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { firstNameColumns } from './firstname.table.conf'
 
const FirstNamesTab = () => {
    const [data, setData] = useState<FirstName[]>([]);
    const [columns, setColumns] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [grouped, setGrouped] = useState(false);
    const [groups, setGroups] = useState([]);
    const [names, setNames] = useState([]);

  useEffect(() => {
      getAllFirstNamesByGroups()
      .then((res)=>{
        setGroups(res);
      })
      getAllFirstNamesByNames()
      .then((res)=>{
        setNames(res);
        setData(res);
      });
  },[]);

  useEffect(() => {
    if(grouped){
        setData(groups);
        setColumns(firstNameGroupColumns(editRow, deleteRow));
    } else {
        setData(names)
        setColumns(firstNameColumns(editRow, deleteRow));
    }
  },[grouped]);

  const addRow = (newRow: FirstName) => {
    createFirstName(newRow).then((res)=>{
        setData([...data, {...newRow, _id: res._id}]);
    })
  }

  const editRow = (row: FirstName) => {
    updateFirstName(row);
    const newData = data.map(item => {
      if(item._id === row?._id) {
        item.name = row.name;
      }
      return item;
    })
    setData(newData);
  }

  const deleteRow = (id: string) => {
    deleteFirstName(id);
    const newData = data.filter(item => item._id != id);
    setData(newData);
  }

  const tableFooter = () => {
    return open
          ? <CreateFirstNameForm groups={groups} save={(data: FirstName)=>{addRow({...data, gender: "M"});setOpen(false)}}/>
          : undefined;
  }

  const handleTableSwitch = () => {
    setGrouped(!grouped);
  }

    return (
        <div>
          <Space className='flex align-center'>

          <Switch size="small" checked={grouped} onClick={handleTableSwitch}/>
          {grouped? "Grouped": "Ungrouped"}
          </Space>
        <DataTable
        data={data}
        columns={columns}
        style={{width: "700px"}}
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

export default FirstNamesTab;