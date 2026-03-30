import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const INITIAL_PHOTOS = [
  { id: 1, src: "https://i.pinimg.com/control1/736x/02/e8/71/02e8711f76e7b2a3f1169569173150c8.jpg" },
  { id: 2, src: "https://i.pinimg.com/control1/736x/27/d0/61/27d061b012119ddb8fbd41bd237ac06a.jpg" },
  { id: 3, src: "https://i.pinimg.com/control1/1200x/90/5d/b7/905db749e633c4b7d3dfd7011814a1d5.jpg" },
  { id: 4, src: "https://i.pinimg.com/736x/7b/86/ee/7b86ee8b0b6e3f7e865077d5a8f6f6b4.jpg" },
  { id: 5, src: "https://i.pinimg.com/736x/42/fc/93/42fc93a5cb3bb84a5dc0ba11301a0684.jpg" },
  { id: 6, src: "https://i.pinimg.com/736x/f6/6b/e2/f66be24e886bcd1ee4b4ce957fbd5cec.jpg" },
  { id: 7, src: "https://i.pinimg.com/736x/08/aa/f8/08aaf8517a2ce94fc9d4c082f7f5a7c1.jpg" },
  { id: 8, src: "https://i.pinimg.com/736x/77/30/1e/77301eaa6e0e5c232bf88120ec0545c1.jpg" },
  { id: 9, src: "https://i.pinimg.com/control1/1200x/d8/ff/93/d8ff93aeed1d0e72c18f89783c385aa3.jpg" },
  { id: 10, src: "https://i.pinimg.com/control1/736x/04/30/22/043022d22ed39b8fae3f751bf3e3cd9b.jpg" },
  { id: 11, src: "https://i.pinimg.com/control1/736x/4b/13/cc/4b13ccafef332ce08dfcc3126be403f0.jpg" },
  { id: 12, src: "https://i.pinimg.com/control1/736x/8f/fb/15/8ffb15c4eb7deaf80ea9cc252a9ed096.jpg" },
  { id: 13, src: "https://i.pinimg.com/control1/1200x/5c/d1/b2/5cd1b2b97ae517cd673584dc87e959ea.jpg" },
  { id: 14, src: "https://i.pinimg.com/control1/736x/74/90/92/749092631217aece2a839dae54d1346d.jpg" },
].map(p => ({ ...p, likes: 0, comments: [], date: "30 Mar 2026" }));

