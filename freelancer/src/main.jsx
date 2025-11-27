import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blog from './components/Blog.jsx'
import BlogDetailPage from './components/BlogDetails.jsx'

const router = createBrowserRouter([
  {index: true , element:<App/>},
  {path : '/blog' , element : <Blog/>},
  {path : '/blogDetails/:id' , element : <BlogDetailPage/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
