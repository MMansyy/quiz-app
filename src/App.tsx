import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layouts/MainLayout'
import Home from './pages/Home/Home'
import Quiz from './pages/Quiz/Quiz'

function App() {
  const routes = createBrowserRouter([{
    path: '/', element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/quiz/:quizId', element: <Quiz /> },
    ]
  }])

  return (
    <RouterProvider router={routes} />
  )

}

export default App
