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
const IMAGE_UPLOAD_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL || `${API_BASE_URL}/upload`;

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
  image: String(comment.imageUrl || '').replace(/^http:\/\//i, 'https://'),
  date: formatDate(comment.dateCreated),
});

const normalizeToy = (toy) => ({
  id: toy.id,
  image: String(toy.imageUrl || '').replace(/^http:\/\//i, 'https://'),
  story: toy.story,
  // Older API responses expose this value as `size`; keep existing records visible.
  scale: Math.max(Number(toy.scale ?? toy.size) || 0, 10),
  rotation: Number(toy.rotation) || 0,
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
    welcome: '👋 Hey, we invite you to share your character toys and engage in dialogue around them.',
    letsGo: "LET'S GO!",
    consentText: 'Accepto la recopilació i l’ús de les meves contribucions digitals i de les dades d’interacció amb el sistema amb finalitats de recerca.',
    consentTitle: 'Consentiment per a les dades d’interacció amb el sistema (per a usuaris)',
    consentDetails: 'Com es recopilen i s’utilitzen les teves dades',
    consentIntro: 'Durant la teva interacció amb la interfície de Toy Community, podem recopilar el contingut digital que creïs o enviïs (p. ex., contribucions sobre joguines, històries i comentaris) i registres d’interacció amb el sistema (p. ex., marques de temps i registres de les teves interaccions amb el sistema).',
    consentData: 'Aquestes dades s’utilitzaran exclusivament per a la recerca acadèmica, per entendre la participació dels visitants i la interacció social amb la instal·lació. Els resultats es poden presentar en publicacions acadèmiques, congressos i altres productes de recerca.',
    consentUseBeforeGdpr: 'Les teves dades es tractaran d’acord amb el ',
    consentGdpr: 'Reglament general de protecció de dades (RGPD, UE 2016/679)',
    consentUseAfterGdpr: ' i amb la legislació aplicable en matèria de protecció de dades. L’accés a les dades recopilades es limitarà als membres autoritzats de l’equip de recerca, i les dades s’emmagatzemaran de manera segura i es conservaran només durant el període necessari per a les finalitats de recerca o segons el que exigeixi la normativa aplicable.',
    consentChoice: 'La participació és voluntària. Pots rebutjar el consentiment sense que això afecti la teva visita al museu ni l’accés a la instal·lació. Quan el consentiment sigui la base legal del tractament, pots retirar-lo en qualsevol moment fins al 25 de desembre de 2026, sense afectar la licitud del tractament realitzat abans de la retirada. Tingues en compte que les dades que ja hagin estat anonimitzades irreversiblement o incorporades a una recerca publicada poden deixar de ser identificables o no es poden eliminar.',
    consentRights: 'D’acord amb la legislació aplicable en matèria de protecció de dades, pots tenir dret a accedir, rectificar, suprimir o limitar el tractament de les teves dades personals, així com altres drets aplicables. Per exercir aquests drets o fer preguntes sobre el tractament de les teves dades, contacta amb shuxin.zhang@campus.eram.cat.',
    consentBack: 'TORNAR A L’INICI',
    back: 'BACK',
    done: 'DONE',
    howToPlay: 'How to play',
    infoTitle: 'Welcome to the Toy Community!',
    infoOne: 'Here, you can place your character toys in this dollhouse using your mobile device; at the same time, your toys are also displayed on the real dollhouse model.',
    infoTwo: "We engage you to share your toys' story, allowing others to know them more and start a conversation.",
    infoThree: 'You can also click the icons next to other toys to discover their stories and join their dialogues.',
    comments: 'COMMENTS',
    noComments: 'No comments yet. Be the first to start the dialogue!',
    commentPlaceholder: 'Make a comment or attach a photo...',
    attachPhoto: 'Attach a photo',
    sendComment: 'Send comment',
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
    consentText: 'Acepto la recopilación y el uso de mis contribuciones digitales y de los datos de interacción con el sistema para fines de investigación.',
    consentTitle: 'Consentimiento para los datos de interacción con el sistema (para usuarios)',
    consentDetails: 'Cómo se recopilan y utilizan tus datos',
    consentIntro: 'Durante tu interacción con la interfaz de Toy Community, podemos recopilar el contenido digital que crees o envíes (por ejemplo, contribuciones sobre juguetes, historias y comentarios) y registros de interacción con el sistema (por ejemplo, marcas de tiempo y registros de tus interacciones con el sistema).',
    consentData: 'Estos datos se utilizarán exclusivamente para la investigación académica, con el fin de comprender la participación de los visitantes y la interacción social con la instalación. Los resultados pueden presentarse en publicaciones académicas, congresos y otros productos de investigación.',
    consentUseBeforeGdpr: 'Tus datos se tratarán de conformidad con el ',
    consentGdpr: 'Reglamento General de Protección de Datos (RGPD, UE 2016/679)',
    consentUseAfterGdpr: ' y la legislación aplicable en materia de protección de datos. El acceso a los datos recopilados se limitará a los miembros autorizados del equipo de investigación, y los datos se almacenarán de forma segura y se conservarán únicamente durante el periodo necesario para los fines de investigación o según lo exija la normativa aplicable.',
    consentChoice: 'La participación es voluntaria. Puedes rechazar el consentimiento sin que ello afecte a tu visita al museo ni al acceso a la instalación. Cuando el consentimiento sea la base legal del tratamiento, puedes retirarlo en cualquier momento hasta el 25 de diciembre de 2026, sin afectar a la licitud del tratamiento realizado antes de la retirada. Ten en cuenta que los datos que ya hayan sido anonimizados de forma irreversible o incorporados a una investigación publicada pueden dejar de ser identificables o no podrán eliminarse.',
    consentRights: 'De acuerdo con la legislación aplicable en materia de protección de datos, puedes tener derecho a acceder, rectificar, suprimir o limitar el tratamiento de tus datos personales, así como otros derechos aplicables. Para ejercer estos derechos o hacer preguntas sobre el tratamiento de tus datos, contacta con shuxin.zhang@campus.eram.cat.',
    consentBack: 'VOLVER AL INICIO',
    back: 'ENRERE',
    done: 'FET',
    howToPlay: 'Com jugar',
    infoTitle: 'Benvingut/da a Toy Community!',
    infoOne: 'Aquí pots col·locar les teves joguines personatge en aquesta casa amb el mòbil; alhora, també es mostren a la casa real.',
    infoTwo: 'Comparteix la història de la teva joguina perquè els altres la coneguin i iniciïn una conversa.',
    infoThree: 'També pots clicar les icones al costat de les joguines per descobrir les seves històries i unir-te als diàlegs.',
    comments: 'COMENTARIS',
    noComments: 'Encara no hi ha comentaris. Sigues el primer a iniciar el diàleg!',
    commentPlaceholder: 'Escriu un comentari o adjunta una foto...',
    attachPhoto: 'Adjunta una foto',
    sendComment: 'Envia el comentari',
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
    consentText: 'J’accepte la collecte et l’utilisation de mes contributions numériques et de mes données d’interaction avec le système à des fins de recherche.',
    consentTitle: 'Consentement concernant les données d’interaction avec le système (pour les utilisateurs)',
    consentDetails: 'Comment vos données sont collectées et utilisées',
    consentIntro: 'Lors de votre interaction avec l’interface Toy Community, nous pouvons collecter les contenus numériques que vous créez ou soumettez (par exemple, des contributions sur les jouets, des histoires et des commentaires) ainsi que les journaux d’interaction avec le système (par exemple, les horodatages et les enregistrements de vos interactions avec le système).',
    consentData: 'Ces données seront utilisées exclusivement à des fins de recherche universitaire afin de comprendre la participation des visiteurs et les interactions sociales avec l’installation. Les résultats peuvent être présentés dans des publications universitaires, des conférences et d’autres productions de recherche.',
    consentUseBeforeGdpr: 'Vos données seront traitées conformément au ',
    consentGdpr: 'Règlement général sur la protection des données (RGPD, UE 2016/679)',
    consentUseAfterGdpr: ' et à la législation applicable en matière de protection des données. L’accès aux données collectées sera limité aux membres autorisés de l’équipe de recherche, et les données seront conservées de manière sécurisée pendant la période nécessaire aux finalités de recherche ou pendant la durée requise par la réglementation applicable.',
    consentChoice: 'La participation est volontaire. Vous pouvez refuser votre consentement sans que cela affecte votre visite au musée ou votre accès à l’installation. Lorsque le consentement constitue la base légale du traitement, vous pouvez le retirer à tout moment jusqu’au 25 décembre 2026, sans affecter la licéité du traitement effectué avant le retrait. Veuillez noter que les données déjà rendues anonymes de manière irréversible ou intégrées à une recherche publiée peuvent ne plus être identifiables ou supprimables.',
    consentRights: 'En vertu de la législation applicable en matière de protection des données, vous pouvez avoir le droit d’accéder à vos données personnelles, de les rectifier, de les effacer ou de limiter leur traitement, ainsi que d’autres droits applicables. Pour exercer ces droits ou poser des questions sur le traitement de vos données, veuillez contacter shuxin.zhang@campus.eram.cat.',
    consentBack: 'RETOUR À L’ACCUEIL',
    back: 'ATRÁS',
    done: 'LISTO',
    howToPlay: 'Cómo jugar',
    infoTitle: '¡Bienvenido/a a Toy Community!',
    infoOne: 'Aquí puedes colocar tus juguetes personaje en esta casa con tu móvil; al mismo tiempo, también se muestran en la casa real.',
    infoTwo: 'Comparte la historia de tu juguete para que los demás lo conozcan y comiencen una conversación.',
    infoThree: 'También puedes pulsar los iconos junto a otros juguetes para descubrir sus historias y unirte a sus diálogos.',
    comments: 'COMENTARIOS',
    noComments: 'Aún no hay comentarios. ¡Sé el primero en iniciar el diálogo!',
    commentPlaceholder: 'Escribe un comentario o adjunta una foto...',
    attachPhoto: 'Adjunta una foto',
    sendComment: 'Enviar comentario',
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
    consentText: '我同意收集和使用我的数字贡献以及系统交互数据，用于研究目的。',
    consentTitle: '系统交互数据同意书（用户版）',
    consentDetails: '数据的收集和使用方式',
    consentIntro: '在你使用 Toy Community 界面的过程中，我们可能会收集你创建或提交的数字内容（例如玩具贡献、故事和评论）以及系统交互日志（例如时间戳和你与系统互动的记录）。',
    consentData: '这些数据将仅用于学术研究，以了解参观者参与情况以及与装置的社会互动。研究结果可能会发表在学术出版物、会议以及其他研究成果中。',
    consentUseBeforeGdpr: '你的数据将根据 ',
    consentGdpr: '《通用数据保护条例》（GDPR，欧盟 2016/679）',
    consentUseAfterGdpr: ' 以及适用的数据保护法律进行处理。收集的数据仅限研究团队中获得授权的成员访问，并将得到安全存储，仅在研究目的所需的期限内或适用法规要求的期限内保留。',
    consentChoice: '参与是自愿的。你可以拒绝同意，这不会影响你的博物馆参观或使用该装置的权利。如果同意是数据处理的法律依据，你可以在 2026 年 12 月 25 日之前随时撤回同意，且不会影响撤回前处理活动的合法性。请注意，已经被不可逆匿名化或纳入已发表研究的数据，可能无法再被识别或删除。',
    consentRights: '根据适用的数据保护法律，你可能拥有访问、更正、删除或限制处理个人数据的权利，以及其他适用的权利。如需行使这些权利，或询问数据处理方式，请联系 shuxin.zhang@campus.eram.cat。',
    consentBack: '返回欢迎页',
    back: 'RETOUR',
    done: 'TERMINÉ',
    howToPlay: 'Comment jouer',
    infoTitle: 'Bienvenue dans Toy Community !',
    infoOne: 'Ici, tu peux placer tes jouets personnages dans cette maison avec ton mobile ; ils sont aussi affichés sur la vraie maison.',
    infoTwo: 'Partage l’histoire de ton jouet pour que les autres le découvrent et commencent une conversation.',
    infoThree: 'Tu peux aussi cliquer sur les icônes près des jouets pour découvrir leurs histoires et rejoindre leurs dialogues.',
    comments: 'COMMENTAIRES',
    noComments: 'Aucun commentaire pour le moment. Sois le premier à lancer le dialogue !',
    commentPlaceholder: 'Écris un commentaire ou ajoute une photo...',
    attachPhoto: 'Ajouter une photo',
    sendComment: 'Envoyer le commentaire',
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
    consentText: 'I agree to the collection and use of my digital contributions and system interaction data for the research purposes.',
    consentTitle: 'Consent for System Interaction Data (for users)',
    consentDetails: 'How your data is collected and used',
    consentIntro: 'During your interaction with the Toy Community interface, we may collect the digital content you create or submit (e.g., toy contributions, stories, and comments) and system interaction logs (e.g., timestamps and records of your interactions with the system).',
    consentData: 'This data will be used exclusively for academic research to understand visitor participation and social interaction with the installation. The findings may be presented in academic publications, conferences, and other research outputs.',
    consentUseBeforeGdpr: 'Your data will be processed in accordance with the ',
    consentGdpr: 'General Data Protection Regulation (GDPR, EU 2016/679)',
    consentUseAfterGdpr: ' and applicable data protection legislation. Access to the collected data will be restricted to authorized members of the research team, and the data will be stored securely and retained only for the period necessary for the research purposes or as required by applicable regulations.',
    consentChoice: 'Participation is voluntary. You may refuse consent without affecting your museum visit or access to the installation. Where consent is the legal basis for processing, you may withdraw your consent at any time until 25 December 2026, without affecting the lawfulness of processing carried out before withdrawal. Please note that data that have already been irreversibly anonymized or incorporated into published research may no longer be identifiable or removable.',
    consentRights: 'Under applicable data protection law, you may have the right to access, rectify, erase, or restrict the processing of your personal data, as well as other applicable rights. To exercise these rights or ask questions about how your data are processed, please contact shuxin.zhang@campus.eram.cat.',
    consentBack: 'BACK TO WELCOME',
    back: '返回',
    done: '完成',
    howToPlay: '玩法介绍',
    infoTitle: '欢迎来到 Toy Community！',
    infoOne: '你可以使用手机把角色玩具放进这座玩具屋，同时它们也会显示在真实的玩具屋模型上。',
    infoTwo: '分享玩具的故事，让其他人了解它并开始交流。',
    infoThree: '你也可以点击其他玩具旁边的图标，发现它们的故事并加入对话。',
    comments: '评论',
    noComments: '还没有评论。成为第一个发起对话的人吧！',
    commentPlaceholder: '发表评论或附加照片……',
    attachPhoto: '附加照片',
    sendComment: '发送评论',
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
  const consentSourceByLanguage = {
    en: 'zh',
    ca: 'en',
    es: 'ca',
    fr: 'es',
    zh: 'fr',
  };
  const consentKeys = [
    'consentText',
    'consentTitle',
    'consentDetails',
    'consentIntro',
    'consentData',
    'consentUseBeforeGdpr',
    'consentGdpr',
    'consentUseAfterGdpr',
    'consentChoice',
    'consentRights',
    'consentBack',
  ];
  const baseTranslations = translations[language] || translations.en;
  const consentTranslations = translations[consentSourceByLanguage[language]] || translations.zh;
  const t = consentKeys.reduce(
    (result, key) => ({ ...result, [key]: consentTranslations[key] }),
    baseTranslations,
  );
  const [researchConsent, setResearchConsent] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [savedToys, setSavedToys] = useState([])
  const [activeToyIndex, setActiveToyIndex] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [commentImage, setCommentImage] = useState(null);
  const [commentImageFile, setCommentImageFile] = useState(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [shouldScrollCommentsToBottom, setShouldScrollCommentsToBottom] = useState(false);
  const commentsContentRef = useRef(null);

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
    if (window.location.pathname === '/research-consent') return 'research-consent';
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
  const [toyRotation, setToyRotation] = useState(0)

  const wordCount = storyText.trim() === '' ? 0 : storyText.trim().split(/\s+/).length
  const isNextValid = isBgRemoved && wordCount > 0 && wordCount <= 100

  const activeToy = savedToys.find((toy) => toy.id === activeToyIndex) || null;

  useEffect(() => {
    if (!shouldScrollCommentsToBottom || !activeToy) return;

    const frame = requestAnimationFrame(() => {
      if (commentsContentRef.current) {
        commentsContentRef.current.scrollTop = commentsContentRef.current.scrollHeight;
      }
      setShouldScrollCommentsToBottom(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [activeToy, shouldScrollCommentsToBottom]);

  const goToPage = (page) => {
    setCurrentPage(page);
    navigate(`/${page === 'welcome' ? '' : page}`);
  };
  

  useEffect(() => {
    const draggableToy = interact('.draggable-toy').draggable({
      ignoreFrom: '.resize-btn, .rotate-btn', 
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

          target.style.setProperty('--toy-translate-x', `${x}px`)
          target.style.setProperty('--toy-translate-y', `${y}px`)
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

  const handleRotateClick = (e) => {
    e.preventDefault();
    const nextRotation = (toyRotation + 270) % 360;
    setToyRotation(nextRotation);
    setPlacedToy((previousToy) => (
      previousToy ? { ...previousToy, rotation: nextRotation } : previousToy
    ));
  };

  const handleAddComment = () => {
    // Comments now persist through the backend.
    if ((!newComment.trim() && !commentImageFile) || !activeToy || isSubmittingComment) return;

    const submitComment = async () => {
      setIsSubmittingComment(true);
      setUploadMessage('');
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
      setShouldScrollCommentsToBottom(true);
      setNewComment('');
      setCommentImage(null);
      setCommentImageFile(null);
    };

    submitComment().catch((error) => {
      console.error(error);
      setUploadMessage(error.message);
    }).finally(() => {
      setIsSubmittingComment(false);
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

  const handleUploadImage = async () => {
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

      const response = await fetch(IMAGE_UPLOAD_URL, {
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
      if (!contentType.includes('application/json')) {
        throw new Error(
          'The background-removal service must return JSON with the persisted image URL.',
        );
      }

      const result = await response.json();
      const processedImageUrl = result.processedImageUrl || result.imageUrl || result.url;
      if (!processedImageUrl) {
        throw new Error('The server response did not include a processed image URL.');
      }
      if (!result.originalImageUrl && !result.originalUrl) {
        throw new Error('The server response did not include the original image URL.');
      }

      setSelectedImage((previousUrl) => {
        if (previousUrl?.startsWith('blob:')) URL.revokeObjectURL(previousUrl);
        return processedImageUrl;
      });
      setSelectedFile(null);
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
        imageUrl: selectedImage,
        story: storyText,
        rotation: toyRotation,
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
    setToyRotation(placedToy.rotation || 0)
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
    const positionConflict = savedToys.some((toy) => (
      Math.abs(toy.x - percentX) < 4 &&
      Math.abs(toy.y - percentY) < 4
    ));

    if (positionConflict) {
      setUploadMessage('Your creation will be covered up by an existing creation. Please replace it.');
      return;
    }
    
    try {
      const imageUrl = placedToy.imageUrl || placedToy.image;
      if (!imageUrl || imageUrl.startsWith('blob:')) {
        throw new Error('The processed image has not been saved by the server yet.');
      }

      const saveResponse = await fetch(`${API_BASE_URL}/toys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          positionX: percentX, // <-- Make sure it uses percentX
          positionY: percentY, // <-- Make sure it uses percentY
          scale: toySize,
          rotation: toyRotation,
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
      setToyRotation(0)
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
                   '--toy-rotation': `${toy.rotation || 0}deg`,
                   '--story-delay': `${index * -2}s`,
                   '--walk-delay': `${index * -0.7}s`,
                   zIndex: savedToys.length - index
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

  if (currentPage === 'research-consent') {
    return (
      <div className="mobile-container dollhouse-screen" style={{ backgroundImage: `url(${worldBg})` }}>
        <img src={buildingBg} alt="" className="building-bg-img" />
        <main className="consent-page">
          <h1>{t.consentTitle}</h1>
          <p>{t.consentIntro}</p>
          <h2>{t.consentDetails}</h2>
          <p>{t.consentData}</p>
          <p>
            {t.consentUseBeforeGdpr ? (
              <>
                {t.consentUseBeforeGdpr}<strong>{t.consentGdpr}</strong>{t.consentUseAfterGdpr}
              </>
            ) : t.consentUse}
          </p>
          <p>{t.consentChoice}</p>
          {t.consentRights && <p>{t.consentRights}</p>}
          <button className="nav-btn btn-outline consent-back-button" onClick={() => goToPage('welcome')}>
            {t.consentBack}
          </button>
        </main>
      </div>
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
          <div className="consent-checkbox">
            <input
              id="research-consent"
              type="checkbox"
              checked={researchConsent}
              onChange={(event) => setResearchConsent(event.target.checked)}
            />
            <span>
              <a
                href="/research-consent"
                className="consent-link"
                onClick={(event) => {
                  event.preventDefault();
                  goToPage('research-consent');
                }}
              >
                {t.consentText}
              </a>
            </span>
          </div>
          <button
            className="start-button"
            disabled={!researchConsent}
            onClick={() => goToPage('dollhouse')}
          >
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
                  zIndex: savedToys.length - index,
                  transform: `rotate(${toy.rotation || 0}deg)`
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
                  zIndex: savedToys.length + 1,
                  transform: 'translate(var(--toy-translate-x, 0px), var(--toy-translate-y, 0px)) ' +
                    `rotate(${toyRotation}deg)`,
                }}
              >
                <img src={placedToy.image} alt="Placed toy" />
               <div className="toy-control-buttons">
                 <button className="resize-btn" onPointerDown={handleResizeClick}>⤢</button>
                 <button className="rotate-btn" onPointerDown={handleRotateClick} aria-label="Rotate toy left">↺</button>
               </div>
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
              <div className="details-content" ref={commentsContentRef}>
                
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
                    <div key={comment.id || `comment-${i}`} className="comment-item">
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
                  aria-busy={isSubmittingComment}
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
                    aria-label={t.attachPhoto}
                    title={t.attachPhoto}
                    disabled={isSubmittingComment}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                  </button>
                  <button
                    className="send-btn"
                    onClick={handleAddComment}
                    aria-label={t.sendComment}
                    title={t.sendComment}
                    disabled={isSubmittingComment || (!newComment.trim() && !commentImageFile)}
                  >
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
                  <button className="remove-bg-btn active-red" onClick={handleUploadImage} disabled={isRemovingBg}>
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