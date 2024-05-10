import HomePage from 'pages/home'
import PostListPage from 'pages/posts'
import PostDetailPage from 'pages/posts/detail'
import PostEditPage from 'pages/posts/edit'
import New from 'pages/posts/new'
import ProfilePage from 'pages/profile'
import ProfileEdit from 'pages/profile/edit'
import SearchPage from 'pages/search'
import NotificationsPage from 'pages/notifications'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from 'pages/users/login'
import SignUpPage from 'pages/users/signup'

interface RouterProps {
    isAuthenticated: boolean
}
export default function Router({ isAuthenticated }: RouterProps) {
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    {' '}
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/posts" element={<PostListPage />}></Route>
                    <Route path="/posts/:id" element={<PostDetailPage />}></Route>
                    <Route path="/posts/new" element={<New />}></Route>
                    <Route path="/posts/edit/:id" element={<PostEditPage />}></Route>
                    <Route path="/posts/profile" element={<ProfilePage />}></Route>
                    <Route path="/posts/profile/edit" element={<ProfileEdit />}></Route>
                    <Route path="/notifications" element={<NotificationsPage />}></Route>
                    <Route path="/search" element={<SearchPage />}></Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/users/login" element={<LoginPage />}></Route>
                    <Route path="/users/signup" element={<SignUpPage />}></Route>
                    <Route path="*" element={<Navigate replace to="/users/login" />} />
                </>
            )}
        </Routes>
    )
}
