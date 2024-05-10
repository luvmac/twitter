import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'
import { app } from 'firebaseApp'
import { toast } from 'react-toastify'

export default function SignupForm() {
    const [error, setError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const navigate = useNavigate()
    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const auth = getAuth(app)
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
            alert('Welcome')
        } catch (error) {
            toast.error('회원가입에 실패하였습니다. 잠시후  다시 시도해주세요')
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e
        if (name === 'email') {
            setEmail(value)
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

            if (!value?.match(validRegex)) {
                setError('이메일 형식이 올바르지 않습니다.')
            } else {
                setError('')
            }
        }

        if (name === 'password') {
            setPassword(value)

            if (value?.length < 8) {
                setError('비밀번호는 8자리 이상 입력해주세요')
            } else if (value !== passwordConfirmation) {
                setError('비밀번호와 비밀번호 확인 값이 다릅니다.')
            } else {
                setError('')
            }
        }

        if (name === 'password_confirmation') {
            setPasswordConfirmation(value)

            if (value?.length < 8) {
                setError('비밀번호는 8자리 이상 입력해주세요')
            } else if (value !== password) {
                setError('비밀번호와 비밀번호 확인 값이 다릅니다.')
            } else {
                setError('')
            }
        }
    }

    const onClickSocialLogin = async (e: any) => {
        const {
            target: { name },
        } = e

        let provider
        const auth = getAuth(app)

        if (name === 'google') {
            provider = new GoogleAuthProvider()
        }

        if (name === 'github') {
            provider = new GithubAuthProvider()
        }

        await signInWithPopup(auth, provider as GithubAuthProvider | GoogleAuthProvider)
            .then((result) => {
                console.log(result)
                toast.success('로그인 되었습니다.')
            })
            .catch((error) => {
                console.log(error)
                const errorMessage = error?.message
                toast?.error(errorMessage)
            })
    }

    return (
        <form className="form form--lg" onSubmit={onSubmit}>
            <div className="form__title">회원가입</div>
            <div className="form__block">
                <label htmlFor="email">email</label>
                <input type="text" name="email" value={email} id="email" required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="password">password</label>
                <input type="password" name="password" value={password} id="password" required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="password_confirmation">password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    value={passwordConfirmation}
                    id="password_confirmation"
                    onChange={onChange}
                    required
                />
            </div>

            {error && error?.length > 0 && (
                <div className="form__block">
                    <div className="form__error">{error}</div>
                </div>
            )}
            <div className="form__block">
                계정이 있으신가요?
                <Link to="/users/login" className="form__link">
                    로그인하기
                </Link>
            </div>
            <div className="form__block--lg">
                <button type="submit" className="form__btn--submit" disabled={error?.length > 0}>
                    {' '}
                    회원가입
                </button>
            </div>
            <div className="form__block">
                <button
                    type="button"
                    name="google"
                    className="form__btn--google"
                    onClick={onClickSocialLogin}
                    disabled={error?.length > 0}
                >
                    {' '}
                    Google로 회원가입
                </button>
            </div>
            <div className="form__block">
                <button
                    type="button"
                    name="github"
                    className="form__btn--github"
                    onClick={onClickSocialLogin}
                    disabled={error?.length > 0}
                >
                    {' '}
                    Github으로 회원가입
                </button>
            </div>
        </form>
    )
}
