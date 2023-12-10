import '../../assets/table.css'
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {TableHeader} from "./TableHeader.jsx";
import {TableBody} from "./TableBody.jsx";
import {useDispatch, useSelector} from "react-redux";
import {tables} from "../../reducers/table/slice.js";
import {Loading} from "../Loading.jsx";

export function Table() {
    const [searchParams] = useSearchParams()
    const tableName = searchParams.get('tableName')
    const {data, columns, loading, error} = useSelector(
        (state) => state.tableReducer.value
    )
    const dispatch = useDispatch()

    useEffect(() => {
        const qParams = new URLSearchParams({tableName})
        dispatch(tables({qParams: qParams.toString()}))
    }, [dispatch, tableName])

    if (loading) return (
        <Loading/>
    )

    if (error) return (
        <div>Error</div>
    )

    if (!data?.length) return (
        <table>
            <TableHeader headers={columns}/>
            <TableBody/>
        </table>
    )

    return (
        <table>
            <colgroup>
                {columns?.map((_, index) => <col key={index}/>)}
                <col/>
            </colgroup>
            <TableHeader headers={columns}/>
            <TableBody items={data}/>
        </table>
    )
}
