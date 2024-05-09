import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
function App() {
  return (
 <Routes>
  <Route path="/" element={<h1>homepage</h1>}></Route>
  <Route path="/posts" element={<h1>posts</h1>}></Route>
  <Route path="/posts/:id" element={<h1>id</h1>}></Route>
  <Route path="/posts/new" element={<h1>new</h1>}></Route>
  <Route path="/posts/edit/:id" element={<h1>postedit</h1>}></Route>
  <Route path="/posts/profile" element={<h1>profile</h1>}></Route>
  <Route path="/posts/profile/edit" element={<h1>profile edit</h1>}></Route>
  <Route path="/notifications" element={<h1>notifications</h1>}></Route>
  <Route path="/notifications" element={<h1>postlist</h1>}></Route>
  <Route path="/search" element={<h1>searchPage</h1>}></Route>
  <Route path="/users/login" element={<h1>login</h1>}></Route>
  <Route path="/users/signup" element={<h1>signup</h1>}></Route>
  <Route path="*" element={<Navigate replace to="/"/>}/>
</Routes>
  );
}

export default App;
