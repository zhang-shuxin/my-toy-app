import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import interact from 'interactjs'
import './App.css'

import landingBg from './assets/landing-bg.png'
import logoBubble from './assets/logo-bubble.png'
import dollhouseBg from './assets/dollhouse-bg.png'
import dollhouseBgProjector from './assets/dollhouse-bg-projector.png'
import customBubble from './assets/custom-bubble.png'
import seagullBanner from './assets/seagull-banner.png'
import worldBg from './assets/world-bg.png'
import buildingBg from './assets/building-bg.png';
import infoIcon from './assets/info-icon.png'
import StaffControlPage from './pages/StaffControlPage.jsx'

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
const BACKGROUND_REMOVAL_URL = import.meta.env.VITE_BACKGROUND_REMOVAL_URL || `${API_BASE_URL}/remove-background`;

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
  image: String(toy.imageUrl || '').replace(/^http:\/\//i, 'https://'),
  story: toy.story,
  // Older API responses expose this value as `size`; keep existing records visible.
  scale: Math.max(Number(toy.scale ?? toy.size) || 0, 10),
  x: Number(toy.positionX || 0),
  y: Number(toy.positionY || 0),
  comments: Array.isArray(toy.comments)
    ? toy.comments.map(normalizeComment)
    : [],
  date: formatDate(toy.dateCreated),
});

const getProjectorStoryPreview = (story) => {
  const words = String(story || '').trim().split(/\s+/).filter(Boolean);
  return words.length > 6
    ? `${words.slice(0, 6).join(' ')}...`
    : words.join(' ');
};

