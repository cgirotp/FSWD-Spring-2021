const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      default:
        return state
    }
}

var timing = null
  
export const setNotification = (notification,time) => {
    return async dispatch => {
      dispatch({type: 'SET_NOTIFICATION', data: notification})
      clearTimeout(timing)
      timing = setTimeout(() => {dispatch({type: 'SET_NOTIFICATION', data: null})},time*1000)
    }
}

  export default notificationReducer