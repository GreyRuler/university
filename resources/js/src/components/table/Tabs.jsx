import {Tab} from "./Tab.jsx";

export function Tabs({tabs}) {
    return (
        <div className='table-tabs'>
                <div className='table-tablist'>
                    {tabs.map((tab, index) => <Tab {...tab} key={index}/>)}
                </div>
        </div>
    )
}
