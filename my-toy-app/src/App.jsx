import { useState, useEffect, useRef } from 'react'
import interact from 'interactjs'
import { removeBackground } from '@imgly/background-removal'
import './App.css'

import landingBg from './assets/landing-bg.png'
import logoBubble from './assets/logo-bubble.png'
import dollhouseBg from './assets/dollhouse-bg.png'
import customBubble from './assets/custom-bubble.png'
import paperPlane from './assets/paper-plane.png'
import seagullBanner from './assets/seagull-banner.png'
import worldBg from './assets/world-bg.png'
import buildingBg from './assets/building-bg.png';
import infoIcon from './assets/info-icon.png'

import Actionman1 from './assets/maa-Action Man-1.jpeg'
import Actionman2 from './assets/maa-Action Man-2.jpeg'
import Actionman3 from './assets/maa-Action Man-3.jpeg'
import BabyBorn1 from './assets/maa-Baby Born-1.jpeg'
import BabyBorn2 from './assets/maa-Baby Born-2.jpeg'
import BabyBorn3 from './assets/maa-Baby Born-3.jpeg'
import Barbie1 from './assets/maa-Barbie-1.jpeg'
import Barbie2 from './assets/maa-Barbie-2.jpeg'
import Barbie3 from './assets/maa-Barbie-3.jpeg'
import Barriguitas1 from './assets/maa-Barriguitas-1.jpeg'
import Barriguitas2 from './assets/maa-Barriguitas-2.jpeg'
import Barriguitas3 from './assets/maa-Barriguitas-3.jpeg'
import Bratz1 from './assets/maa-Bratz-1.jpeg'
import Bratz2 from './assets/maa-Bratz-2.jpeg'
import Bratz3 from './assets/maa-Bratz-3.jpeg'
import Bratz4 from './assets/maa-Bratz-4.jpg'
import Furby1 from './assets/maa-Furby-1.jpg'
import Furby2 from './assets/maa-Furby-2.jpeg'
import Furby3 from './assets/maa-Furby-3.jpg'
import Furby4 from './assets/maa-Furby-4.jpeg'
import Nancy1 from './assets/maa-Nancy-1.jpeg'
import Nancy2 from './assets/maa-Nancy-2.jpeg'
import Nancy3 from './assets/maa-Nancy-3.jpeg'
import Playmobil1 from './assets/maa-Playmobil-1.jpg'
import Playmobil2 from './assets/maa-Playmobil-2.jpeg'
import Playmobil3 from './assets/maa-Playmobil-3.jpeg'
import Pokemon from './assets/maa-Pokemon.jpeg'
import PollyPocket1 from './assets/maa-Polly Pocket-1.jpeg'
import PollyPocket2 from './assets/maa-Polly Pocket-2.jpeg'
import PollyPocket3 from './assets/maa-Polly Pocket-3.jpeg'
import PollyPocket4 from './assets/maa-Polly Pocket-4.jpeg'
import TSBuzzLightyear from './assets/maa-Toy Story-Buzz Lightyear.jpeg'
import TSJessie from './assets/maa-Toy Story-Jessie.jpeg'
import TSMrPotatoHead from './assets/maa-Toy Story-Mr. Potato Head.jpeg'
import TSWoody from './assets/maa-Toy Story-Woody.jpeg'


