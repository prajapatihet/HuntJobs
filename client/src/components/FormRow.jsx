const FormRow = ({ type, name, labelText, placeholder }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <input type={type} name={name} id={name} className="form-input" placeholder={placeholder || ''} required />
        </div>
    )
}
export default FormRow