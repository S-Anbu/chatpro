import React from "react";
import Alluser from "./Alluser";
const SidebarContent = () => {

  return (
    <div>
      <div className="flex items-center justify-between p-4 ">
        <span className="text-2xl font-semibold text-blue-500">Chat</span>
        <div className="flex space-x-5 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m0 14H5.2L4 17.2V4h16zm-4-7v2h-3v3h-2v-3H8V9h3V6h2v3z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="20"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
            />
          </svg>
        </div>
      </div>
      <div class="w-full max-w-sm min-w-[200px] px-2 ">
        <div class="relative">
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-blue-gray-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search chats..."
          />
          <button
            class="absolute top-1 right-1 flex items-center rounded text-white bg-black py-1 px-2.5 border border-transparent text-center text-sm  transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4 mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>
      </div>
      <div>
        <Alluser/>
      </div>
    </div>
  );
};

export default SidebarContent;
