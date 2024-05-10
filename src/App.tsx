import { useState, useEffect } from 'react'
import Router from 'components/Router'
import { Layout } from 'components/Layout'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from './firebaseApp' // 파일 경로에 맞게 수정해주세요
import { ToastContainer } from 'react-toastify'
import Loader from 'components/loader/Loader'

function App() {
    const auth = getAuth(app)
    const [init, setInit] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setInit(true)
        })
    }, [auth])

    return (
        <Layout>
            <ToastContainer theme="dark" autoClose={1000} hideProgressBar newestOnTop />

            {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
        </Layout>
    )
}

export default App
