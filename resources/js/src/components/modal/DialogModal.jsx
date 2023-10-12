import {useEffect, useRef} from "react";

export function DialogModal({
                                title,
                                isOpened,
                                onSubmit,
                                onClose,
                                children,
                            }) {
    const ref = useRef(null);

    const isClickInsideRectangle = (e, dialog) => {
        const dialogDimensions = dialog.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close()
            onClose()
        }
    }

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);

    return (
        <dialog ref={ref} onClick={(e) => isClickInsideRectangle(e, ref.current)}>
            <h3>{title}</h3>
            <form onSubmit={onSubmit}>
                {children}
                <button onClick={onClose} type={"button"}>Отмена</button>
                <button type="submit">Отправить</button>
            </form>
        </dialog>
    );
}
