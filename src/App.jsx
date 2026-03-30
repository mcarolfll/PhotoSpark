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
        </div>

        <div className="mt-5">
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
                <label htmlFor="password" className="block text-sm mb-2 text-gray-800 dark:text-neutral-800">Senha</label>
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
  )
}