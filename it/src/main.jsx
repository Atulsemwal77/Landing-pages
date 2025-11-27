import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ItLandingPage from './components.jsx/ItLandingPage.jsx'
import Blog from './components.jsx/Blog.jsx'
import ItBlogDetailPage from './components.jsx/BlogDetails.jsx'

const router = createBrowserRouter([
  {path : '/' , element : <ItLandingPage/>},
  {path : '/blog' , element : <Blog/>},
  {path : '/blogdetails/:id' , element : <ItBlogDetailPage/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
