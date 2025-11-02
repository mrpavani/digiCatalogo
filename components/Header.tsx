
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    const activeClass = 'bg-primary text-white';
    const inactiveClass = 'text-gray-300 hover:bg-neutral hover:text-white';
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `${isActive ? activeClass : inactiveClass} rounded-md px-3 py-2 text-sm font-medium transition-colors`}
        >
            {children}
        </NavLink>
    );
};

const MobileNavLinkItem: React.FC<{ to: string; children: React.ReactNode, onClick: () => void }> = ({ to, children, onClick }) => {
    const activeClass = 'bg-primary text-white';
    const inactiveClass = 'text-gray-300 hover:bg-neutral hover:text-white';
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `${isActive ? activeClass : inactiveClass} block rounded-md px-3 py-2 text-base font-medium transition-colors`}
        >
            {children}
        </NavLink>
    );
};


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                             <NavLink to="/" className="text-white font-bold text-xl">
                                DigiCatálogo
                            </NavLink>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLinkItem to="/">Início</NavLinkItem>
                                <NavLinkItem to="/about">Sobre Nós</NavLinkItem>
                                <NavLinkItem to="/products">Produtos</NavLinkItem>
                                <NavLinkItem to="/contact">Contato</NavLinkItem>
                            </div>
                        </div>
                    </div>
                     <div className="hidden md:block">
                        <NavLink to="/admin" className="bg-accent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                            Painel Admin
                        </NavLink>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        <MobileNavLinkItem to="/" onClick={() => setIsMenuOpen(false)}>Início</MobileNavLinkItem>
                        <MobileNavLinkItem to="/about" onClick={() => setIsMenuOpen(false)}>Sobre Nós</MobileNavLinkItem>
                        <MobileNavLinkItem to="/products" onClick={() => setIsMenuOpen(false)}>Produtos</MobileNavLinkItem>
                        <MobileNavLinkItem to="/contact" onClick={() => setIsMenuOpen(false)}>Contato</MobileNavLinkItem>
                        <MobileNavLinkItem to="/admin" onClick={() => setIsMenuOpen(false)}>Painel Admin</MobileNavLinkItem>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
