import { ChangeEvent, useEffect, useState } from "react";
import { Button, Input, Loader } from "../../components";
import { Search } from "lucide-react";
import { menuMockData } from "../../mocks";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setMenuItems, expandAllAccordions } from "../../store/reducers/menuReducer";
import { twMerge } from "tailwind-merge";
import { MenuContent } from "./components/MenuContent";
import { Cart } from "./components/Cart";
import { CartModal } from "./components/CartModal";
import { debounce } from 'lodash';
import { useTranslation } from "react-i18next";

export const Menu = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isLoadingMenu, setIsLoadingMenu] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const menuItems = useAppSelector((state) => state.menu.menuItems);
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const debouncedOnChange = debounce((newValue) => {
        setSearchValue(newValue);
        dispatch(expandAllAccordions());
    }, 300)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        debouncedOnChange(newValue);
    };

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

    useEffect(() => {
        if (!cart.length && isCartModalOpen) {
            setIsCartModalOpen(false)
        }
    }, [cart.length, isCartModalOpen])

    return (
        <>
            <section className={twMerge("w-full bg-white h-full flex flex-col gap-1.5 sm:w-[90%] sm:bg-transparent lg:w-4/5 xl:w-[65%]", cart.length > 0 && 'pb-12 sm:pb-8 md:pb-0')}>
                <Input
                    type="text"
                    placeholder={t('menu.search-placeholder')}
                    className="outline-none border-none w-full leading-[18px] sm:leading-5"
                    icon={<Search size={20} color="#8A94A4" />}
                    iconSide="left"
                    onChange={handleChange}
                />

                <div className="bg-white sm:bg-[#F8F9FA] h-full flex flex-col gap-6 sm:p-5 md:flex-row lg:px-10 lg:py-8">
                    <div className={twMerge("bg-white flex w-full sm:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] sm:px-4 sm:py-5 md:w-[600px]", isLoadingMenu && 'items-center justify-center')}>
                        {isLoadingMenu ? (
                            <Loader size={40} />
                        ) : (
                            <MenuContent filteredValue={searchValue} />
                        )}
                    </div>

                    <Cart />
                </div>

                {cart.length > 0 && (
                    <div className="w-full max-w-[345px] pb-6 px-4 fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
                        <Button
                            fullSize
                            type="button"
                            onClick={() => setIsCartModalOpen(true)}
                        >
                            {t('menu.cart.cart-button-mobile', { itemCount: cart.length, isPlural: cart.length !== 1 ? 'items' : 'item' })}
                        </Button>
                    </div>
                )}
            </section>

            {isCartModalOpen && cart.length > 0 && (
                <CartModal open={isCartModalOpen} onOpenChange={() => setIsCartModalOpen(false)} />
            )}
        </>
    )
}