import './Form.css'

export default function Form(){
    return(
        <>
        <form className='frm' action="">
            <label htmlFor=""> nombre </label>
            <input type="text" />
            <label htmlFor=""> contraseña </label>
            <input type="password" />
        </form>
        </>
    )
}