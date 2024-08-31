import { useState } from "react";
import { Input } from "../../components";
import { Search } from "lucide-react";

export const Menu = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <section className="w-full bg-white h-full flex flex-col gap-1.5 sm:w-4/5 sm:bg-transparent md:w-[65%]">
            <Input
                type="text"
                placeholder="Search menu items"
                className="outline-none border-none w-full leading-[18px] sm:leading-5"
                value={searchValue}
                icon={<Search size={20} color="#8A94A4" />}
                iconSide="left"
                onChange={(e) => setSearchValue(e.target.value)}
            />

            <div className="px-10 py-8 bg-white sm:bg-[#F8F9FA]">

            </div>
        </section>
    )
}