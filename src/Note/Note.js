import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

class Note extends Component {
    render() {
        return (
            <div className="note-container">
                <h3>
                    <Link to={`/notes/${this.props.id}`} className="note-name">{this.props.name}</Link>
                </h3>
                <p className="modified">{this.props.modified}</p>
                <button type="button" className="delete-note">Delete Note</button>
            </div>
        )
    }
}

export default Note;

Note.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string
}