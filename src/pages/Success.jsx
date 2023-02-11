import styled from "styled-components"

const Badge = styled.div`
    width: 200px;
    background-color: #0e9625;
    color:white;
    padding: 20px;
    text-align: center;
    font-size: 40px;
`

const Success = () => {
    return (
        <div>
            <Badge>Successful</Badge>
            <h1>Your Order is being Prepared</h1>
        </div>
    )
}

export default Success