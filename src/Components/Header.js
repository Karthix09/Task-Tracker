import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onPress, showPress}) => {

    // const onClick = () => {

    //     console.log('click');
    // }    
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showPress ? 'red' : 'green'} 
            text={showPress ? 'Close' : 'Add'}
            onClick={onPress}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

//Adding CSS is JavaScript

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

export default Header
