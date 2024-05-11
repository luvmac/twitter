import { useContext, useEffect, useState } from 'react'
import PostBox from 'components/posts/PostBox'
import PostForm from 'components/posts/PostForm'
import AuthContext from 'context/AuthContext'
import { collection, orderBy, query, doc, onSnapshot } from 'firebase/firestore'
import { db } from 'firebaseApp'

export interface PostProps {
    id: string
    email: string
    content: string
    createdAt: string
    uid: string
    profileUrl?: string
    likes?: string[]
    likeCount?: number
    comments?: any
    hashTags?: string[]
}

export default function HomePage() {
    const [posts, setPosts] = useState<PostProps[]>([])
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user) {
            let postsRef = collection(db, 'posts')
            let postsQuery = query(postsRef, orderBy('createdAt', 'desc'))

            onSnapshot(postsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id,
                }))
                setPosts(dataObj as PostProps[])
            })
        }
    }, [user])
    return (
        <div className="home">
            <div className="home__top">
                <div className="home__title">Home</div>
                <div className="home__tabs">
                    <div className="home__tab home__tab--active">For you</div>
                    <div className="home__tab">Fllowing</div>
                </div>
            </div>
            <PostForm />
            {/* tweet post */}
            <div className="post">
                {posts?.length > 0 ? (
                    posts?.map((post) => <PostBox key={post.id} post={post} />)
                ) : (
                    <div className="post__no-posts">
                        <div className="post__text">게시글이 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    )
}
