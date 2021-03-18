import React, {FC} from "react";

interface TabPanelProps {
    children?: React.ReactNode
    index: number,
    value: number
}

const TabPanel: FC<TabPanelProps> = ({children, index, value}) => {
   return (
       <div hidden={value !== index} id={`tab-${index}`}>
           {
               value === index && (
                   <>
                       {children}
                   </>
               )
           } 
       </div>
   );
}

export default TabPanel;
