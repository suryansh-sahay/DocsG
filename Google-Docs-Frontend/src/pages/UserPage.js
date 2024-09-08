import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userpage.css';
import { useNavigate } from 'react-router-dom';
function UserPage() {
  const [userId, setUserId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3002/verify', { withCredentials: true })
      .then((response) => {
        const id = response.data.decodedToken.id;
        setUserId(id);
        axios.get(`http://localhost:3002/${id}/documents`)
          .then((response) => {
            setDocuments(response.data);
        });
    })
  }, []);

  const handleCreateDocument = ()=>{
    setPopupOpen(true);
  }

  const handleSubmitDocument = (e) => {
    e.preventDefault();
    const newDocument = {
      title: newDocumentTitle,
      content: '',
    };

    axios.post(`http://localhost:3002/${userId}/documents`, newDocument)
      .then((response) => {
        const createdDocumentId = response.data.id;
        setPopupOpen(false);
        setNewDocumentTitle('');
        navigate(`/${createdDocumentId}`);
      });

  };

  return (
    <div className='loginpage'>
       <div className="user-page-container">
      <div className="userpage-header">
        <h1>Documents</h1>
        <button className="create-button" onClick={handleCreateDocument}>
          Create New Document
        </button>
      </div>

      <div className="documents-list">
        {documents && documents.map((document) => (
          <div className="document-item" key={document.id} onClick={()=>{navigate(`/${document._id}`)}}>
            <span className="document-title">{document.title}</span>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup">
          <form onSubmit={handleSubmitDocument}>
            <label>
              Document Title:
              <input
                type="text"
                value={newDocumentTitle}
                onChange={(e) => setNewDocumentTitle(e.target.value)}
              />
            </label>
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default UserPage;
