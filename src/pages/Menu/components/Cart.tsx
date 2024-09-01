import { useAppSelector } from "../../../store/hooks"

export const Cart = () => {
    const cart = useAppSelector((state) => state.cart.cart);

    return (
        <div className="hidden md:flex md:flex-col md:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] md:h-fit md:w-[320px]">
            <div className="w-full md:px-3 md:py-4 lg:p-6">
                <h1 className="text-[#464646] font-medium text-2xl leading-7">Carrinho</h1>
            </div>

            <div className="w-full bg-white md:px-3 md:py-4 lg:p-6">
                {!cart.length && (
                    <p className="text-[#464646] leading-[18px] font-normal">Seu carrinho está vazio</p>
                )}
            </div>
        </div>
    )
}