import classNames from "classnames";
import {useSearchParams} from "react-router-dom";

export function Tab({name, count}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const tableName = searchParams.get('tableName')
    const classNamesTab = classNames({
        'table-tab': true,
        'selected': tableName === name
    })

    const onSearch = () => {
        setSearchParams((prev) => {
            prev.set('tableName', name)
            return prev
        })
    }

    return (
        <button className={classNamesTab} onClick={onSearch}>
            {name}<span className="tab-count">{count}</span>
        </button>
    )
}
