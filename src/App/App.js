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
    folders: [],
    notes: [],
  }
  componentDidMount() {
    fetch('http://localhost:8000/folders')
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders
        })
        return fetch('http://localhost:8000/notes')
      })
      .then(res => res.json())
      .then(notes => {
        this.setState({
          notes
        })
      })
  }


  addFolder = (e) => {
    e.preventDefault()
    console.log('hello world')
    const name = e.target.name.value
    const folder = { name, id: uuidv4() }
    fetch('http://localhost:8000/folders', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(res => res.json())
      .then(res => {
        this.setState({
          folders: this.state.folders.concat(res)
        })
      })

  }

  addNote = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const content = e.target.content.value
    const folderId = e.target.folderId.value
    const modified = (new Date()).toString()
    const note = { name, content, folderId, id: uuidv4(), modified }
    fetch('http://localhost:8000/notes', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        notes: this.state.notes.concat(res)
      })
    })
    
  }

  deleteNote = (id) => {
    console.log('hello')
   fetch(`http://localhost:8000/notes/${id}`, {
   method: 'delete'})
   .then(res => {
     this.setState({
       notes: this.state.notes.filter(note => note.id != id)
     })
   })
  }

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote
    }
    return (
      <NotefulContext.Provider value={value}>
        <Header />
        <ErrorBoundary>
          <div className="container">
            <nav>
              <Route path="/notes/:noteId" render={(routeProps) => {
                const noteId = routeProps.match.params.noteId
                const selectedNote = this.state.notes.find(note => note.id == noteId) || {}
                const selectedFolder = this.state.folders.find(folder => folder.id == selectedNote.folderId) || {};

                return <PageNav folderName={selectedFolder.name} {...routeProps} />
              }}
              />
              <Route path="/folders/:folderId" render={(routeProps) => {
                const folderId = routeProps.match.params.folderId;
                const selectedFolder = this.state.folders.find(folder => folder.id === folderId);
if (!selectedFolder) return
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
                const selectedNote = this.state.notes.find(note => note.id == noteId) || {}

                return <PageMain selectedNote={selectedNote} {...routeProps} />
              }}
              />
              <Route path="/folders/:folderId" render={(routeProps) => {
                const folderId = routeProps.match.params.folderId
                const selectedFolder = this.state.folders.find(folder => folder.id == folderId) || {}
                const notesInFolder = this.state.notes.filter(note => {
                  return note.folderId === selectedFolder.id;
                });

                return <ListMain notes={notesInFolder} {...routeProps} />
              }}
              />
              <Route exact path="/" render={() =>
                <ListMain notes={this.state.notes} />
              } />

              <Route path="/addfolder" component={AddFolder} />
              <Route path="/addnote" component={AddNote} />
            </main>
          </div>
        </ErrorBoundary>
      </NotefulContext.Provider>
    )
  }
}

export default App;
