import { Button, Tag } from "antd";
import { format } from "date-fns";
import { Blend, Cake, Link, Skull, UserRound } from "lucide-react";
import palette from "../lib/color-palette";

export const TypeRenderer = ({value}: {value: any}) => {
    const typeName = value.document.type.name;
    switch(typeName){
        case "birth":
            return <Tag icon={<Cake size={14} color={palette.green}/>} color="transparent" bordered={false}/>
        case "death":
            return <Tag icon={<Skull size={14} color={palette.darkBlue}/>} color="transparent" bordered={false}/>
        case "marriage":
            return <Tag icon={<Blend size={14} color={palette.red}/>} color="transparent" bordered={false}/>
        default:
            return <Tag>?</Tag>
    }
}

export const SimpleTagRenderer = ({value, color}: {value: any, color?: string}) => {
    return <Tag color={color}>{value.name}</Tag>
}

export const RoleRenderer = ({value}: {value: any}) => {
    let color;
    switch(value.name){
        case "child":
            color = palette.yellow;
            break;
        case "mother":
            color = palette.lilac;
            break;
        case "father":
            color = palette.blue;
            break;
        default:
            color = palette.grey;
    }
    return <SimpleTagRenderer value={value} color={color}/>
}

export const DateRenderer = ({value}: {value: any}) => {
    return <span>{value?.document.date?format(new Date(value.document.date), "dd-MM-yyyy"):""}</span>
}

export const LinkRenderer = ({value}: {value: any}) => {
    return <Button href={value?.document.link} size="small" shape="circle" icon={<Link size={12} />} />
}

export const AgeRenderer = ({value}: {value: any}) => {
    const {age, ageUnit} = value;
    
    if(isNaN(age)) return <span>-</span>
    else return <span>{age} {ageUnit}</span>
}

export const GenderRenderer = (value: any, record: any) => (
    value === "M"
    ? <UserRound color={palette.blue} size={20}/>
    : value === "F"
    ? <UserRound color={palette.pink} size={20}/>
    : null
)