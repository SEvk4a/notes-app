import axios from 'axios';

export default class NoteService {
  static async getAll() {
    const response = await axios.get('http://localhost:8000/notes');
    return response.data;
  }
  static async fetchPostNote(data) {
    await axios.post('http://localhost:8000/notes', data);
  }
  static async fetchDeleteNote(id) {
    await axios.delete('http://localhost:8000/notes/' + id);
  }
  static async fetchEditNote(id, data) {
    await axios.put(`http://localhost:8000/notes/${id}`, data);
  }
}
