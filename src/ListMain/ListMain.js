import React, { Component } from 'react';
import Note from '../Note/Note';
import AddNote from '../AddNote/AddNote'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

class ListMain extends Component {
    render() {
        return (
            <section className="note-list-main-container">
                <ul className="note-list">
                    {this.props.notes.map(note =>
                        <li className="note-item" key={note.id}>
                            <Note 
                            id={note.id}
                            name={note.name}
                            modified={note.modified} />
                        </li>
                    )}
                </ul>
                <NavLink to={'/addnote'}>Add Note</NavLink>
                <button type="button" className="add-note">Add Note</button>
            </section>
        )
    }
}

export default ListMain

ListMain.propTypes = {
    notes: PropTypes.array
}