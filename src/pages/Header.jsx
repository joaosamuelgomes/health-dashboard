import React from "react";
import Logo from "../assets/images/Logo";
import GithubLogo from "../assets/images/GithubLogo";

function Header() {
    return (
        <header className="fixed top-0 z-50 inset-x-0 w-full h-16 bg-[#3B73A7]">
            <div className="flex justify-center mt-2 relative">
                <Logo />
                <a
                    href="https://github.com/joaosamuelgomes/health-dashboard" // Substitua pelo link do seu repositório no GitHub
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 left-0 mt-2 ml-8 opacity-0 hover:opacity-100 transition-opacity"
                >
                    <GithubLogo/>
                </a>
            </div>
        </header>
    );
}

export default Header;


