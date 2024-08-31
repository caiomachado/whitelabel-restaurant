import { useMemo, useState } from "react"
import { NavLink, Link, NavLinkProps, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useAppSelector } from "../store/hooks"
import { MenuIcon } from "./MenuIcon"

type NavLink = {
    path: string;
    name: string;
}

const navLinks: NavLink[] = [
    { path: '/menu', name: 'MENU' },
    { path: '/login', name: 'ENTRAR' },
    { path: '/contact', name: 'CONTATO' },
]

const CustomNavLink = ({ children, ...rest }: NavLinkProps) => (
    <NavLink
        {...rest}
        className={({ isActive }) => twMerge("text-white w-[232px] text-center pb-3.5 border-b-4 border-transparent hover:border-white transition-all", isActive && 'border-white')}
    >
        {children}
    </NavLink>
)

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const location = useLocation();

    const { currentPath, navList } = useMemo(() => {
        return navLinks.reduce<{ currentPath: NavLink, navList: NavLink[] }>((acc, cur) => {
            if (location.pathname.includes(cur.path)) {
                acc.currentPath = cur;
            } else {
                acc.navList.push(cur);
            }

            return acc;
        }, { currentPath: { path: '', name: '' }, navList: [] })
    }, [location.pathname])

    return (
        <header style={{ backgroundColor: currentVenue?.webSettings?.navBackgroundColour }}>
            <nav className="hidden items-center justify-center pt-3.5 px-4 sm:flex">
                {navLinks.map(link => {
                    return (
                        <CustomNavLink key={link.name} to={link.path}>{link.name}</CustomNavLink>
                    )
                })}
            </nav>

            <div className="flex relative items-center justify-center px-4 py-[18px] sm:hidden">
                <span className="text-white text-center transition-all">{currentPath.name}</span>

                <div className="absolute right-4 flex items-center justify-center">
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>
                        <MenuIcon isOpen={isOpen} />
                    </button>

                    <ul className={twMerge("absolute flex flex-col pt-2 min-w-[120px] -right-1 top-10 transition-all bg-white shadow-xl scale-y-0 origin-top before:absolute before:w-2 before:h-2 before:bg-white before:rotate-45 before:-top-0.5 before:right-2", isOpen && 'scale-y-100')}>
                        {navList.map((navItem) => {
                            return (
                                <Link
                                    key={navItem.name}
                                    className="text-black transition-all text-center p-2 hover:text-white hover:bg-[#4F372F]"
                                    to={navItem.path}
                                >
                                    {navItem.name}
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="w-full h-[150px]">
                <img className="object-cover h-full w-full" src={currentVenue?.webSettings?.bannerImage} alt="Illustrative image" />
            </div>
        </header>
    )
}