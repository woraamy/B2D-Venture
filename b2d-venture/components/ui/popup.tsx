"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';


type Props = {
    title: string,
    link: string,
    children: React.ReactNode,
    oktext: string,
    successmessage: string
}

export default function Dialog({ title, children, link, oktext }: Props) {

    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')
    const router = useRouter();

    useEffect(() => {
        if (showDialog === 'y') {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeDialog = () => {
        dialogRef.current?.close();
        router.push(link);
        
    }

    const clickOk = async() => {
        toast.success('Sending request success')
        closeDialog()
    }

    const dialog: JSX.Element | null = showDialog === 'y'
        ? (
            <>
            <dialog ref={dialogRef} className="fixed top-20 left-[40%] -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-[#FF553E]">
                        <h1 className="text-2xl text-white">{title}</h1>
                        <button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >x</button>
                    </div>
                    <div className="px-5 pb-6">
                        {children}
                        <div className="flex flex-row justify-end mt-2">
                            <button
                                onClick={clickOk}
                                className="bg-[#FF553E] py-1 px-2 rounded border-none text-white"
                            >
                                {oktext}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            <Toaster />
            </>
        ) : null


    return dialog
}