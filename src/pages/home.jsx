import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl bg-black/90 text-white font-semibold rounded-xl shadow-xl backdrop-blur-md flex justify-between items-center px-6 py-3 z-50">
        <div className="navbar-start">
          <a className="navbar-item  transition-colors cursor-pointer">
            PhotoSpark
          </a>
        </div>
        <div className="navbar-end flex items-center gap-4">
          <a className="navbar-item hover:text-indigo-400 transition-colors cursor-pointer">
            Sobre
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

     
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-36 pb-10"> 
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">

          <div className="space-y-2">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/02/e8/71/02e8711f76e7b2a3f1169569173150c8.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/27/d0/61/27d061b012119ddb8fbd41bd237ac06a.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/1200x/90/5d/b7/905db749e633c4b7d3dfd7011814a1d5.jpg"
              alt="Gallery Image"
            />
             <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/736x/7b/86/ee/7b86ee8b0b6e3f7e865077d5a8f6f6b4.jpg"
              alt="Gallery Image"
            />
          </div>

      
          <div className="space-y-2">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/736x/42/fc/93/42fc93a5cb3bb84a5dc0ba11301a0684.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/736x/f6/6b/e2/f66be24e886bcd1ee4b4ce957fbd5cec.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/736x/08/aa/f8/08aaf8517a2ce94fc9d4c082f7f5a7c1.jpg"
              alt="Gallery Image"
            />
          </div>

       
          <div className="space-y-2">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/736x/77/30/1e/77301eaa6e0e5c232bf88120ec0545c1.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/1200x/d8/ff/93/d8ff93aeed1d0e72c18f89783c385aa3.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/04/30/22/043022d22ed39b8fae3f751bf3e3cd9b.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/4b/13/cc/4b13ccafef332ce08dfcc3126be403f0.jpg"
              alt="Gallery Image"
            />
          </div>

        
          <div className="space-y-2">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/8f/fb/15/8ffb15c4eb7deaf80ea9cc252a9ed096.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/1200x/5c/d1/b2/5cd1b2b97ae517cd673584dc87e959ea.jpg"
              alt="Gallery Image"
            />
            <img
              className="w-full h-auto object-cover rounded-lg"
              src="https://i.pinimg.com/control1/736x/74/90/92/749092631217aece2a839dae54d1346d.jpg"
              alt="Gallery Image"
            />
          </div>

        </div>
      </div>

     
<footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
  <div className="text-center">

    <div className="mt-3">
      <p className="text-gray-500 dark:text-neutral-400">Reviva os melhores momentos em fotos.</p>
      <p className="text-gray-500 dark:text-neutral-400">© 2026 mcarolfll.</p>
    </div>
  
    <div className="mt-3 space-x-2">
   
      <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" href="https://github.com/mcarolfll">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.55V24H.22V8.98zm7.32 0h4.36v2.14h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.55v-6.55c0-1.56-.03-3.58-2.18-3.58-2.18 0-2.51 1.7-2.51 3.46V24H7.54V8.98z"/>
        </svg>
      </a>

   
      <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full text-gray-500 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-hidden focus:bg-gray-100 dark:focus:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" href="www.linkedin.com/in/mcarolinafranco">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>

    </>
  );
}