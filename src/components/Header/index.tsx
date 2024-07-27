import styles from './styles.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react'

export default function Header() {
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.contentHeader}>
                {status === 'loading' ? (
                    <></>
                ) : session ? (
                    <>
                        <div className={styles.contentUser}>
                            <img src={session?.user?.image as string} alt="teste" />
                            <div className={styles.contentUserInfo}>
                                <h1>{session?.user?.name}</h1>
                                <p>{session?.user?.email}</p>
                            </div>
                        </div>
                        <nav>
                            <a className={router.pathname === '/' ? styles.active : ''} href='/'>Home</a>
                            <a className={router.pathname === '/dashboard' ? styles.active : ''} href='/dashboard'>Dashboard</a>
                            <button onClick={() => signOut()}>Logout</button>
                        </nav>
                    </>
                ) : (
                    <>
                        <h1 className={styles.logo}>Disc<span>List</span></h1>
                        <nav>
                            <a className={router.pathname === '/' ? styles.active : ''} href='/'>Home</a>
                            <a className={router.pathname === '/dashboard' ? styles.active : ''} href='/dashboard'>Dashboard</a>
                            <button onClick={() => signIn("discord")}>Login</button>
                        </nav>
                    </>
                )}
            </div>
            <Toaster position="bottom-center"/>
        </header>
    )
}