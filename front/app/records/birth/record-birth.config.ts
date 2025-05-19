export interface SetItemProps {
    key: RecordRole,
    label: string,
    render: (field: any) => React.JSX.Element
}

export type RecordRole = "child" | "mother" | "father" | "godmother" | "godfather";
