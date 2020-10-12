import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'

class ListNav extends Component {
    render() {
        return (
            <div className="note-list-nav-container">
                <ul className="folder-list">
                    {this.props.folders.map(folder =>
                        <li key={folder.id} className={`folder-item ${this.props.selectedFolder === folder.name ? 'active-folder' : ''}`}>
                          <NavLink to={`/folders/${folder.id}`}>
                            <span>{folder.name}</span>
                          </NavLink>
                        </li>
                    )}
                </ul>
                <NavLink to={`/addfolder`} className="add-folder">Add Folder</NavLink>
            </div>
        )
    }
}

export default ListNav;

ListNav.propTypes = {
    folders: PropTypes.array,
    selectedFolder: PropTypes.string
}