type Props = {
    size?: number | string;
}

export const Loader = ({ size = 16 }: Props) => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="rounded-full border-4 border-[#4F372F] border-t-white animate-spin" style={{ width: size, height: size }} />
        </div>
    )
}