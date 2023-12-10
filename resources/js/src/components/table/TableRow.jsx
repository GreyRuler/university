import {DialogModal} from "../modal/DialogModal.jsx";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {deleteRow, updateRow} from "../../reducers/table/slice.js";
import {Input} from "../modal/Input.jsx";

export function TableRow({row}) {
    const dispatch = useDispatch()
    const [isOpened, setIsOpened] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        dispatch(updateRow({id: row.id, formData}))
        onClose()
    }
    const onClose = () => {
        setIsOpened(false)
    }
    const onShow = () => setIsOpened(true)
    const onDelete = () => {
        const isConfirm = confirm('Вы действительно хотите удалить запись?')
        if (!isConfirm) return
        dispatch(deleteRow({id: row.id}))
    }
    const rowWithoutId = Object.keys(row).reduce((curr, key) => {
        if (key !== 'id') curr[key] = row[key]
        return curr
    }, {})

    return (
        <tr>
            {Object.values(rowWithoutId).map((cellData, index) => (
                <td key={index}>{cellData}</td>
            ))}
            <td>
                <DialogModal title={'Редактирование записи'} isOpened={isOpened} onClose={onClose} onSubmit={onSubmit}>
                    {Object.keys(rowWithoutId).map((item, i) => <Input name={item} key={i} value={rowWithoutId[item]}/>)}
                </DialogModal>
                <button className='option' onClick={onShow}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true" role="img"
                         className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar" width="1em"
                         height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"></path>
                    </svg>
                </button>
                <button className='option' onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         aria-hidden="true" role="img"
                         className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar" width="1em"
                         height="1em" viewBox="0 0 24 24">
                        <g fill="currentColor">
                            <path
                                d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z"></path>
                            <path
                                d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Zm-1.35-9.811c-.04-.434-.408-.75-.82-.707c-.413.043-.713.43-.672.864l.5 5.263c.04.434.408.75.82.707c.413-.043.713-.43.672-.864l-.5-5.263Zm4.329-.707c.412.043.713.43.671.864l-.5 5.263c-.04.434-.409.75-.82.707c-.413-.043-.713-.43-.672-.864l.5-5.263c.04-.434.409-.75.82-.707Z"
                            ></path>
                        </g>
                    </svg>
                </button>
            </td>
        </tr>
    );
}
