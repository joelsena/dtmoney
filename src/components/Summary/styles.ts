import styled from 'styled-components'

export const Container = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: -10rem;

    div:nth-child(3) {
        background: var(--green);
        color: #fff;
    }
`

export const SummaryItem = styled.div`
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    strong {
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: 500;
        line-height: 3rem;

        display: block;
    }
`
