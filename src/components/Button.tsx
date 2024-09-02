import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ComponentProps<'button'> {
    fullSize?: boolean;
}

export const Button = ({ fullSize, className, children, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={twMerge(
                'text-center bg-[#4F372F] py-1 px-6 h-12 transition rounded-[40px] text-white font-medium text-lg leading-[21px] disabled:bg-[#DADADA] disabled:text-[#5F5F5F]',
                fullSize && 'w-full',
                className
            )}
        >
            {children}
        </button>
    )
}