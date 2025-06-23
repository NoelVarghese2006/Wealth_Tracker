// import React from 'react'

import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="flex flex-col min-h-[90dvh] w-fit gap-4 p-4 text-center bg-gray-100 dark:bg-gray-800">
        <Link to='/main/data'>Data</Link>
        <Link to='/main/charts'>Charts</Link>
        <Link to='/main/add'>Add</Link>
    </aside>
  )
}

export default Sidebar