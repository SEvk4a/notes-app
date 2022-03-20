import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function Note({ note, styles, remove, handleEditClick }) {
  return (
    <li>
      <div className={styles.toppostelement}>
        <p>{note.textNote}</p>
        <div className={styles.buttonsblock}>
          <button onClick={(event) => handleEditClick(event, note)}>
            <AiFillEdit></AiFillEdit>
          </button>
          <button onClick={() => remove(note.id)}>
            <AiFillDelete></AiFillDelete>
          </button>
        </div>
      </div>
      <div className={styles.botpostelement}>
        {note.tags ? note.tags.map((tag) => <span key={tag.id}>{tag}</span>) : ''}
      </div>
    </li>
  );
}

export default Note;
