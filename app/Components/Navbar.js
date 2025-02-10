"use client"

import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <>
    <h1>Hello World !</h1>
    </>
  )
}
