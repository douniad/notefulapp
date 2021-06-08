import React, { Component } from 'react';
import Note from '../Note/Note';
import PropTypes from 'prop-types'

class PageMain extends Component {
    render() {
        return (
                <section className="note-page-main-container">
                    <Note {...this.props.selectedNote} history={this.props.history} />
                    <div>
                        <p className="note-content">{this.props.selectedNote.content}</p>
                    </div>
                </section>
        )
    }
}

export default PageMain;

PageMain.defaultProps = {
    selectedNote: {}
}

PageMain.propTypes = {
    selectedNote: PropTypes.object
}