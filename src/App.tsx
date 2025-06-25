import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home/Home'

function App() {
  const routes = createBrowserRouter([{
    path: '/', element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }
    ]
  }])

  return (
    <RouterProvider router={routes} />
  )

}

export default App
