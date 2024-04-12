import React from "react";
import logo from "./logo.svg";

function Logo() {
    return (
        <div className="flex items-center ml-8 h-full">
            <img src={logo} alt="Logo" className="h-12 w-12"/> 
        </div>
    );
}

    export default Logo;
