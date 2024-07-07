import React from "react";

function Header() {
  return (
    <div className="w-full z-[998]" style={{ height: "65px" }}>
      <div className="py-4 flex items-start justify-between">
        <a className="text-2xl font-semibold duration-300 false" href="/">
          AI tutor
          <div className="text-2xl font-semibold text-red-500 rotate-12 inline-block ml-[2px]">
            .
          </div>
        </a>
      </div>
    </div>
  );
}

export default Header;
