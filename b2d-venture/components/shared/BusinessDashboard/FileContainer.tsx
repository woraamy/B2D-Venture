"use client";
import { MdDriveFolderUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { usePathname } from 'next/navigation';

export default function FileContainer({name}) {
    return (
        <div>
            <div className="flex items-center mt-2 hover:text-blue-900">
                < FaFileAlt size={40} color="gray"/> 
                <h1 className="ml-5">{name}</h1>
            </div>
        </div>
    )
}