export default function Home() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({ name: "Visitante" });

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
    const storedUser = JSON.parse(localStorage.getItem("user") || '{"name": "Visitante"}');
    setUser(storedUser);

    if (storedPhotos.length === 0 && localStorage.getItem("visited") !== "true") {
      localStorage.setItem("photos", JSON.stringify(INITIAL_PHOTOS));
      localStorage.setItem("visited", "true");
      setPhotos(INITIAL_PHOTOS);
    } else {
      setPhotos(storedPhotos);
    }
  }, []);

  const updatePhotosInStorage = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
    if (selectedPhoto) {
      setSelectedPhoto(updatedPhotos.find(p => p.id === selectedPhoto.id));
    }
  };

  const handleLike = (id) => {
    const updated = photos.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    updatePhotosInStorage(updated);
  };

  const handleComment = (id) => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: user.name,
      text: comment,
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    };
    const updated = photos.map(p => p.id === id ? { ...p, comments: [newComment, ...p.comments] } : p);
    updatePhotosInStorage(updated);
    setComment("");
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta foto?")) {
      const updated = photos.filter(p => p.id !== id);
      updatePhotosInStorage(updated);
      setSelectedPhoto(null);
    }
  };

  const handleDeleteComment = (photoId, commentId) => {
    const updated = photos.map(p => {
      if (p.id === photoId) {
        return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
      }
      return p;
    });
    updatePhotosInStorage(updated);
  };

  const handleDownload = (photo) => {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = `PhotoSpark-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Contabilizar download (opcional, para o dashboard)
    const updated = photos.map(p => p.id === photo.id ? { ...p, downloads: (p.downloads || 0) + 1 } : p);
    updatePhotosInStorage(updated);
  };

  // Organize photos into 4 columns for masonry effect
  const columns = [[], [], [], []];
  photos.forEach((photo, index) => {
    columns[index % 4].push(photo);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl bg-black/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex justify-between items-center px-6 py-3 z-50">
        <div className="navbar-start">
          <a onClick={() => navigate("/home")} className="navbar-item cursor-pointer">PhotoSpark</a>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <a
            onClick={() => navigate("/maisfotos")}
            className="navbar-item hover:text-indigo-400 cursor-pointer transition-colors"
          >
            + fotos
          </a>

          <a
            onClick={() => navigate("/dash")}
            className="navbar-item hover:text-indigo-400 cursor-pointer transition-colors"
          >
            Dashboard
          </a>

          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQGSRXuackG0jw/profile-displayphoto-scale_200_200/B4DZuBfcTNIYAY-/0/1767404063197?e=1776297600&v=beta&t=1sVW3YSkPiMZNjL13p8lWU2q9XFH3B3DvmAqiNiT2UQ"
            className="w-10 h-10 rounded-full border-2 border-white/20 shadow-sm"
          />
        </div>
      </div>

      {/* GALERIA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-12 flex-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="space-y-4">
              {column.map((photo) => (
                <div key={photo.id} className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                  <img
                    src={photo.src}
                    alt="Photo"
                    className="w-full h-auto object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none">
                    <div className="text-white text-xs font-medium flex items-center gap-3">
                      <span>❤️ {photo.likes}</span>
                      <span>💬 {photo.comments.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {photos.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            Nenhuma foto encontrada. Comece adicionando algumas!
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex flex-col md:flex-row shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Imagem */}
            <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[300px]">
              <img src={selectedPhoto.src} className="max-w-full max-h-[80vh] object-contain" />
            </div>

            {/* Lado Direito - Interações */}
            <div className="w-full md:w-80 bg-white p-6 flex flex-col border-l border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGSRXuackG0jw/profile-displayphoto-scale_200_200/B4DZuBfcTNIYAY-/0/1767404063197?e=1776297600&v=beta&t=1sVW3YSkPiMZNjL13p8lWU2q9XFH3B3DvmAqiNiT2UQ"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-gray-800">mcarolfll</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => handleLike(selectedPhoto.id)}
                  className="flex items-center gap-2 text-red-500 hover:scale-110 transition-transform"
                >
                  <span className="text-2xl">❤️</span>
                  <span className="font-bold">{selectedPhoto.likes}</span>
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownload(selectedPhoto)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <span>⬇️</span> Baixar
                  </button>

                  <button 
                    onClick={() => handleDeletePhoto(selectedPhoto.id)}
                    className="bg-red-50 text-red-600 p-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    title="Excluir Foto"
                  >
                    <span>🗑️</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Comentários ({selectedPhoto.comments.length})</h4>
                <div className="space-y-4">
                  {selectedPhoto.comments.map((c, i) => (
                    <div key={c.id || i} className="group relative text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-gray-900 mr-2">{c.user}</span>
                          <span className="text-gray-700">{c.text}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(selectedPhoto.id, c.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all text-xs p-1"
                          title="Excluir Comentário"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{c.date}</div>
                    </div>
                  ))}
                  {selectedPhoto.comments.length === 0 && (
                    <p className="text-gray-400 text-xs italic">Nenhum comentário ainda.</p>
                  )}
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="flex-1 bg-gray-50 border-none p-3 rounded-xl text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleComment(selectedPhoto.id)}
                  />
                  <button
                    onClick={() => handleComment(selectedPhoto.id)}
                    className="bg-black text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Postar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
        <div className="text-center">
          <div className="mt-3">
            <p className="text-gray-500 dark:text-neutral-400">Reviva os melhores momentos em fotos.</p>
            <p className="text-gray-500 dark:text-neutral-400">© 2026 mcarolfll.</p>
          </div>
          <div className="mt-3 space-x-2">
            <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.55V24H.22V8.98zm7.32 0h4.36v2.14h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.55v-6.55c0-1.56-.03-3.58-2.18-3.58-2.18 0-2.51 1.7-2.51 3.46V24H7.54V8.98z"/>
              </svg>
            </a>
            <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="https://github.com/mcarolfll" target="_blank" rel="noopener noreferrer">
              <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
