import React from "react";
import Logo from "../assets/images/Logo";

function Header() {
    return (
        <header className="fixed top-0 z-50 inset-x-0 w-full h-16 bg-[#3B73A7]">
            <div className="flex justify-center mt-2">
                <Logo />
            </div>
        </header>
    );
}

export default Header;
