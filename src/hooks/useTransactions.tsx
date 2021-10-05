import { createContext, useEffect, useState, useContext } from 'react'
import { api } from '../services/api'

interface Transaction {
    id: number
    title: string
    amount: number
    type: 'deposit' | 'withdraw'
    category: string
    createdAt: string
}

interface TransactionContextData {
    transactions: Transaction[]
    createTransaction(transaction: TransactionInput): Promise<void>
}

interface TransactionProviderProps {
    children: React.ReactNode
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

const TransactionContext = createContext({} as TransactionContextData)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState([] as Transaction[])

    useEffect(() => {
        getAllTransactions()
    }, [])

    async function getAllTransactions() {
        api.get('/transactions').then(response =>
            setTransactions(response.data['transactions'])
        )
    }

    async function createTransaction(transactionInput: TransactionInput) {
        try {
            const res = await api.post('/transactions', {
                ...transactionInput,
                createdAt: new Date()
            })

            const { transaction } = res.data

            setTransactions(prev => [...prev, transaction])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TransactionContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransaction() {
    const context = useContext(TransactionContext)

    return context
}
