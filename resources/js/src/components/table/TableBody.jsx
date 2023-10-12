import {TableRow} from "./TableRow.jsx";

export function TableBody({items}) {
	return (
		<tbody>
		{items?.map((item, index) => <TableRow key={index} row={item}/>)}
		</tbody>
	)
}