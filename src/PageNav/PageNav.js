
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class PageNav extends Component {
    render() {
        return (
            <div className="note-page-nav-container">
              <button type="button" className="go-back" onClick={() => this.props.history.goBack()}>Go Back</button>
              <h3>{this.props.folderName}</h3>
            </div>
        )
    }
}

export default PageNav;

PageNav.propTypes = {
    folderName: PropTypes.string
}