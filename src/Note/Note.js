import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext'

class Note extends Component {
    static contextType = NotefulContext

    afterDelete = () => {
        this.context.deleteNote(this.props.id)
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="note-container">
                <h3>
                    <Link to={`/notes/${this.props.id}`} className="note-name">{this.props.name}</Link>
                </h3>
                <p className="modified">{this.props.modified}</p>
                <button onClick={() => this.afterDelete()} type="button" className="delete-note">Delete Note</button>
            </div>
        )
    }
}

export default withRouter(Note);

Note.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.string
}