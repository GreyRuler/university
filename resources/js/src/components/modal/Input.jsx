export function Input({name, value = ''}) {
    return (
        <div className="input-container">
            <input type="text" id="custom" className="input-field"
                   placeholder={name} name={name} defaultValue={value}/>
            <label htmlFor="custom" className="input-label">{name}</label>
        </div>
    )
}
