import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import WriteArticle from './pages/WriteArticle.jsx'
import BlogTitle from './pages/BlogTitle.jsx'
import GenerateImages from './pages/GenerateImages.jsx'
import RemoveBackground from './pages/RemoveBackgrounds.jsx'
import RemoveObject from './pages/RemoveObject.jsx'
import ReviewResume from './pages/ReviewResume.jsx'
import Community from './pages/Community.jsx'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

const App = () => {

  // create token
  const { getToken } = useAuth()
  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        console.log(token);
        
        localStorage.setItem('token', token)
      }
    }).catch((error) => {
      console.error('Error fetching token:', error)
    })
  }, [getToken])
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='write-articles' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitle />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App