import React, { useEffect, useState, useRef } from 'react';

import Form from './Form';
import './App.css';

const App = () => {
  const [images, setImages] = useState();
  const [imageDetails, setImageDetails] = useState({});

  const dialogRef = useRef();

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setImages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getImageDetails = (id) => {
    const { url, description, alt_description } = images.find(img => img.id === id);
    return { url, description, alt_description };
  }

  const handleImageClick = (id) => {
    const { url, description, alt_description } = getImageDetails(id);
    setImageDetails({ url, description, alt_description });
    dialogRef.current.showModal();
  };

  return (
    <div className='app'>
      <ul className='list'>
        {images?.map(img => (
          <li key={img.id} className='list-item' onClick={() => handleImageClick(img.id)}>
            <img src={`${img.url}.jpg`} alt={img.alt_description || ''} className='car-image' />
            <div className='user'>
              <picture>
                <source type='image/webp' srcSet={`${img.user.profile_image}.webp`} />
                <img src='https://i.pravatar.cc/50' alt={`${img.user.username}`} />
              </picture>
              <span>{img.user.username}</span>
            </div>
          </li>
        ))}
      </ul>
      <dialog ref={dialogRef}>
        {imageDetails?.url && <img src={`${imageDetails.url}.jpg`} alt={imageDetails?.alt_description || ''} className='modal-image' />}
        {imageDetails.description && <p>{imageDetails.description}</p>}
          <form method="dialog">
            <button>Close</button>
          </form>
      </dialog>
      <Form />
    </div>
  );
}

export default App;
