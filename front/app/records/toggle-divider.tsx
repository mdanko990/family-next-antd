import { Button, Divider, Flex } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";

const ToggleDivider = ({defaultOpen = false, label, content}: {defaultOpen?: boolean, label: string, content: ReactNode}) => {
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
            {
                open
                ? content
                : null
            }
        </>
    )
}

export default ToggleDivider;