import Toastify from 'toastify-js'

export function Notification(text) {

    Toastify({
        text: `${text}`,
        className: "info",
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: "black",
            width: 'auto',
            height: 'auto',
            borderRadius: '50px',
            fontSize: '20px',
            padding: '20px'
        },
        onClick: function () { } // Callback after click
    }).showToast();
}