const translations = {
  en: {
    language: 'Language',
    welcome: '👋 Hey, welcome to Toy Community! We invite you to share your character toys in the community and engage in dialogue around them.',
    letsGo: "LET'S GO!",
    back: 'BACK',
    done: 'DONE',
    howToPlay: 'How to play',
    infoTitle: 'Welcome to the Toy Community!',
    infoOne: 'Here, you can place your character toys in this dollhouse using your mobile device; at the same time, your toys are also displayed on the real dollhouse model.',
    infoTwo: "We engage you to share your toys' story, allowing others to know them more and start a conversation.",
    infoThree: 'You can also click the icons next to other toys to discover their stories and join their dialogues.',
    comments: 'COMMENTS',
    noComments: 'No comments yet. Be the first to start the dialogue!',
    commentPlaceholder: 'Make a comment...',
    uploadPhoto: 'Upload a photo of your character toy',
    dropFile: 'Drop jpeg or png',
    maxFile: 'Max file size: 5 MB',
    removeBackground: 'UPLOAD & REMOVE BACKGROUND',
    removing: 'REMOVING... (PLEASE WAIT)',
    backgroundRemoved: 'BACKGROUND REMOVED ✓',
    shareStory: 'Share a story about your character toy',
    storyPlaceholder: 'A maximum of 100 words.',
    next: 'NEXT',
    uploadWays: 'We offer you two ways for uploading:',
    personalAlbum: 'Access to your personal photo album',
    museumArchive: 'Find a toy in the museum archive album',
    cancel: 'CANCEL',
    archiveTitle: 'Museum Archive',
  },
  ca: {
    language: 'Idioma',
    welcome: '👋 Hola, et donem la benvinguda a Toy Community! Comparteix les teves joguines personatge i participa en el diàleg de la comunitat.',
    letsGo: 'COMENCEM!',
    back: 'ENRERE',
    done: 'FET',
    howToPlay: 'Com jugar',
    infoTitle: 'Benvingut/da a Toy Community!',
    infoOne: 'Aquí pots col·locar les teves joguines personatge en aquesta casa amb el mòbil; alhora, també es mostren a la casa real.',
    infoTwo: 'Comparteix la història de la teva joguina perquè els altres la coneguin i iniciïn una conversa.',
    infoThree: 'També pots clicar les icones al costat de les joguines per descobrir les seves històries i unir-te als diàlegs.',
    comments: 'COMENTARIS',
    noComments: 'Encara no hi ha comentaris. Sigues el primer a iniciar el diàleg!',
    commentPlaceholder: 'Escriu un comentari...',
    uploadPhoto: 'Puja una foto de la teva joguina personatge',
    dropFile: 'Arrossega un jpeg o png',
    maxFile: 'Mida màxima: 5 MB',
    removeBackground: 'PUJA I ELIMINA EL FONS',
    removing: 'ELIMINANT... (ESPERA)',
    backgroundRemoved: 'FONS ELIMINAT ✓',
    shareStory: 'Comparteix una història sobre la teva joguina',
    storyPlaceholder: 'Màxim 100 paraules.',
    next: 'SEGÜENT',
    uploadWays: 'T’oferim dues maneres de pujar una imatge:',
    personalAlbum: 'Accedeix al teu àlbum de fotos',
    museumArchive: 'Troba una joguina a l’àlbum del museu',
    cancel: 'CANCEL·LA',
    archiveTitle: 'Arxiu del museu',
  },
  es: {
    language: 'Idioma',
    welcome: '👋 ¡Hola, bienvenido/a a Toy Community! Comparte tus juguetes personaje en la comunidad y participa en el diálogo.',
    letsGo: '¡VAMOS!',
    back: 'ATRÁS',
    done: 'LISTO',
    howToPlay: 'Cómo jugar',
    infoTitle: '¡Bienvenido/a a Toy Community!',
    infoOne: 'Aquí puedes colocar tus juguetes personaje en esta casa con tu móvil; al mismo tiempo, también se muestran en la casa real.',
    infoTwo: 'Comparte la historia de tu juguete para que los demás lo conozcan y comiencen una conversación.',
    infoThree: 'También puedes pulsar los iconos junto a otros juguetes para descubrir sus historias y unirte a sus diálogos.',
    comments: 'COMENTARIOS',
    noComments: 'Aún no hay comentarios. ¡Sé el primero en iniciar el diálogo!',
    commentPlaceholder: 'Escribe un comentario...',
    uploadPhoto: 'Sube una foto de tu juguete personaje',
    dropFile: 'Arrastra un jpeg o png',
    maxFile: 'Tamaño máximo: 5 MB',
    removeBackground: 'SUBIR Y ELIMINAR FONDO',
    removing: 'ELIMINANDO... (ESPERA)',
    backgroundRemoved: 'FONDO ELIMINADO ✓',
    shareStory: 'Comparte una historia sobre tu juguete',
    storyPlaceholder: 'Máximo 100 palabras.',
    next: 'SIGUIENTE',
    uploadWays: 'Te ofrecemos dos formas de subir una imagen:',
    personalAlbum: 'Accede a tu álbum de fotos',
    museumArchive: 'Busca un juguete en el álbum del museo',
    cancel: 'CANCELAR',
    archiveTitle: 'Archivo del museo',
  },
  fr: {
    language: 'Langue',
    welcome: '👋 Bonjour et bienvenue dans Toy Community ! Partage tes jouets personnages avec la communauté et participe au dialogue.',
    letsGo: 'C’EST PARTI !',
    back: 'RETOUR',
    done: 'TERMINÉ',
    howToPlay: 'Comment jouer',
    infoTitle: 'Bienvenue dans Toy Community !',
    infoOne: 'Ici, tu peux placer tes jouets personnages dans cette maison avec ton mobile ; ils sont aussi affichés sur la vraie maison.',
    infoTwo: 'Partage l’histoire de ton jouet pour que les autres le découvrent et commencent une conversation.',
    infoThree: 'Tu peux aussi cliquer sur les icônes près des jouets pour découvrir leurs histoires et rejoindre leurs dialogues.',
    comments: 'COMMENTAIRES',
    noComments: 'Aucun commentaire pour le moment. Sois le premier à lancer le dialogue !',
    commentPlaceholder: 'Écris un commentaire...',
    uploadPhoto: 'Ajoute une photo de ton jouet personnage',
    dropFile: 'Dépose un jpeg ou png',
    maxFile: 'Taille maximale : 5 Mo',
    removeBackground: 'ENVOYER ET SUPPRIMER L’ARRIÈRE-PLAN',
    removing: 'SUPPRESSION... (PATIENCE)',
    backgroundRemoved: 'ARRIÈRE-PLAN SUPPRIMÉ ✓',
    shareStory: 'Partage une histoire sur ton jouet',
    storyPlaceholder: 'Maximum 100 mots.',
    next: 'SUIVANT',
    uploadWays: 'Nous te proposons deux façons d’ajouter une image :',
    personalAlbum: 'Accéder à ton album photo',
    museumArchive: 'Trouver un jouet dans l’album du musée',
    cancel: 'ANNULER',
    archiveTitle: 'Archives du musée',
  },
  zh: {
    language: '语言',
    welcome: '👋 嗨，欢迎来到 Toy Community！分享你的角色玩具，加入社区并参与对话。',
    letsGo: '开始吧！',
    back: '返回',
    done: '完成',
    howToPlay: '玩法介绍',
    infoTitle: '欢迎来到 Toy Community！',
    infoOne: '你可以使用手机把角色玩具放进这座玩具屋，同时它们也会显示在真实的玩具屋模型上。',
    infoTwo: '分享玩具的故事，让其他人了解它并开始交流。',
    infoThree: '你也可以点击其他玩具旁边的图标，发现它们的故事并加入对话。',
    comments: '评论',
    noComments: '还没有评论。成为第一个发起对话的人吧！',
    commentPlaceholder: '发表评论……',
    uploadPhoto: '上传角色玩具照片',
    dropFile: '拖入 jpeg 或 png 文件',
    maxFile: '最大文件：5 MB',
    removeBackground: '上传并移除背景',
    removing: '正在移除……请稍候',
    backgroundRemoved: '背景已移除 ✓',
    shareStory: '分享你的角色玩具故事',
    storyPlaceholder: '最多 100 个单词。',
    next: '下一步',
    uploadWays: '我们提供两种上传方式：',
    personalAlbum: '访问你的手机相册',
    museumArchive: '在博物馆收藏中寻找玩具',
    cancel: '取消',
    archiveTitle: '博物馆收藏',
  },
};

