import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import DummyStore from '../dummy-store';
import Header from '../Header/Header';
import ListNav from '../ListNav/ListNav';
import ListMain from '../ListMain/ListMain';
import PageNav from '../PageNav/PageNav';
import PageMain from '../PageMain/PageMain';
import NotefulContext from '../NotefulContext';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote';
import ErrorBoundary from '../ErrorBoundary'

const { v4: uuidv4 } = require('uuid')

class App extends Component {

    state = {
      folders: DummyStore.folders,
      notes: DummyStore.notes,
    }

    addFolder = (e) => {
      e.preventDefault()
      const name= e.target.name.value
      const folder= {name, id:uuidv4()}
      this.setState({
        folders: this.state.folders.concat(folder)
      })
    }

    addNote = (e) => {
      e.preventDefault()
      const name= e.target.name.value
      const content= e.target.content.value
      const folderId= e.target.folderId.value
      const modified= (new Date()).toString()
      const note= {name, content, folderId, id:uuidv4(), modified}
      this.setState({
        notes: this.state.notes.concat(note)
      })
    }

  render() {
    const value= {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
    return (
      <NotefulContext.Provider value={value}>
        <Header />
        <ErrorBoundary>
        <div className="container">
          <nav>
            <Route path="/notes/:noteId" render={(routeProps) => {
              const noteId = routeProps.match.params.noteId
              const selectedNote = this.state.notes.find(note => note.id === noteId)
              const selectedFolder = this.state.folders.find(folder => folder.id === selectedNote.folderId);

              return <PageNav folderName={selectedFolder.name} {...routeProps} />
            }}
            />
            <Route path="/folders/:folderId" render={(routeProps) => {
              const folderId = routeProps.match.params.folderId;
              const selectedFolder = this.state.folders.find(folder => folder.id === folderId);

              return <ListNav folders={this.state.folders} selectedFolder={selectedFolder.name} {...routeProps} />
            }}
            />
            <Route exact path="/" render={() =>
              <ListNav folders={this.state.folders} />
            } />
          </nav>
          <main>
            <Route path="/notes/:noteId" render={(routeProps) => {
              const noteId = routeProps.match.params.noteId
              const selectedNote = this.state.notes.find(note => note.id === noteId)

              return <PageMain selectedNote={selectedNote} {...routeProps} />
            }}
            />
            <Route path="/folders/:folderId" render={(routeProps) => {
              const folderId = routeProps.match.params.folderId
              const selectedFolder = this.state.folders.find(folder => folder.id === folderId)
              const notesInFolder = this.state.notes.filter(note => {
                return note.folderId === selectedFolder.id;
              });

              return <ListMain notes={notesInFolder} {...routeProps} />
            }}
            />
            <Route exact path="/" render={() =>
              <ListMain notes={this.state.notes} />
            } />

            <Route path="/addfolder" component={AddFolder}/>
            <Route path="/addnote" component={AddNote}/>
          </main>
        </div>
        </ErrorBoundary>
      </NotefulContext.Provider>
    )
  }
}

export default App;
