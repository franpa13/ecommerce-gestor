
import './App.css'

import { MainLayout } from './layouts/main-layout';

import { HomePage } from './pages/public/home/home-page';



function App() {


  return (
    <>
      <MainLayout>
        <HomePage></HomePage>
      </MainLayout>
    </>
  )
}

export default App
