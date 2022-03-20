import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styles from '../styles/Main.module.scss';
import NoteService from '../API/NoteService';
import EditPage from './EditPage';
import Note from './Note';

function Main() {
  const [notes, setNotes] = useState([]);
  const [textNote, setTextNote] = useState('');
  const [searchText, setSearchText] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);

  const [editNoteData, setEdiNotetData] = useState({
    textNote: '',
    tags: [],
  });

  // Edit method

  function handleEditClick(event, note) {
    setEditNoteId(note.id);
    const noteValues = {
      id: note.id,
      textNote: note.textNote,
      tags: note.tags,
    };
    setEdiNotetData(noteValues);
  }

  function handleEditNoteChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.getAttribute('name');

    const newNotesData = { ...editNoteData };
    newNotesData[fieldName] = fieldValue;
    setEdiNotetData(newNotesData);
  }

  const handleEditNoteSubmit = (event) => {
    let plusTagArr = editNoteData.textNote.split(' ').filter((e) => e[0] === '#');

    let editedNote = {};
    if (typeof editNoteData.tags === 'string') {
      const newArr = editNoteData.tags.replace(/,/g, ' ').split(' ');
      editedNote = {
        id: editNoteId,
        textNote: editNoteData.textNote,
        tags: newArr.concat(plusTagArr),
      };
    } else {
      editedNote = {
        id: editNoteId,
        textNote: editNoteData.textNote,
        tags: editNoteData.tags.concat(plusTagArr),
      };
    }

    const newArray = [...notes];
    const index = newArray.findIndex((item) => item.id === editNoteId);
    newArray[index] = editedNote;
    setNotes(newArray);
    setEditNoteId(null);
    NoteService.fetchEditNote(editNoteId, editedNote);
  };

  // CREATE NOTE

  function makeTags() {
    const tags = textNote.split(' ').filter((tag) => tag[0] === '#');
    return tags;
  }

  function createNote() {
    const tags = makeTags();
    const newNote = {
      id: Date.now(),
      textNote,
      tags,
    };

    setNotes([newNote, ...notes]);
    setTextNote('');
    NoteService.fetchPostNote(newNote);
  }
  // REMOVE NOTE

  function removeNote(post) {
    setNotes(notes.filter((note) => note.id !== post));
    NoteService.fetchDeleteNote(post);
  }

  // SEARCH TAG

  const searchedNotes = useMemo(() => {
    if (searchText) {
      return notes.filter((e) => e.tags.includes(searchText));
    }
    return notes;
  }, [searchText, notes]);

  // FIRST UPLOAD

  async function fetchNotes() {
    const notes = await NoteService.getAll();
    setNotes(notes);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <textarea
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
          placeholder="Write your note"></textarea>
        <div className={styles.mainbutton}>
          <button onClick={createNote}>create</button>
        </div>
      </div>
      <div className={styles.searchform}>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search tag"
          value={searchText}
        />
      </div>
      <ul className={styles.postslist}>
        {searchedNotes.map((note) => (
          <>
            {editNoteId === note.id ? (
              <EditPage
                key={note.id}
                note={note}
                styles={styles}
                editNoteData={editNoteData}
                handleEditNoteChange={handleEditNoteChange}
                handleEditNoteSubmit={handleEditNoteSubmit}></EditPage>
            ) : (
              <Note
                note={note}
                styles={styles}
                key={note.id}
                remove={removeNote}
                handleEditClick={handleEditClick}></Note>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default Main;
