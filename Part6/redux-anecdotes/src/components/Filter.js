import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const search = event.target.value
        props.filterChange(search)
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(null,{filterChange})(Filter)