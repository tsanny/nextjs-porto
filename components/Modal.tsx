import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom"

export default function Modal(props: any) {
    const { setOpenModal } = props;
    const [_document, set_document] = useState<any>(null)
    const { logout, currentUser } = useAuth()
    const router = useRouter()
    console.log(currentUser)

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) { return null }

    return ReactDom.createPortal (
        <div className='fixed w-screen h-screen top-0 left-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col'>
            <div className="flex items-center justify-between border-b border-solid border-slate-900 p-4">
                <h1 className="text-2xl sm:text-5xl select-none">MENU</h1>
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 cursor-pointer text-lg sm:text-3xl"></i>
            </div>
            <div className="p-4 flex flex-col gap-3">
            {currentUser ? (
                <h2 onClick={() => {
                    logout()
                    setOpenModal(false)
                }} className="select-none duration-300 hover:pl-2 cursor-pointer">Logout</h2>
            ) : (
                <h2 onClick={async () => {
                    await router.push('/login')
                    setOpenModal(false)
                }} className="select-none duration-300 hover:pl-2 cursor-pointer">Login</h2>
            )}
            </div>
        </div>, _document.getElementById('portal')
    )
}