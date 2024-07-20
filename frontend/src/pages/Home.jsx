import { useState, useEffect } from 'react';
import api from '../api';
import Note from '../components/Note';
import Item from '../components/Item';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [copiedItems, setCopiedItems] = useState([]);

  useEffect(() => {
    getNotes();
    getItems();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleRightClick = (e, item) => {
    e.preventDefault();
    setCopiedItems((prevItems) => {
      const isItemAlreadyAdded = prevItems.some((prevItem) => prevItem.id === item.id);
      if (!isItemAlreadyAdded) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  }

  const getItems = () => {
    api
      .get('/api/items/')
      .then((res) => res.data)
      .then((data) => {setItems(data)})
      .catch((error) => alert(error));

  }

  const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {setNotes(data); console.log(data)})
      .catch((error) => alert(error));

  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status != 204) {

        alert('Failed to delete note');

      } 
      getNotes();
    }).catch((error) => alert(error))

    

  };

  const createNote = (e) => {
    e.preventDefault();
    api.post('/api/notes/', { content, title, items: copiedItems }).then((res) => {
      if (res.status != 201) {

        alert('Failed to create note');

      }
      getNotes();
    }).catch((error) => {alert(error)});
    setTitle('');
    setContent('');
    setCopiedItems([]);
    
  }

  return (
    <div className="home-outer-container">
      
      <button onClick={handleLogout} className="logout-button">LogOut</button>
      <div className="home-inner-container">
        <div className="">
          <h2 className="home-form-h2">Create an Item Container</h2>
          <form onSubmit={createNote} className="form-container">
            <label htmlFor='title' className="home-form-label">Title: </label>
            <input className="home-form-input" type='text' id='title' name='title' placeholder='e.g. Mage Weapons' value={title} required onChange={(e) => setTitle(e.target.value)} /> 

            <label htmlFor='content' className="home-form-label">Description: </label>
            <textarea className="home-form-textarea" id='content' name='content' placeholder='e.g. Hard-mode mage weapons' value={content} required onChange={(e) => setContent(e.target.value)} />

            <label htmlFor='item' className="home-form-label">Items: </label>
            <div className="items-box">
              {copiedItems.length === 0 ? (
                <div className="placeholder-text">Right-click items to put in here</div>
              ) : (
                copiedItems.map((item, index) => (
                  <div key={index} className="item-form-container">
                    <Item item={item}/>
                  </div>
                ))
              )}
            </div>
            <br />
            <input className="home-form-input" type='submit' value='Save'></input>
            <button className="clear-button" onClick={() => {
              setCopiedItems([])
              setTitle('')
              setContent('')
              }}>Clear</button>
          </form>
          <div>
            <h2>Saved Containers</h2>
            <div className="notes-container">
              {notes.map((note) => (
                <div className="note" key={note.id}>
                  {<Note note={note} onDelete={deleteNote} key={note.id}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      

        <div className="item-list-container">
          <input 
            className="search-bar"
            type='text' 
            id='search' 
            name='search' 
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ></input>
          {filteredItems.map((item) => (
            <div className="item-list" onContextMenu={(e) => handleRightClick(e, item)} key={item.id}>
              <a href={`https://terraria.wiki.gg/wiki/${item.name}`} target="_blank" rel="noopener noreferrer">
                {item.name} 
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;