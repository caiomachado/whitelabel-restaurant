import { useAppSelector } from "../../../store/hooks"

export const Cart = () => {
    const cart = useAppSelector((state) => state.cart.cart);

    return (
        <div className="hidden sm:flex sm:flex-col sm:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] sm:h-fit sm:w-[320px]">
            <div className="w-full sm:px-3 sm:py-4 md:p-6">
                <h1 className="text-[#464646] font-medium text-2xl leading-7">Carrinho</h1>
            </div>

            <div className="w-full bg-white sm:px-3 sm:py-4 md:p-6">
                {!cart.length && (
                    <p className="text-[#464646] leading-[18px] font-normal">Seu carrinho está vazio</p>
                )}
            </div>
        </div>
    )
}