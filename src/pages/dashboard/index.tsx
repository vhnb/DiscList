import styles from './styles.module.css'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { Toaster, toast } from 'sonner'
import Head from 'next/head'

import { FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

interface HomeProps {
    user: {
        email: string
    }
}

interface TasksProps {
    id: string,
    created: Date,
    task: string,
    userName: string,
    userMail: string
}

export default function Dashboard({ user }: HomeProps) {
    const { data: session } = useSession()
    const [inputTask, setInputTask] = useState('')
    const [tasks, setTasks] = useState<TasksProps[]>([])

    useEffect(() => {
        async function LoadTasks() {
            const tasksRef = collection(db, 'tasks')
            const q = query(
                tasksRef, where('userMail', '==', user?.email)
            )

            onSnapshot(q, (snapshot) => {
                let listaTasks = [] as TasksProps[]

                snapshot.forEach((doc) => {
                    listaTasks.push({
                        id: doc.id,
                        created: doc.data().created,
                        task: doc.data().task,
                        userName: doc.data().userName,
                        userMail: doc.data().userMail
                    })
                })
                setTasks(listaTasks)
            })
        }
        LoadTasks()
    }, [session?.user?.email])


    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault()

        if (inputTask === '') {
            toast.error('The input cannot be empty')
            return
        }

        try {
            await addDoc(collection(db, 'tasks'), {
                task: inputTask,
                created: new Date(),
                userName: session?.user?.name,
                userMail: session?.user?.email
            })

            setInputTask('')
            toast.success('Task added successfully.')
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, 'tasks', id)
        await deleteDoc(docRef)
        toast.success('Task removed successfully.')
    }

    return (
        <main className={styles.container}>
            <Head>
                <title>DiscList | Dashboard</title>
            </Head>
            <div className={styles.contentDashboard}>
                <a href='https://discord.com/oauth2/authorize?client_id=1265882278219874304&permissions=8&integration_type=0&scope=bot' target='blank'><IoIosAdd size={22} style={{ marginRight: '8px', }} /> Add application</a>
                <form onSubmit={handleRegisterTask}>
                    <input value={inputTask} type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setInputTask(event.target.value)} placeholder='Enter a task...' />
                    <button type='submit'><IoIosAdd /></button>
                </form>
                <div className={styles.contentTasks}>
                    {tasks.map((item) => (
                        <div className={styles.cardTask} key={item.id}>
                            <p>{item.task}</p>
                            <FaTrash className={styles.iconDeleteTask} onClick={() => handleDeleteTask(item.id)} />
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <p style={{ color: '#888', marginTop: '20px', }}>No tasks...</p>
                    )}
                </div>
            </div>
            <Toaster position="bottom-center" />
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        },
    }
}