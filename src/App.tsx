import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/organisms/NavBar'
import routes from '@/routes/routes'
import { UsersProvider } from '@/context/usersContext'
import { Container } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <NavBar />
      <UsersProvider>
        <Container maxWidth="lg" sx={{ pt: 10 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map(({ path, element: Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            </Routes>
          </Suspense>
        </Container>
      </UsersProvider>
    </BrowserRouter>
  )
}

export default App
