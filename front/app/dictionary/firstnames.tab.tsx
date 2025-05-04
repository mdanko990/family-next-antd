'use client'
import { fetcher } from '@/helpers/fetcher.helper'
import useSWR from 'swr'
import DataTable from '../components/table'
import { firstNameColumns } from './firstnames.table.conf'
import { useEffect, useState } from 'react'
import { getAllFirstNames } from '../lib/firstnames'
 
const FirstNamesTab = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllFirstNames()
        .then((res) => {
            setData(res)
        })
    },[])

    return <DataTable data={data} columns={firstNameColumns}/>
}

export default FirstNamesTab;