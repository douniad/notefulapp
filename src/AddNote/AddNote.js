import React from 'react'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types'

export default function AddNote(props) {

    return <NotefulContext.Consumer>
        {value => {
            function onNoteSubmit(e) {
                value.addNote(e)
                props.history.push('/')
            }
            return (
                <form onSubmit={onNoteSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" required />
                    <label>Content</label>
                    <input type="text" name="content" required />
                    <label>Folder</label>
                    <select name="folderId">

                        {value.folders.map(folder => <option key={folder.id} value={folder.id}>
                            {folder.name}
                        </option>)}

                    </select>

                    <button>Save Note</button>
                </form>
            )
        }
    }
    </NotefulContext.Consumer>
}

AddNote.propTypes = {
    history: PropTypes.any
}