const archiveToys = [
  { id: 1, name: "Action Man", image: Actionman1 },
  { id: 2, name: "Action Man", image: Actionman2 },
  { id: 3, name: "Action Man", image: Actionman3 },
  { id: 4, name: "Baby Born", image: BabyBorn1 },
  { id: 5, name: "Baby Born", image: BabyBorn2 },
  { id: 6, name: "Baby Born", image: BabyBorn3 },
  { id: 7, name: "Barbie", image: Barbie1 },
  { id: 8, name: "Barbie", image: Barbie2 },
  { id: 9, name: "Barbie", image: Barbie3 },
  { id: 10, name: "Barriguitas", image: Barriguitas1 },
  { id: 11, name: "Barriguitas", image: Barriguitas2 },
  { id: 12, name: "Barriguitas", image: Barriguitas3 },
  { id: 13, name: "Bratz", image: Bratz1 },
  { id: 14, name: "Bratz", image: Bratz2 },
  { id: 15, name: "Bratz", image: Bratz3 },
  { id: 16, name: "Bratz", image: Bratz4 },
  { id: 17, name: "Furby", image: Furby1 },
  { id: 18, name: "Furby", image: Furby2 },
  { id: 19, name: "Furby", image: Furby3 },
  { id: 20, name: "Furby", image: Furby4 },
  { id: 22, name: "Nancy", image: Nancy1 },
  { id: 23, name: "Nancy", image: Nancy2 },
  { id: 24, name: "Nancy", image: Nancy3 },
  { id: 25, name: "Playmobil", image: Playmobil1 },
  { id: 26, name: "Playmobil", image: Playmobil2 },
  { id: 27, name: "Playmobil", image: Playmobil3 },
  { id: 28, name: "Pokémon", image: Pokemon },
  { id: 29, name: "Polly Pocket", image: PollyPocket1 },
  { id: 30, name: "Polly Pocket", image: PollyPocket2 },
  { id: 31, name: "Polly Pocket", image: PollyPocket3 },
  { id: 32, name: "Polly Pocket", image: PollyPocket4 },
  { id: 33, name: "Toy Story-Buzz Lightyear", image: TSBuzzLightyear },
  { id: 34, name: "Toy Story-Jessie", image: TSJessie },
  { id: 35, name: "Toy Story-Mr. Potato Head", image: TSMrPotatoHead },
  { id: 36, name: "Toy Story-Woody", image: TSWoody },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:5001/api`;

const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return '2026.07.15';
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const normalizeComment = (comment) => ({
  id: comment.id,
  text: comment.description,
  image: comment.imageUrl,
  date: formatDate(comment.dateCreated),
});

const normalizeToy = (toy) => ({
  id: toy.id,
  image: toy.imageUrl,
  story: toy.story,
  size: Math.max(50, Math.round((toy.scale || 1) * 50)),
  x: toy.positionX || 0,
  y: toy.positionY || 0,
  comments: Array.isArray(toy.comments) ? toy.comments.map(normalizeComment) : [],
  date: formatDate(toy.dateCreated),
});

function App() {
  const [showArchive, setShowArchive] = useState(false);
  // hidden "staff-only" unlock trigger
  const [secretTaps, setSecretTaps] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [savedToys, setSavedToys] = useState([])
  const [activeToyIndex, setActiveToyIndex] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);

  const handleSecretTap = () => {
   const newCount = secretTaps + 1;
   setSecretTaps(newCount);

    if (newCount >= 5) {
      setShowAdminPanel(true);
      setSecretTaps(0); 
    }

      setTimeout(() => {
        setSecretTaps(0);
      }, 1000);
  };

  const fetchToys = async () => {
    const response = await fetch(`${API_BASE_URL}/toys`);
    if (!response.ok) {
      throw new Error('Could not load toys from the server.');
    }

    const data = await response.json();
    setSavedToys(data.map(normalizeToy));
  };

  const handleDeleteSingleToy = async (indexToRemove) => {
    const toyToDelete = savedToys[indexToRemove];
    if (!toyToDelete) return;

    const response = await fetch(`${API_BASE_URL}/toys/${toyToDelete.id}`, {
      method: 'DELETE',
    });

    if (response.ok || response.status === 204) {
      await fetchToys();

      if (activeToyIndex === toyToDelete.id) {
        setActiveToyIndex(null);
      }
    }
  };

  const handleWipeDollhouse = async () => {
    const confirmWipe = window.confirm("Are you sure you want to delete all toys from the exhibition?");

    if (!confirmWipe) {
      return;
    }

    await Promise.all(
      savedToys.map((toy) => fetch(`${API_BASE_URL}/toys/${toy.id}`, { method: 'DELETE' }))
    );

    setShowAdminPanel(false);
    setActiveToyIndex(null);
    await fetchToys();
  };
  const handleFileChange = (event) => {
  // Grabs the exact file the visitor tapped in their camera roll
  setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a photo of your character toy!');
      return;
    }

    setUploadMessage('Uploading to the dollhouse...');

    const formData = new FormData();
    formData.append('toyImage', selectedFile); 

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (response.ok) {
        setUploadMessage('Success! The image is saved.');
        console.log('Your public URL is:', data.imageUrl);
      } else {
        setUploadMessage('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadMessage('Could not connect to the server.');
    }
  };

  const handleSelectArchiveToy = (toy) => {
    console.log("User selected:", toy.name);
    
    setSelectedImage(toy.image); 
    setSelectedFile(null);
    setIsBgRemoved(false); 
    setShowArchive(false);
    // 1. Force the small 2-option menu to close
    setShowUploadModal(false); 
    // 2. Force the main form (with the dashed box) to open
    setIsModalOpen(true); 
  };

  const fileInputRef = useRef(null)
  const commentFileInputRef = useRef(null);
  const openPhotoAlbum = () => {
  if (fileInputRef.current) {
    fileInputRef.current.click(); // This magically clicks the hidden input!
  }
}
  const [currentPage, setCurrentPage] = useState('welcome')
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) 
  
  const [selectedImage, setSelectedImage] = useState(null)
  const [isBgRemoved, setIsBgRemoved] = useState(false)
  const [isRemovingBg, setIsRemovingBg] = useState(false) 
  const [storyText, setStoryText] = useState('')

  const [placedToy, setPlacedToy] = useState(null)
  const [toySize, setToySize] = useState(50) 

  const wordCount = storyText.trim() === '' ? 0 : storyText.trim().split(/\s+/).length
  const isNextValid = isBgRemoved && wordCount > 0 && wordCount <= 100

  const activeToy = savedToys.find((toy) => toy.id === activeToyIndex) || null;
  

  useEffect(() => {
    interact('.draggable-toy').draggable({
      ignoreFrom: '.resize-btn', 
      inertia: true, 
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent', 
          endOnly: false 
        })
      ],
      listeners: {
        move(event) {
          const target = event.target
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          target.style.transform = `translate(${x}px, ${y}px)`
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      }
    })
  }, [placedToy]) 

  useEffect(() => {
    fetchToys().catch((error) => {
      console.error(error);
      setUploadMessage('Could not load toys from the server.');
    });
  }, []);

  const handleResizeClick = (e) => {
    e.preventDefault(); 
    setToySize(prevSize => {
      if (prevSize === 50) return 65;
      if (prevSize === 65) return 80;
      return 50;
    });
  }

  const handleAddComment = () => {
    // Comments now persist through the backend.
    if (!newComment.trim() || !activeToy) return;

    const submitComment = async () => {
      const formData = new FormData();
      formData.append('description', newComment.trim());
      formData.append('toyId', String(activeToy.id));

      if (commentImageFile) {
        formData.append('commentImage', commentImageFile);
      }

      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Could not save comment.');
      }

      await fetchToys();
      setNewComment('');
      setCommentImage(null);
      setCommentImageFile(null);
    };

    submitComment().catch((error) => {
      console.error(error);
      setUploadMessage(error.message);
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("Photo selected:", file); 
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowUploadModal(false); 
      event.target.value = null; 
    }
  };
  
  const handleCommentImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCommentImageFile(file);
      setCommentImage(URL.createObjectURL(file));
    }
    // This resets the input so they can pick the same photo again if they change their mind
    event.target.value = null; 
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) return; 

    setIsRemovingBg(true); 
    
    // --- THE FIX: Force a tiny 50ms pause so the screen can paint the new text ---
    await new Promise(resolve => setTimeout(resolve, 50));
    
    try {
      let imageSource = selectedImage;

      if (typeof selectedImage === 'string' && !selectedImage.startsWith('blob:')) {
        const response = await fetch(selectedImage);
        imageSource = await response.blob();
      }

      const imageBlob = await removeBackground(imageSource); 
      
      const url = URL.createObjectURL(imageBlob);
      setSelectedImage(url); 
      setSelectedFile(new File([imageBlob], 'transparent-toy.png', { type: 'image/png' }));
      setIsBgRemoved(true);  
      
    } catch (error) {
      console.error("Oops, background removal failed:", error);
    } finally {
      setIsRemovingBg(false); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setSelectedFile(null)
    setIsBgRemoved(false)
    setIsRemovingBg(false)
    setStoryText('')
    setUploadMessage('')
  }

  const handleNextClick = () => {
    if (isNextValid) {
      setPlacedToy({ image: selectedImage, story: storyText })
      setIsModalOpen(false)
      setSelectedImage(null)
      setIsBgRemoved(false)
      setStoryText('')
      setToySize(50) 
    }
  }

  const handleBackToEdit = () => {
    setSelectedImage(placedToy.image)
    setStoryText(placedToy.story)
    setIsBgRemoved(true) 
    setPlacedToy(null)
    setIsModalOpen(true)
  }

  const handleDoneClick = async () => {
    const toyEl = document.querySelector('.draggable-toy')
    const x = toyEl ? (parseFloat(toyEl.getAttribute('data-x')) || 0) : 0
    const y = toyEl ? (parseFloat(toyEl.getAttribute('data-y')) || 0) : 0

    if (!placedToy) return;

    setUploadMessage('Saving your toy...');

    try {
      let imageUrl = selectedImage;

      if (selectedImage) {
        const response = await fetch(selectedImage);
        const imageBlob = await response.blob();
        const formData = new FormData();
        formData.append('toyImage', imageBlob, 'toy-image.png');

        const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || 'Upload failed.');
        }

        imageUrl = uploadData.imageUrl;
      } else if (selectedFile) {
        const formData = new FormData();
        formData.append('toyImage', selectedFile);

        const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || 'Upload failed.');
        }

        imageUrl = uploadData.imageUrl;
      }

      const saveResponse = await fetch(`${API_BASE_URL}/toys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          story: placedToy.story,
          positionX: x,
          positionY: y,
          scale: toySize / 50,
          imageUrl,
        }),
      });

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(saveData.message || 'Could not save toy.');
      }

      await fetchToys();
      setUploadMessage('Toy saved successfully!');
      setPlacedToy(null)
      setSelectedFile(null)
      setSelectedImage(null)
      setIsBgRemoved(false)
      setStoryText('')
      setToySize(50)
    } catch (error) {
      console.error('Error:', error);
      setUploadMessage(error.message || 'Could not connect to the server.');
    }
  }

  if (currentPage === 'welcome') {
    return (
      <div className="mobile-container" style={{ backgroundImage: `url(${worldBg})` }}>
        
        {/* --- DECORATIVE ELEMENTS --- */}
        <img src={buildingBg} alt="Museum Frame" className="building-bg-img" />
        <img src={paperPlane} alt="Decorative flight path" className="paper-plane-decoration" />
        <img src={seagullBanner} alt="Partner logos and seagull" className="seagull-banner" />

        <div className="welcome-content">
          <img src={logoBubble} alt="Toy Community Logo" className="logo" />
          <div className="intro-text">
            <p>👋 Hey, welcome to Toy Community!</p>
            <p>Right now, we invite you to share your character toys in the community and engage in dialogue around them.</p>
          </div>
          <button className="start-button" onClick={() => setCurrentPage('dollhouse')}>
            LET'S GO!
          </button>
        </div>
      </div>
    )
  }

  if (currentPage === 'dollhouse') {
    return (
      <div className="mobile-container dollhouse-screen" style={{ backgroundImage: `url(${worldBg})` }}>
        <header className="dollhouse-header">
          {/* Left: Back Button */}
          <button className="pretty-back-btn" onClick={() => setCurrentPage('welcome')}>
            BACK
          </button>
          
          {/* Small Logo */}
          <img src={logoBubble} alt="Logo" className="small-logo" onClick={handleSecretTap} />
          
          {/* Right: The Info Icon */}
          <button className="info-btn" onClick={() => setShowInfoModal(true)}>
            <img src={infoIcon} alt="How to play" />
          </button>
        </header>

        {isAdminMode && (
          <>
            {/* 1. The Dark Overlay */}
            <div className="admin-dark-overlay" />

            {/* 2. The Exit Button */}
            <button
              className="btn-exit-moderation"
              onClick={() => setIsAdminMode(false)}
            >
              EXIT MODERATION MODE
            </button>
          </>
        )}

        <div className="house-display" style={{ backgroundImage: `url(${dollhouseBg})` }}>
          {savedToys.map((toy, index) => (
            <div 
              key={toy.id} 
              className="saved-toy" 
              style={{ 
                width: `${toy.size}px`, 
                height: `${toy.size}px`, 
                transform: `translate(${toy.x}px, ${toy.y}px)`,
                position: 'absolute', /* Ensures z-index works properly */
                zIndex: isAdminMode ? 60 : 1 /* 60 puts it above the 50 overlay! */
              }}
            >
              <img src={toy.image} alt="Saved toy" />
              {isAdminMode && (
                <button
                  className="btn-delete-toy"
                  onClick={() => handleDeleteSingleToy(index)}
                >
                  X
                </button>
              )}
              {/* Clicking now passes the exact index of this toy */}
              <button className="story-bubble-btn" onClick={() => setActiveToyIndex(toy.id)}>
                <img src={customBubble} alt="Read Story" />
              </button>
            </div>
          ))}

          {placedToy && (
            <div className="draggable-toy" style={{ width: `${toySize}px`, height: `${toySize}px` }}>
              <img src={placedToy.image} alt="Placed toy" />
              <button className="resize-btn" onPointerDown={handleResizeClick}>⤢</button>
            </div>
          )}
        </div>

        <div className="bottom-panel">
          {!placedToy ? (
            <button className="create-button" onClick={() => setIsModalOpen(true)}>+</button>
          ) : (
          <> {/* 1. ADD THIS INVISIBLE OPENING TAG */}
            <div className="bottom-actions">
              <button className="nav-btn btn-outline" onClick={handleBackToEdit}>BACK</button>
              <button className="nav-btn btn-solid-active" onClick={handleDoneClick}>DONE</button>
            </div>
            
            {uploadMessage && (
              <p style={{
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#d9534f'
              }}>
                {uploadMessage}
              </p>
            )}
          </>
        )}
        </div>

        {/* --- INFO MODAL OVERLAY --- */}
        {showInfoModal && (
          <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
            {/* The white text box */}
            <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Welcome to the Toy Community!</h3>
              <p>Here, you can place your character toys in this dollhouse using your mobile device; at the same time, your toys are also displayed on the real dollhouse model.</p>           
              <p>We engage you to share your toys' story, allowing others to know them more and start a conversation.</p>
              <p>You can also click the icons next to other toys to discover their stories and join their dialogues.</p>
            </div>
          </div>
        )}

        {/* --- NEW DETAILS & COMMENTS PAGE --- */}
        {activeToy && (
          <div className="details-overlay" onClick={() => setActiveToyIndex(null)}>
            {/* 1. The dark overlay that covers the whole screen */}
            
            {/* 2. The actual pop-up card that sits at the bottom */}
            <div className="details-bottom-sheet" onClick={(e) => e.stopPropagation()}>
              
              {/* Header */}
              <div className="details-header">
                <div style={{ width: '30px' }}></div> {/* Spacer for centering */}
                <button className="details-close-btn" onClick={() => setActiveToyIndex(null)}>
                  X
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="details-content">
                
                {/* Toy Image Box */}
                <div className="details-image-box">
                  <img src={activeToy.image} alt="Toy detail" />
                </div>

                {/* Story Box */}
                <div className="details-story-box">
                  <p>{activeToy.story}</p>
                  <span className="details-date">{activeToy.date}</span>
                </div>

                {/* Comments Section */}
                <div className="comments-divider">
                  <span>— COMMENTS —</span>
                </div>
                
                <div className="comments-list">
                {activeToy.comments.length === 0 ? (
                  <p className="no-comments">No comments yet. Be the first to start the dialogue!</p>
                ) : (
                  activeToy.comments.map((comment, i) => (
                    <div key={i} className="comment-item">
                      {/* 1. Show the image if the comment has one! */}
                      {comment.image && <img src={comment.image} alt="attached" className="comment-attached-image" />}
                      
                      {/* 2. Show the text if they wrote any */}
                      {comment.text && <p className="comment-text">{comment.text || comment}</p>}
                      
                      <span className="comment-date">{comment.date || "2026.07.06"}</span>
                    </div>
                  ))
                )}
              </div>
              
              <div style={{height: '170px'}}></div> 
            </div>

            {/* --- STICKY INPUT BAR --- */}
            <div className="details-input-bar">
              
              {/* Small preview area to show the user what photo they attached before sending */}
              {commentImage && (
                <div className="comment-image-preview">
                  <img src={commentImage} alt="Attachment preview" />
                  <button onClick={() => {
                    setCommentImage(null);
                    setCommentImageFile(null);
                  }}>X</button>
                </div>
              )}

              <div className="input-wrapper">
                <textarea 
                  className="comment-text-area"
                  placeholder="Make a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    // This lets "Enter" send the message, but "Shift + Enter" make a new line!
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault(); 
                      handleAddComment();
                    }
                  }}
                  rows="2" 
                />

                <div className="input-actions">
                  
                  {/* The Hidden Input for Comments */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={commentFileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleCommentImageUpload} 
                  />

                  {/* The Photo Icon is now a working button! */}
                  <button 
                    className="icon-btn" 
                    onClick={() => commentFileInputRef.current.click()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </button>
                  
                  {/* Fake link icon */}
                  <button className="icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </button>
                  
                  <button className="send-btn" onClick={handleAddComment}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a3b8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4"/><path d="M12 16V8"/></svg>
                  </button>
                </div>
              </div>
            </div>

            </div> 
          </div> 
        )}

        {/* Upload Modal (Existing code) */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={handleCloseModal}>X</button>
              
              <div className="upload-section">
                <div className="sticker-header yellow-sticker">Upload a photo of your character toy</div>
                {!selectedImage ? (
                  <div className="upload-box custom-dash-red" onClick={() => setShowUploadModal(true)}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e84e3a" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5-5 5 5m-5-5v12"/></svg>
                <p className="bold-text">Drop jpeg or png</p>
                <p className="subtext">Max file size: 5 MB</p>
              </div>
                ) : (
                  <div className={`image-preview ${isBgRemoved ? 'no-dash' : 'custom-dash-brown'}`}>
                    <img src={selectedImage} alt="Uploaded toy preview" />
                  </div>
                )}
                
                {!selectedImage ? (
                  <button className="remove-bg-btn disabled" disabled>TO REMOVE BACKGROUND</button>
                ) : !isBgRemoved ? (
                  <button className="remove-bg-btn active-red" onClick={handleRemoveBackground} disabled={isRemovingBg}>
                    {isRemovingBg ? "REMOVING... (PLEASE WAIT)" : "TO REMOVE BACKGROUND"}
                  </button>
                ) : (
                  <button className="remove-bg-btn disabled" disabled>BACKGROUND REMOVED ✓</button>
                )}
              </div>

              <div className="story-section">
                <div className={`sticker-header ${isBgRemoved ? 'yellow-sticker' : 'gray-sticker-disabled'}`}>Share a story about your character toy</div>
                {isBgRemoved && (
                  <div>
                    <textarea placeholder="A maximum of 100 words." value={storyText} onChange={(e) => setStoryText(e.target.value)} />
                    <div className="word-count" style={{ color: wordCount > 100 ? '#e84e3a' : '#888' }}>{wordCount} / 100 words</div>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button className="nav-btn btn-outline" onClick={() => {
                if (selectedImage) {
                 // Clear the toy and stay on this screen
                 setSelectedImage(null);
                 setIsBgRemoved(false);
                } else {
                // The box is empty, so close the big modal and return to the 2 options
                setIsModalOpen(false);
                setShowUploadModal(true); 
                }
                }}>BACK</button>
                
                <button className={`nav-btn ${isNextValid ? 'btn-solid-active' : 'btn-solid-disabled'}`} onClick={handleNextClick} disabled={!isNextValid}>NEXT</button>
              </div>

            </div>
          </div>
        )}
        {/* --- UPLOAD OPTIONS MODAL --- */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>We offer you two ways for uploading:</h3>
              
              <div className="upload-options">
                
                {/* 1. THE HIDDEN INPUT */}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 

                  onChange={(event) => {
                    // 1. Grab the file data immediately!
                    const caughtFile = event.target.files[0]; 
                    
                    // 2. Safely lock it into your state
                    setSelectedFile(caughtFile); 
                    
                    // 3. Print it to prove we have it
                    console.log("File safely caught by React:", caughtFile); 
                    
                    // 4. NOW run your visual preview
                    handleImageUpload(event); 
                  }}
                />

                {/* 2. YOUR BEAUTIFUL BUTTON */}
                <button 
                  className="upload-option-btn" 
                  onClick={openPhotoAlbum}
                >
                  <span className="emoji-icon">📱</span> 
                  Access to your personal photo album
                </button>
                
                <button 
                  className="upload-option-btn" 
                  onClick={() => {
                    setShowArchive(true);
                    setShowUploadModal(false); 
                  }}
                >
                  <span className="emoji-icon">🏛️</span> 
                  Find a plush toy in the museum archive album
                </button>
              </div>

              <button className="cancel-text-btn" onClick={() => setShowUploadModal(false)}>
                CANCEL
              </button>
            </div>
          </div>
        )}
        {/* --- MUSEUM ARCHIVE ALBUM OVERLAY --- */}
      {showArchive && (
        <div className="archive-overlay">
          
          <div className="archive-header">
            <button className="pretty-back-btn" onClick={() => setShowArchive(false)}>
              BACK
            </button>
            <h2>Museum Archive</h2>
            <div style={{ width: '60px' }}></div> {/* Spacer to keep title centered */}
          </div>

          <div className="archive-grid">
            {archiveToys.map((toy) => (
              <div 
                key={toy.id} 
                className="archive-card"
                onClick={() => handleSelectArchiveToy(toy)}
              >
                <div className="archive-img-container">
                  <img src={toy.image} alt={toy.name} />
                </div>
                <p>{toy.name}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* --- ADMIN PANEL CODE GOES HERE --- */}
      {showAdminPanel && (
        <div className="modal-overlay">
          <div className="upload-modal-content">
            <h3 className="admin-panel-title">STAFF CONTROLS</h3>
            <button 
              className="nav-btn btn-solid btn-select-toys"
              onClick={() => {
                setIsAdminMode(true);
                setShowAdminPanel(false);
              }}
            >
              SELECT TOYS TO DELETE
            </button>

            <button 
              className="nav-btn btn-outline btn-wipe-dollhouse"
              onClick={handleWipeDollhouse}
            >
              WIPE ENTIRE DOLLHOUSE
            </button>
            
            <button 
              className="nav-btn btn-solid" 
              onClick={() => setShowAdminPanel(false)}
            >
              CLOSE ADMIN
            </button>
          </div>
        </div>
      )}

      </div>
    )
  }
}

export default App