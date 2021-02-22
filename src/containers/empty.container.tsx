import styled from "styled-components";


export const EmptyContainer = () => {
    return (
        <>
            <BoxWrapper>
            <Box>
                5
            </Box>
            </BoxWrapper>

        </>
    )
}


const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Box = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`
