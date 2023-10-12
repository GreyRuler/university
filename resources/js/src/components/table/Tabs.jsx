import {Tab} from "./Tab.jsx";
import Scrollbars from "react-custom-scrollbars-2";

export function Tabs({tabs}) {
    return (
        <div className='table-tabs'>
            <Scrollbars autoHeight>
                <div className='table-tablist'>
                    {tabs.map((tab, index) => <Tab {...tab} key={index}/>)}
                </div>
            </Scrollbars>
        </div>
    )
}
