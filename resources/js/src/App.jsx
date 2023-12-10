import './App.css'
import './assets/input.css'
import {UploadFile} from "./components/UploadFile.jsx";
import {useEffect, useState} from "react";
import {Tabs} from "./components/table/Tabs.jsx";
import {Table} from "./components/table/Table.jsx";
import {useSelector} from "react-redux";
import axiosClient from "./axios-client.js";
import {DownloadFile} from "./components/DownloadFile.jsx";

function App() {
    const [tabs, setTabs] = useState([])
    const connectionName = useSelector((state) => state.dbReducer.value)
    const {data} = useSelector((state) => state.tableReducer.value)

    const getTables = async () => {
        const {data} = await axiosClient.get(`/getTables`)
        setTabs(data)
    }

    useEffect(() => {
        getTables()
    }, [connectionName, data])

    return (
        <div className='app'>
            <div className='section-load'>
                <UploadFile types='.db,.sqlite'/>
                <DownloadFile types='.db,.sqlite'/>
            </div>
            <div className='container'>
                <Tabs tabs={tabs}/>
                <Table/>
            </div>
        </div>
    )
}

export default App
