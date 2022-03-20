import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
function EditPage({ editNoteData, styles, handleEditNoteChange, handleEditNoteSubmit }) {
  return (
    <li className={styles.edititem}>
      <div className={styles.topinput}>
        <textarea
          type="text"
          name="textNote"
          value={editNoteData.textNote}
          placeholder="title"
          onChange={handleEditNoteChange}
        />
        <button onClick={handleEditNoteSubmit}>
          <AiFillCheckCircle></AiFillCheckCircle>
        </button>
      </div>
      <div className={styles.botinput}>
        <textarea
          type="text"
          placeholder="tags"
          name="tags"
          value={editNoteData.tags}
          onChange={handleEditNoteChange}
        />
      </div>
    </li>
  );
}

export default EditPage;
