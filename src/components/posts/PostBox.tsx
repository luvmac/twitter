import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { PostProps } from 'pages/home'

interface PostBoxProps {
    post: PostProps
}
export default function PostBox({ post }: PostBoxProps) {
    const handleDelete = () => {}
    return (
        <div className="post__box" key={post?.id}>
            <Link to={`/posts/${post?.id}`}>
                <div className="post__box-profile ">
                    <div className="post__flex">
                        {post?.profileUrl ? (
                            <img src={post?.profileUrl} alt="프로필이미지" className="post__box-profile-img" />
                        ) : (
                            <FaUserCircle className="post__box-profile-icon" />
                        )}
                        <div className="post__email">{post?.email}</div>
                        <div className="post__createdAt">{post?.createdAt}</div>
                    </div>
                    <div className="post__box-content">{post?.content}</div>
                </div>
                <div className="post__box-footer">
                    <>
                        <button type="button" className="post__delete" onClick={handleDelete}>
                            delete
                        </button>
                        <button type="button" className="post__edit">
                            <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                        </button>
                        <button type="button" className="post__likes" onClick={handleDelete}>
                            <AiFillHeart />
                            {post?.likeCount || 0}
                        </button>
                        <button type="button" className="post__coments">
                            <FaRegComment />
                            {post?.comments?.lenght || 0}
                        </button>
                    </>
                </div>
            </Link>
        </div>
    )
}
