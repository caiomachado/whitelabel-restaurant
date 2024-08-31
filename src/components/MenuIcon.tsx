import { twMerge } from "tailwind-merge"

type Props = {
    isOpen: boolean;
}

export const MenuIcon = ({ isOpen }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <div className={twMerge("w-4 h-0.5 bg-white rounded-md transition-all", isOpen && 'rotate-45 translate-y-2')} />
            <div className={twMerge("w-4 h-0.5 bg-white rounded-md", isOpen && 'invisible')} />
            <div className={twMerge("w-4 h-0.5 bg-white rounded-md transition-all", isOpen && '-rotate-45 -translate-y-1')} />
        </div>
    )
}