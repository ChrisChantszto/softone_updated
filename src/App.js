// App.js
import React, { useState } from 'react';
import Loginforced from './Loginforced';
import FileUploadBig from './FileUploadBig';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-5 bg-gray-100 flex justify-between items-center">
        <h1>PDF / images tables to excel</h1>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Upload</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </header>
      <main className="p-5 mt-5 flex-grow">
        {showLogin && <Loginforced onClose={() => setShowLogin(false)} />}
        <div className="w-full mb-5">
          <FileUploadBig />
        </div>
        <div className="flex justify-between">
          <div className="p-4 w-1/3 border rounded mx-2 shadow-md bg-white">
            <h2 className="font-bold text-lg mb-2">Secure</h2>
            <p>The web apps is very secure and allow you to upload your files without worrying about privacy leaking</p>
          </div>
          <div className="p-4 w-1/3 border rounded mx-2 shadow-md bg-white">
            <h2 className="font-bold text-lg mb-2">Distributed</h2>
            <p>Upload more than 100 files</p>
          </div>
          <div className="p-4 w-1/3 border rounded mx-2 shadow-md bg-white">
            <h2 className="font-bold text-lg mb-2">Highly reliable</h2>
            <p>The output is very reliable based on the amazon textract model</p>
          </div>
        </div>
      </main>
      <footer className="p-5 bg-gray-100 text-center">
        <p>Built with heart by Chris Chan @ 2023</p>
        <div className="flex justify-center mt-2">
          <a href="#about" className="px-4">About Us</a>
          <a href="#contact" className="px-4">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default App;