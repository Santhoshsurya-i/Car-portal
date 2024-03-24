import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

function NavBar(){
    return(
        <div className="flex items-center justify-between p-3 px-5 shadow-sm border-b-[1px]"> 
            <Image src="/logo.webp"
            alt="logo"
            width={80}
            height={60} 
            className="rounded-full"/>
            <div className="hidden md:flex gap-5">
                <h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">Home</h2>
                <h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">About</h2>
                <h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">Blog</h2>
                <h2 className="hover:bg-blue-500 px-3 cursor-pointer p-2 rounded-full hover:text-white">Contact Us</h2>
            </div> 
            <UserButton />

            </div>
    )
}

export default NavBar;