import React from 'react';
// import SampleImage from './path_to_your_image.jpg';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-black text-white flex flex-col items-center justify-center p-4">
      <header className="text-center">
        <h1 className="text-4xl mb-2">Let's build from here</h1>
        <p className="text-gray-300">The world's leading AI-powered developer platform.</p>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <form className="flex flex-col items-center">
          <input className="bg-white text-black rounded px-2 py-1 m-1" type="email" placeholder="Email address" />
          <button className="bg-white text-blue-500 rounded px-2 py-1 m-1">Sign up for GitHub</button>
          <button className="bg-white text-blue-500 rounded px-2 py-1 m-1">Start a free enterprise trial</button>
        </form>
        {/* <img src={SampleImage} alt="Sample" className="m-4" /> */}
      </main>
      <footer className="w-full text-center p-4">
        <p>Trusted by companies like 3M, KPMG, and SAP</p>
      </footer>
      
    </div>
  );
};

export default LandingPage;
