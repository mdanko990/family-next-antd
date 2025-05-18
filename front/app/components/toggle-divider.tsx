import { Button, Divider, Flex } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, JSXElementConstructor, ReactNode, useState } from "react";
interface ToggleDividerProps {
    defaultOpen?: boolean,
    label: string,
    children: ReactNode
}
const ToggleDivider: FC<ToggleDividerProps> = ({defaultOpen, label, children}) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <>
            <Divider orientation="left">
                <Flex align="center" gap={4} onClick={()=>setOpen(!open)}>
                {
                    open
                    ? <ChevronUp size={18} strokeWidth={1} /> 
                    : <ChevronDown size={18} strokeWidth={1} />
                }
                {label}
            </Flex>
            </Divider>
            <div className={open?"block":"hidden"}>
                {children}
            </div>
        </>
    )
}

export default ToggleDivider;