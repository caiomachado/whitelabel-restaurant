import { useEffect, useState } from "react";
import { Input, Loader } from "../../components";
import { Search } from "lucide-react";
import { menuMockData } from "../../mocks";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setMenuItems } from "../../store/reducers/menuReducer";
import { twMerge } from "tailwind-merge";
import { MenuContent } from "./components/MenuContent";
import { Cart } from "./components/Cart";

export const Menu = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoadingMenu, setIsLoadingMenu] = useState(false);
    const menuItems = useAppSelector((state) => state.menu.menuItems);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getMenuItems() {
            await fetch('https://cdn-dev.preoday.com/challenge/menu', {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setIsLoadingMenu(false);
            dispatch(setMenuItems(menuMockData))
        }

        if (!menuItems) {
            setIsLoadingMenu(true);
            getMenuItems();
        }
    }, [dispatch, menuItems])

    return (
        <section className="w-full bg-white h-full flex flex-col gap-1.5 sm:w-[90%] sm:bg-transparent lg:w-4/5 xl:w-[65%]">
            <Input
                type="text"
                placeholder="Search menu items"
                className="outline-none border-none w-full leading-[18px] sm:leading-5"
                value={searchValue}
                icon={<Search size={20} color="#8A94A4" />}
                iconSide="left"
                onChange={(e) => setSearchValue(e.target.value)}
            />

            <div className="bg-white sm:bg-[#F8F9FA] h-full flex gap-6 sm:p-5 lg:px-10 lg:py-8">
                <div className={twMerge("bg-white flex w-full sm:w-[600px] sm:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] sm:px-4 sm:py-5", isLoadingMenu && 'items-center justify-center')}>
                    {isLoadingMenu ? (
                        <Loader size={40} />
                    ) : (
                        <MenuContent />
                    )}
                </div>

                <Cart />
            </div>
        </section>
    )
}