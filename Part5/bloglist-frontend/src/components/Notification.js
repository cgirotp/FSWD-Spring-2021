import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    else if (message === 'Wrong username or password') {
        return (
            <div className="unsuccessful">
                {message}
            </div>
        )
    }
    else {
        return (
            <div className="successful">
                {message}
            </div>
        )
    }
}

export default Notification