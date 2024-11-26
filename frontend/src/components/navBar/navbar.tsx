import React, { useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';

// Define the structure for navigation items
interface NavigationItem {
    name: string;
    onClick: () => void;
}


// Variants for the navigation bar animation
const navVariants = {
    open: {
        height: "100%",
        transition: { duration: 0.5, ease: 'easeInOut', type: 'just', stiffness: 50 }
    },
    close: {
        height: "auto",
        transition: { duration: 0.5, ease: 'easeInOut', type: 'just', stiffness: 50 }
    },
    visible: {
        width: "100%",
        transition: { duration: 0.1, ease: 'easeInOut', type: 'spring', stiffness: 80 }
    },
    resize: {
        width: "auto",
        transition: { duration: 0.4, ease: 'easeInOut', type: 'spring', stiffness: 10 }
    }
};

// NavigationBar component
export default function NavigationBar() {
    const { scrollY } = useScroll();
    const [isResized, setIsResized] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Add useEffect to check login status
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // Add logout handler
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const navigationItems: NavigationItem[] = [
        { name: "About", onClick: () => navigate("/about") },
        // Conditionally show login/signup or logout
        ...(isLoggedIn 
            ? [{ name: "Logout", onClick: handleLogout }]
            : [
                { name: "Log In", onClick: () => navigate("/login") },
                { name: "Sign Up", onClick: () => navigate("/register") }
              ]
        ),
    ];
    // Update resize state based on scroll position
    useMotionValueEvent(scrollY, "change", (latest: number) => {
        setIsResized(latest > 250);
    });

    return (
        <>
            <nav className='z-50 w-full top-0 min-w-full mx-auto fixed start-0 flex justify-center items-center'>
                <motion.div
                    animate={[isResized ? "resize" : "visible", isMenuOpen ? "open" : "close"]}
                    initial={false}
                    variants={navVariants}
                    className={cn('w-full bg-black dark:bg-#a5b4fc ', isResized && "md:rounded-full rounded-3xl", isMenuOpen && "w-full")}
                >
                    {/* dark:shadow-inner dark:shadow-white/40 border shadow-lg py-2 */}
                    <div className='w-full px-4 md:px-8 flex justify-between items-center gap-10 sm:gap-20'>
                        <div className='flex gap-2 items-center' onClick={() => navigate('/')}> 
                            <img src="public/logo.png" className="w-14 h-14" alt="Logo" />
                            <p className="text-1xl font-semibold text-white">LMASROUF</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4 text-base font-medium">
                            {navigationItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.onClick}
                                    className='text-white hover:opacity-100 font-normal hover:scale-105 transition-all duration-200 ease-in-out hover:-translate-y-1 active:translate-y-0 active:scale-90'
                                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div className="flex my-16 bg-black/10 dark:bg-white/10 rounded-xl mx-4 flex-col px-5 py-7 gap-5 text-lg font-medium">
                            {navigationItems.map((item, index) => (
                                <motion.button
                                    key={index}
                                    onClick={item.onClick}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ease: 'easeInOut', duration: 0.3, delay: index * 0.2, stiffness: 50, type: 'spring' }}
                                    className='py-2 rounded-xl border border-black/20 px-4 flex items-center dark:border-black/15 hover:-translate-y-2 ease-in-out duration-150 hover:bg-black hover:text-black shadow dark:hover:bg-white dark:hover:text-black bg-black dark:bg-black'
                                    style={{ cursor: 'pointer', background: 'none',backgroudColor:'red', border: 'none' }}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </motion.div>
            </nav>
            {/* Main content area */}
            {/* <div>
                <div className='font-semibold flex justify-center items-center'>
                    <WelcomeMessage/>
                </div>
                <div className='font-semibold flex justify-center items-center'>
                    <Home/>
                </div>
            </div> */}
        </>
    );
}

// MenuToggle component for the hamburger menu
interface MenuToggleProps {
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuToggle({ isMenuOpen, setMenuOpen }: MenuToggleProps) {
    return (
        <button
            className={cn("md:hidden group inline-flex w-12 h-12 text-center items-center justify-center transition rounded-lg text-black dark:text-white")}
            onClick={() => setMenuOpen(!isMenuOpen)}
        >
            <svg className="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect className={cn("origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]", isMenuOpen ? "rotate-[315deg] [x:0] [y:7]" : "")} y="2" x="7" width="9" height="1.5" rx="1"></rect>
                <rect className={cn("origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]", isMenuOpen ? "rotate-45" : "")} y="7" width="16" height="1.5" rx="1"></rect>
                <rect className={cn("origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]", isMenuOpen ? "[y:7] [x:0] -rotate-[225deg]" : "")} y="12" width="9" height="1.5" rx="1"></rect>
            </svg>
        </button>
    );
}
