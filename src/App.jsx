import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

export default function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Pega o nome a partir do email (antes do @)
    const userName = email.split('@')[0];
    localStorage.setItem("user", JSON.stringify({ name: userName, email: email }));
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-100">
      <div className="bg-white dark:bg-neutral-200 border border-gray-200 dark:border-neutral-300 rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8">

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-neutral-800">login</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-700">
            Ainda não tem uma conta?
            <a className="text-gray-800 dark:text-neutral-900 hover:underline font-medium ml-1" href="#">
              Cadastre-se
            </a>
          </p>
        </div>

        <div className="mt-5">
          <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none mb-4" href="#">
            <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
              <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
              <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
              <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
              <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
            </svg>
            Cadastrar com o Google
          </a>

          <div className="flex items-center text-xs text-gray-400 dark:text-neutral-500 uppercase my-4">
            <span className="flex-1 border-t border-gray-200 dark:border-neutral-400"></span>
            <span className="px-2">Ou</span>
            <span className="flex-1 border-t border-gray-200 dark:border-neutral-400"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-800 dark:text-neutral-800">Endereço de email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-neutral-300 bg-white dark:bg-neutral-100 text-gray-800 dark:text-neutral-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300" 
                />
              </div>

              <div>
                <label htmlFor="password" title="Senha" className="block text-sm mb-2 text-gray-800 dark:text-neutral-800">Senha</label>
                <input type="password" id="password" name="password" required className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-neutral-300 bg-white dark:bg-neutral-100 text-gray-800 dark:text-neutral-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300" />
              </div>

              <div className="flex items-center">
                <input id="checkbox" type="checkbox" className="mr-2 w-4 h-4 rounded border-gray-300 dark:border-neutral-500 text-gray-800 dark:text-neutral-900 focus:ring-0" />
                <label htmlFor="checkbox" className="text-sm text-gray-800 dark:text-neutral-800">Lembrar-me</label>
              </div>

              <button
                type="submit" className="w-full py-3 px-4 rounded-lg bg-gray-800 dark:bg-white text-white dark:text-gray-800 font-medium hover:bg-purple-600 dark:hover:bg-purple-300 focus:outline-none transition-colors"
                >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
