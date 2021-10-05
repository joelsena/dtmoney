import { Container, SummaryItem } from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransaction } from '../../hooks/useTransactions'

export function Summary() {
    const { transactions } = useTransaction()

    const summary = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === 'deposit') {
                acc.deposits += transaction.amount
                acc.total += transaction.amount
            } else {
                acc.withdraws += transaction.amount
                acc.total -= transaction.amount
            }

            return acc
        },
        {
            deposits: 0,
            withdraws: 0,
            total: 0
        }
    )

    return (
        <Container>
            <SummaryItem>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </SummaryItem>

            <SummaryItem>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>
                    -{' '}
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}
                </strong>
            </SummaryItem>

            <SummaryItem>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </SummaryItem>
        </Container>
    )
}
