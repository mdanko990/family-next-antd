'use client'
import DataTable from '../components/table'
import { useEffect, useState } from 'react'
import { getAllLastNames } from '../lib/lastnames'
import { lastNameColumns } from './lastnames.table.conf'

const url = 'http://localhost:5000/dictionary/lastnames';
 
const LastNamesTab = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getAllLastNames()
    .then((res) => {
        setData(res)
    })
  },[]) 
  
  return <DataTable data={data} columns={lastNameColumns}/>
}

export default LastNamesTab;