import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import {
    Container,
    TransactionTypeContainer,
    TransactionTypeRadioButton
} from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'

interface NewTransactionModalProps {
    isOpen: boolean
    onClose(): void
}

type transactionType = 'deposit' | 'withdraw'

export function NewTransactionModal({
    isOpen,
    onClose
}: NewTransactionModalProps) {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState<transactionType>('deposit')

    function handleCreateNewTransaction(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault()

        const data = {
            title,
            value,
            type,
            category
        }

        try {
            api.post('/transactions', data)
        } catch (error) {
            console.error(error)
        }
        // Apagar campos
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="react-modal-close"
                type="button"
                onClick={onClose}
            >
                <img src={closeImg} alt="x" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                />

                <TransactionTypeContainer>
                    <TransactionTypeRadioButton
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </TransactionTypeRadioButton>

                    <TransactionTypeRadioButton
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </TransactionTypeRadioButton>
                </TransactionTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}
