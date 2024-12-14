'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';
//import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    try{
       //const res = await axios.post('/api/users', { email, password });
       const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    
      const data = await res.json();

      // Extract the user object from the response
      const { user, message } = data;

      // Store the user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      //console.log(email, password);
      router.push('/dashboard'); 
    } catch (err) {
      console.error(err);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleLogin} className="space-y-4">
   
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

       
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
