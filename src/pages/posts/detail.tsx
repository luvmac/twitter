import { PostProps } from 'pages/home'
import { useCallback, useEffect, useState } from 'react'
import PostBox from 'components/posts/PostBox'
import Loader from 'components/loader/Loader'
import { useParams } from 'react-router-dom'
import { db } from 'firebaseApp'
import { getDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

export default function PostDetailPage() {
    const [post, setPost] = useState<PostProps | null>(null)
    const params = useParams()
    const navigate = useNavigate()

    const getPost = useCallback(async () => {
        if (params.id) {
            const docRef = doc(db, 'posts', params.id)
            const docSnap = await getDoc(docRef)
            setPost({ ...(docSnap.data() as PostProps), id: docSnap?.id })
        }
    }, [params.id])
    useEffect(() => {
        if (params.id) getPost()
    }, [params.id])
    return (
        <>
            <div className="posts">
                <div className="post__header">
                    <button
                        className=""
                        type="button"
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        <IoIosArrowBack className="post__header-btn" />
                    </button>
                </div>
                {post ? <PostBox post={post} /> : <Loader />}
            </div>
        </>
    )
}
