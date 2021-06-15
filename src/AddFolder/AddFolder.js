import React from 'react'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

export default function AddFolder(props) {

    return <NotefulContext.Consumer>
        {value => {
            function onFolderSubmit(e) {
                value.addFolder(e)
                props.history.push('/')

            }
            return (
                <form onSubmit={onFolderSubmit}>
                    <label>Folder Name</label>
                    <input type="text" name="name"/>
                    <button>Save Folder</button>
                </form>
            )
        }
        }
    </NotefulContext.Consumer>

}

AddFolder.propTypes = {
    history: PropTypes.any
}
