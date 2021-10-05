import { useState } from 'react'
import Modal from 'react-modal'

import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyles } from './styles/global'
import { Header } from './components/Header'
import { TransactionProvider } from './hooks/useTransactions'

Modal.setAppElement('#root')

export function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false)

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true)
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false)
    }

    return (
        <TransactionProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
            <Dashboard />

            <NewTransactionModal
                isOpen={isNewTransactionModalOpen}
                onClose={handleCloseNewTransactionModal}
            />
            <GlobalStyles />
        </TransactionProvider>
    )
}
