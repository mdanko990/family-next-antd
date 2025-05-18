import { ColumnsType } from "antd/es/table";
import { AgeRenderer, DateRenderer, LinkRenderer, RoleRenderer, SimpleTagRenderer, TypeRenderer } from "../components/table-cell.renderer";
type FormControlType = "select" | "inputText" | "inputNumber" | "date" | "textarea" | "switch"

const recordColumns: ColumnsType = [
    {
        title: "Last name",
        dataIndex: "lastName",
        key: "lastName",
        render: (value) => <span>{value?.name}</span>
    },
    {
        title: "Maiden name",
        dataIndex: "maidenName",
        key: "maidenName",
        render: (value) => <span>{value?.name}</span>
    },
    {
        title: "First name",
        dataIndex: "firstName",
        key: "firstName",
        render: (value) => <span>{value?.name}</span>
    },
    {
        title: "Patronym",
        dataIndex: "patronym",
        key: "patronym",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (value, record) => <TypeRenderer value={record}/>
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (value) => <RoleRenderer value={value}/>
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value) => <SimpleTagRenderer value={value}/>
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        render: (value, record) => <AgeRenderer value={record} />
    },
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (value, record) => <DateRenderer value={record}/>,
        sorter: (a, b) => a.document.date - b.document.date//isBefore(a.document.date, b.document.date)
    },
    {
        title: "Notes",
        dataIndex: "comment",
        key: "comment",
        render: (value, record) => <span>{record.document.comment}</span>,
        hidden: true
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
        render: (value, record) => <span>{record.document.location}</span>,
        hidden: true
    },
    {
        title: "Archive",
        dataIndex: "archive",
        key: "archive",
        render: (value, record) => <span>{record.document.archive}</span>,
        hidden: true
    },
    {
        title: "Fond",
        dataIndex: "fond",
        key: "fond",
        render: (value, record) => <span>{record.document.fond}</span>,
        hidden: true
    },
    {
        title: "Inventory",
        dataIndex: "inventory",
        key: "inventory",
        render: (value, record) => <span>{record.document.inventory}</span>,
        hidden: true
    },
    {
        title: "File",
        dataIndex: "file",
        key: "file",
        render: (value, record) => <span>{record.document.file}</span>,
        hidden: true
    },
    {
        title: "Page",
        dataIndex: "page",
        key: "page",
        render: (value, record) => <span>{record.document.page}</span>,
        hidden: true    
    },
    {
        title: "Link",
        dataIndex: "link",
        key: "link",
        render: (value, record) => <LinkRenderer value={record}/>
        // hidden: true
    },
]

export default recordColumns;