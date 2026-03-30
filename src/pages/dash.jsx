import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dash() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLikes: 0,
    totalComments: 0,
    totalPhotos: 0,
    recentInteractions: []
  });

  useEffect(() => {
    const photos = JSON.parse(localStorage.getItem("photos") || "[]");
    
    let likes = 0;
    let commentsCount = 0;
    const interactions = [];

    photos.forEach(photo => {
      likes += photo.likes;
      commentsCount += photo.comments.length;
      
      photo.comments.forEach(c => {
        interactions.push({
          id: c.id,
          photoId: photo.id,
          photoSrc: photo.src,
          user: c.user,
          text: c.text,
          date: c.date,
          type: 'comment'
        });
      });
    });

    // Sort interactions by date (simulated)
    setStats({
      totalLikes: likes,
      totalComments: commentsCount,
      totalPhotos: photos.length,
      recentInteractions: interactions.slice(0, 10) // Show last 10
    });
  }, []);

  const handleDeleteComment = (photoId, commentId) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?")) return;

    const photos = JSON.parse(localStorage.getItem("photos") || "[]");
    const updatedPhotos = photos.map(p => {
      if (p.id === photoId) {
        return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
      }
      return p;
    });

    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
    
    // Recalculate stats
    let likes = 0;
    let commentsCount = 0;
    const interactions = [];

    updatedPhotos.forEach(photo => {
      likes += photo.likes;
      commentsCount += photo.comments.length;
      
      photo.comments.forEach(c => {
        interactions.push({
          id: c.id,
          photoId: photo.id,
          photoSrc: photo.src,
          user: c.user,
          text: c.text,
          date: c.date,
          type: 'comment'
        });
      });
    });

    setStats({
      totalLikes: likes,
      totalComments: commentsCount,
      totalPhotos: updatedPhotos.length,
      recentInteractions: interactions.slice(0, 10)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl bg-black/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex justify-between items-center px-6 py-3 z-50">
        <div className="navbar-start">
          <a
            onClick={() => navigate("/home")}
            className="navbar-item transition-colors cursor-pointer"
          >
            PhotoSpark
          </a>
        </div>
        <div className="navbar-end flex items-center gap-4">
          <a
            onClick={() => navigate("/maisfotos")}
            className="navbar-item hover:text-indigo-400 transition-colors cursor-pointer"
          >
            + fotos
          </a>
          <a
            onClick={() => navigate("/dash")}
            className="navbar-item text-indigo-400 transition-colors cursor-pointer"
          >
            Dashboard
          </a>
          <div className="relative">
            <button className="btn btn-ghost p-0">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGSRXuackG0jw/profile-displayphoto-scale_400_400/B4DZuBfcTNIYAg-/0/1767404063197?e=1775692800&v=beta&t=R3NMEXah-JaL7zMroTmiHqIEhoE5wTBF8Gu6DocWCsY"
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white/20 shadow-sm"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-12 w-full">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total de Fotos</div>
            <div className="text-3xl font-bold text-gray-800">{stats.totalPhotos}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Curtidas Recebidas</div>
            <div className="text-3xl font-bold text-red-500">{stats.totalLikes} ❤️</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Comentários</div>
            <div className="text-3xl font-bold text-blue-500">{stats.totalComments} 💬</div>
          </div>
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800">Atividades Recentes</h3>
            <span className="text-xs text-gray-400 font-medium">Últimas 10 interações</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-3 font-semibold">Foto</th>
                  <th className="px-6 py-3 font-semibold">Pessoa</th>
                  <th className="px-6 py-3 font-semibold">Interação</th>
                  <th className="px-6 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentInteractions.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={item.photoSrc} className="w-12 h-12 object-cover rounded-lg shadow-sm" alt="Thumbnail" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                          {item.user.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{item.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 italic line-clamp-2">"{item.text}"</p>
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteComment(item.photoId, item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                        title="Excluir Comentário"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {stats.recentInteractions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">
                      Nenhuma interação registrada ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
        <p>© 2026 mcarolfll • Dashboard de Atividades</p>
      </footer>
    </div>
  );
}