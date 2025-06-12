// import React from 'react'

import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="flex flex-col min-h-screen">
        <Link to='/main/data'>Data</Link>
        <Link to='/main/charts'>Charts</Link>
    </aside>
  )
}

export default Sidebar