function App() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => localStorage.getItem('toy-community-language') || 'en');
  const t = translations[language] || translations.en;
  const [showArchive, setShowArchive] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [savedToys, setSavedToys] = useState([])
  const [activeToyIndex, setActiveToyIndex] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setLanguage(nextLanguage);
    localStorage.setItem('toy-community-language', nextLanguage);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('view') === 'projector' || window.location.pathname === '/projector') {
      setIsProjectorMode(true);
    }
  }, []);

  const fetchToys = async () => {
    const response = await fetch(`${API_BASE_URL}/toys`);
    if (!response.ok) {
      throw new Error('Could not load toys from the server.');
    }

    const data = await response.json();
    setSavedToys(data.map(normalizeToy));
  };

  useEffect(() => {
    if (!isProjectorMode) return;

    // Fetch toys immediately when projector mode starts
    fetchToys(); 

    // Set an interval to fetch them every 3 seconds
    const interval = setInterval(() => {
      fetchToys();
    }, 3000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, [isProjectorMode]);

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
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname === '/staff-control') return 'staff-control';
    if (window.location.pathname === '/dollhouse') return 'dollhouse';
    return 'welcome';
  })
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) 
  
  const [selectedImage, setSelectedImage] = useState(null)
  const [isBgRemoved, setIsBgRemoved] = useState(false)
  const [isRemovingBg, setIsRemovingBg] = useState(false) 
  const [backgroundRemovalError, setBackgroundRemovalError] = useState('')
  const [storyText, setStoryText] = useState('')

  const [placedToy, setPlacedToy] = useState(null)
  const [toySize, setToySize] = useState(10) 

  const wordCount = storyText.trim() === '' ? 0 : storyText.trim().split(/\s+/).length
  const isNextValid = isBgRemoved && wordCount > 0 && wordCount <= 100

  const activeToy = savedToys.find((toy) => toy.id === activeToyIndex) || null;
  const goToPage = (page) => {
    setCurrentPage(page);
    navigate(`/${page === 'welcome' ? '' : page}`);
  };
  

  useEffect(() => {
    const draggableToy = interact('.draggable-toy').draggable({
      ignoreFrom: '.resize-btn', 
      inertia: true, 
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: '.dollhouse-bg-scope', 
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

    return () => draggableToy.unset()
  }, [placedToy]) 

  useEffect(() => {
    fetchToys().catch((error) => {
      console.error(error);
      setUploadMessage('Could not load toys from the server.');
    });
  }, []);

  const handleResizeClick = (e) => {
    e.preventDefault();

    setToySize((previousSize) => {
      if (previousSize === 10) return 12;
      if (previousSize === 12) return 15;
      return 10;
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
      setSelectedFile(file);
      setBackgroundRemovalError('');
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
    setBackgroundRemovalError('');

    try {
      let sourceFile = selectedFile;
      if (!sourceFile) {
        const sourceResponse = await fetch(selectedImage);
        if (!sourceResponse.ok) {
          throw new Error('Could not load the selected image.');
        }

        const sourceBlob = await sourceResponse.blob();
        sourceFile = new File([sourceBlob], 'toy-image', {
          type: sourceBlob.type || 'image/jpeg',
        });
      }

      const formData = new FormData();
      formData.append('toyImage', sourceFile, sourceFile.name);

      const response = await fetch(BACKGROUND_REMOVAL_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorMessage = responseText;
        try {
          errorMessage = JSON.parse(responseText).message || responseText;
        } catch {
          // Keep the plain-text server response for useful diagnostics.
        }

        throw new Error(
          `Background-removal service returned ${response.status}: ${
            errorMessage || response.statusText || 'request failed'
          }`,
        );
      }

      const contentType = response.headers.get('content-type') || '';
      let removedBackgroundBlob;
      if (contentType.includes('application/json')) {
        const result = await response.json();
        const imageUrl = result.imageUrl || result.url;
        if (!imageUrl) {
          throw new Error('The server response did not include a processed image.');
        }

        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
          throw new Error('The processed image could not be downloaded from the server.');
        }
        removedBackgroundBlob = await imageResponse.blob();
      } else {
        removedBackgroundBlob = await response.blob();
      }

      if (!removedBackgroundBlob.type.startsWith('image/')) {
        throw new Error('The server returned an invalid processed image.');
      }

      const url = URL.createObjectURL(removedBackgroundBlob);
      setSelectedImage((previousUrl) => {
        if (previousUrl?.startsWith('blob:')) URL.revokeObjectURL(previousUrl);
        return url;
      });
      setSelectedFile(new File([removedBackgroundBlob], 'transparent-toy.png', {
        type: removedBackgroundBlob.type || 'image/png',
      }));
      setIsBgRemoved(true);
    } catch (error) {
      console.error('Server background removal failed:', error);
      setBackgroundRemovalError(error.message || 'Background removal failed. Please try again.');
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
    setBackgroundRemovalError('')
    setStoryText('')
    setUploadMessage('')
  }

  const handleNextClick = () => {
    if (isNextValid) {
      setPlacedToy({
        image: selectedImage,
        story: storyText,
        file: selectedFile,
      });

      setIsModalOpen(false);
      setSelectedImage(null);
      setIsBgRemoved(false);
      setToySize(10);
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
   const toyEl = document.querySelector('.draggable-toy');
    
    // 1. Check for the mobile container first, fallback to projector container
    const container = document.querySelector('.dollhouse-bg-scope') || document.querySelector('.dollhouse-screen');

    if (!placedToy || !toyEl || !container) return;

    setUploadMessage('Saving your toy...');

    const toyBox = toyEl.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();

    const realX = toyBox.left - containerBox.left;
    const realY = toyBox.top - containerBox.top;

    // 2. Divide BOTH by containerBox.width! 
    const percentX = (realX / containerBox.width) * 100;
    const percentY = (realY / containerBox.height) * 100;
    const percentWidth = (toyBox.width / containerBox.width) * 100;

    const positionConflict = savedToys.some((toy) => (
      Math.abs(toy.x - percentX) < 4 &&
      Math.abs(toy.y - percentY) < 4
    ));

    if (positionConflict) {
      setUploadMessage('Your creation will be covered up by an existing creation. Please replace it.');
      return;
    }
    
    try {
      let imageUrl = placedToy.image;

      if (placedToy.image) {
        const response = await fetch(placedToy.image);
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
          positionX: percentX, // <-- Make sure it uses percentX
          positionY: percentY, // <-- Make sure it uses percentY
          scale: percentWidth,
          imageUrl, // (or whatever your image variable is)
          story: storyText, 
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
      setToySize(10)
    } catch (error) {
      console.error('Error:', error);
      setUploadMessage(error.message || 'Could not connect to the server.');
    }
  }

  if (isProjectorMode) {
    return (
      <div className="projector-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        
        <div className="dollhouse-screen projector-dollhouse-screen">
            
            <img 
              src={dollhouseBgProjector}
              alt="Dollhouse Alignment Guide" 
              className="projector-dollhouse-image"
            />
      
            {/* Render the saved toys perfectly aligned over the house */}
            <div className="projector-toys" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {savedToys.map((toy, index) => (
                <div
                  key={toy.id || index}
                  className="projector-toy"
                  style={{
                   position: 'absolute',
                   left: `${toy.x}%`,
                   top: `${toy.y}%`,
                   width: `${toy.scale}%`,
                   '--story-delay': `${index * -2}s`,
                   '--walk-delay': `${index * -0.7}s`,
                   zIndex: Math.round(toy.y * 100) + index
                  }}
                >
                  <img className="projector-toy-image" src={toy.image} alt={toy.story || "Toy"} />
                  <div className="projector-story-dialogue">
                    {getProjectorStoryPreview(toy.story)}
                  </div>
                  {toy.comments.length > 0 && (
                    <span
                      className="projector-comment-icon"
                      role="img"
                      aria-label="Toy has comments"
                    >
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </div>
              ))}
            </div>

        </div>
      </div>
    );
  }

  if (currentPage === 'staff-control') {
    return (
      <StaffControlPage
        apiBaseUrl={API_BASE_URL}
        onBack={() => goToPage('welcome')}
      />
    );
  }

  if (currentPage === 'welcome') {
    return (
      <div className="mobile-container dollhouse-screen" style={{ backgroundImage: `url(${worldBg})` }}>
        
        {/* --- DECORATIVE ELEMENTS --- */}
        <img src={buildingBg} alt="Museum Frame" className="building-bg-img" />
        <img src={seagullBanner} alt="Partner logos and seagull" className="seagull-banner" />

        <div className="welcome-content">
          <label className="language-picker">
            <span>{t.language}</span>
            <select value={language} onChange={handleLanguageChange} aria-label={t.language}>
              <option value="ca">Català</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </label>
          <img src={logoBubble} alt="Toy Community Logo" className="logo" />
          <div className="intro-text">
            <p>{t.welcome}</p>
          </div>
          <button className="start-button" onClick={() => goToPage('dollhouse')}>
            {t.letsGo}
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
          <button className="pretty-back-btn" onClick={() => goToPage('welcome')}>
            {t.back}
          </button>
          <img src={logoBubble} alt="Logo" className="small-logo" />
          {/* Right: The Info Icon */}
          <button className="info-btn" onClick={() => setShowInfoModal(true)}>
            <img src={infoIcon} alt={t.howToPlay} />
          </button>
        </header>

        <div className="house-display" style={{ backgroundImage: `url(${dollhouseBg})` }}>
          <div className="dollhouse-bg-scope">
            {savedToys.map((toy, index) => (
              <div 
                key={toy.id} 
                className="saved-toy" 
                style={{
                  position: 'absolute',
                  left: `${toy.x}%`,
                  top: `${toy.y}%`,
                  width: `${toy.scale}%`,
                  height: 'auto',
                  zIndex: 1
                }}
              >
                <img src={toy.image} alt="Saved toy" />
                {/* Clicking now passes the exact index of this toy */}
                <button className="story-bubble-btn" onClick={() => setActiveToyIndex(toy.id)}>
                  <img src={customBubble} alt="Read Story" />
                </button>
              </div>
            ))}

            {placedToy && (
              <div
                className="draggable-toy"
                data-x="0"
                data-y="0"
                style={{
                  position: 'absolute',
                  left: '8%',
                  top: '14%',
                  width: `${toySize}%`,
                  height: 'auto',
                }}
              >
                <img src={placedToy.image} alt="Placed toy" />
                <button className="resize-btn" onPointerDown={handleResizeClick}>⤢</button>
              </div>
            )}
          </div>
        </div>

        <div className="bottom-panel">
          {!placedToy ? (
            <button className="create-button" onClick={() => setIsModalOpen(true)}>+</button>
          ) : (
          <> {/* 1. ADD THIS INVISIBLE OPENING TAG */}
            <div className="bottom-actions">
              <button className="nav-btn btn-outline" onClick={handleBackToEdit}>{t.back}</button>
              <button className="nav-btn btn-solid-active" onClick={handleDoneClick}>{t.done}</button>
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
              <h3>{t.infoTitle}</h3>
              <p>{t.infoOne}</p>
              <p>{t.infoTwo}</p>
              <p>{t.infoThree}</p>
            </div>
          </div>
        )}

        {/* --- NEW DETAILS & COMMENTS PAGE --- */}
        {activeToy && (
          <div className="details-overlay" onClick={() => setActiveToyIndex(null)}>
            <div className="details-bottom-sheet" onClick={(e) => e.stopPropagation()}>
              
              {/* Header */}
              <div className="details-header">
                <div style={{ width: '30px' }}></div> {/* Spacer for centering */}
                <button
                  className="details-close-btn"
                  onClick={() => setActiveToyIndex(null)}
                  aria-label="Close comments"
                  title="Close comments"
                >
                  &times;
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
                  <span>— {t.comments} —</span>
                </div>
                
                <div className="comments-list">
                {activeToy.comments.length === 0 ? (
                  <p className="no-comments">{t.noComments}</p>
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
                  placeholder={t.commentPlaceholder} 
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
              <button className="close-btn" onClick={handleCloseModal}>&times;</button>
              <div className="upload-section">
                <div className="sticker-header yellow-sticker">{t.uploadPhoto}</div>
                {!selectedImage ? (
                  <div className="upload-box custom-dash-red" onClick={() => setShowUploadModal(true)}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e84e3a" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5-5 5 5m-5-5v12"/></svg>
                <p className="bold-text">{t.dropFile}</p>
                <p className="subtext">{t.maxFile}</p>
              </div>
                ) : (
                  <div className={`image-preview ${isBgRemoved ? 'no-dash' : 'custom-dash-brown'}`}>
                    <img src={selectedImage} alt="Uploaded toy preview" />
                  </div>
                )}
                
                {!selectedImage ? (
                  <button className="remove-bg-btn disabled" disabled>{t.removeBackground}</button>
                ) : !isBgRemoved ? (
                  <button className="remove-bg-btn active-red" onClick={handleRemoveBackground} disabled={isRemovingBg}>
                    {isRemovingBg ? t.removing : t.removeBackground}
                  </button>
                ) : (
                  <button className="remove-bg-btn disabled" disabled>{t.backgroundRemoved}</button>
                )}
                {backgroundRemovalError && (
                  <p className="background-removal-error" role="alert">{backgroundRemovalError}</p>
                )}
              </div>

              <div className="story-section">
                <div className={`sticker-header ${isBgRemoved ? 'yellow-sticker' : 'gray-sticker-disabled'}`}>{t.shareStory}</div>
                {isBgRemoved && (
                  <div>
                    <textarea placeholder={t.storyPlaceholder} value={storyText} onChange={(e) => setStoryText(e.target.value)} />
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
                }}>{t.back}</button>
                
                <button className={`nav-btn ${isNextValid ? 'btn-solid-active' : 'btn-solid-disabled'}`} onClick={handleNextClick} disabled={!isNextValid}>{t.next}</button>
              </div>

            </div>
          </div>
        )}
        {/* --- UPLOAD OPTIONS MODAL --- */}
        {showUploadModal && (
          <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{t.uploadWays}</h3>
              
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
                  {t.personalAlbum}
                </button>
                
                <button 
                  className="upload-option-btn" 
                  onClick={() => {
                    setShowArchive(true);
                    setShowUploadModal(false); 
                  }}
                >
                  <span className="emoji-icon">🏛️</span> 
                  {t.museumArchive}
                </button>
              </div>

              <button className="cancel-text-btn" onClick={() => setShowUploadModal(false)}>
                {t.cancel}
              </button>
            </div>
          </div>
        )}
        {/* --- MUSEUM ARCHIVE ALBUM OVERLAY --- */}
      {showArchive && (
        <div className="archive-overlay">
          
          <div className="archive-header">
            <button className="pretty-back-btn" onClick={() => setShowArchive(false)}>
              {t.back}
            </button>
            <h2>{t.archiveTitle}</h2>
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

      </div>
    )
  }
}

export default App