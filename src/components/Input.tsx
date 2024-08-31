import { ComponentProps, ReactNode } from "react"

export interface InputProps extends ComponentProps<'input'> {
    icon?: ReactNode;
    iconSide?: 'left' | 'right';
};

export const Input = ({ icon, iconSide = 'left', ...rest }: InputProps) => {
    return (
        <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-[#8A94A4] sm:p-3">
            {icon && iconSide === 'left' && icon}

            <input {...rest} />

            {icon && iconSide === 'right' && icon}
        </div>
    )
}