import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
    const notify = () => toast.success("Success Notification !", {
        position: "top-center"
    });;

    const errorNotify = () => toast.error('Error mesage', {
        position: 'top-center'
    })
    return (
        <div>
            <button onClick={notify}>Xabar</button>
            <button onClick={errorNotify}>Eror xabar</button>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Bounce} />
        </div>
    )
}