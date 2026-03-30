import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Upload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!preview) return;

    const newPhoto = {
      id: Date.now(),
      src: preview,
      likes: 0,
      comments: [],
      date: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const storedPhotos = JSON.parse(localStorage.getItem("photos") || "[]");
    localStorage.setItem("photos", JSON.stringify([newPhoto, ...storedPhotos]));

    alert("Foto adicionada com sucesso!");
    navigate("/home");
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
            className="navbar-item text-indigo-400 transition-colors cursor-pointer"
          >
            + fotos
          </a>
          <a
            onClick={() => navigate("/dash")}
            className="navbar-item hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Dashboard
          </a>
          <div className="relative">
            <button className="btn btn-ghost p-0">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGSRXuackG0jw/profile-displayphoto-scale_400_400/B4DZuBfcTNIYAg-/0/1767404063197?e=1775692800&v=beta&t=R3NMEXah-JaL7zMroTmiHqIEhoE5wTBF8Gu6DocWCsY"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <div className="flex-1 flex items-center justify-center pt-24 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Adicionar Novo Momento
          </h2>

          <div className="mb-6">
            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Clique para carregar</span>{" "}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG ou JPEG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!preview}
            className={`w-full py-3 rounded-xl font-semibold transition-all shadow-md ${
              preview
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Publicar Foto
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>

      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2026 mcarolfll. Reviva os melhores momentos.</p>
      </footer>
    </div>
  );
}
