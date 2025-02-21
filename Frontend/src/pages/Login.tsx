import React from "react";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-black relative">
      {/* GIF Background Card */}
      <div className="relative w-[900px] h-[450px] rounded-[30px] shadow-2xl overflow-hidden">
        <img
          src="https://media.giphy.com/media/wM2jsoKbVTur6/giphy.gif"
          alt="GIF Animation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Card (Separate div, positioned on top) */}
      <div className="absolute left-[calc(40%-520px)] top-1/2 transform -translate-y-1/2 bg-[#121212] p-8 rounded-2xl shadow-lg text-white w-[350px]">
        <h2 className="text-2xl font-bold text-center">
          Get access to 10M+ Characters
        </h2>
        <p className="text-gray-400 text-sm mt-2 text-center">
          Sign up in just ten seconds
        </p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-white text-black flex items-center justify-center gap-2 p-2 rounded-md shadow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15zM4.5 4a.5.5 0 0 0-.5.5V6l8 5 8-5V4.5a.5.5 0 0 0-.5-.5h-15zM20 8.2l-7.5 4.7a1 1 0 0 1-1 0L4 8.2V19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.2z"/>
            </svg>
            Continue with Email
          </button>
          <button className="w-full bg-gray-900 text-white flex items-center justify-center gap-2 p-2 rounded-md shadow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-6 14a6 6 0 0 1 12 0v4a1 1 0 0 1-2 0v-4a4 4 0 1 0-8 0v4a1 1 0 0 1-2 0v-4z"/>
            </svg>
            Continue as Guest
          </button>

          <div className="flex items-center justify-center text-gray-500 text-sm">OR</div>

          <button className="w-full bg-gray-800 text-white flex items-center justify-center gap-2 p-2 rounded-md shadow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15zM4.5 4a.5.5 0 0 0-.5.5V6l8 5 8-5V4.5a.5.5 0 0 0-.5-.5h-15zM20 8.2l-7.5 4.7a1 1 0 0 1-1 0L4 8.2V19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.2z"/>
            </svg>
            Sign up
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing, you agree with the <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
