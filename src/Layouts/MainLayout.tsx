import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <Outlet />
            </div>
        </>
    )
}
