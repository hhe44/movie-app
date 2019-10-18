import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1800px;
    width: 100vw;
    padding: 0 ${props => props.theme.sizes.xLarge};
    box-sizing: border-box;
`

// Got a single search result?
// No reason to make the rest of the page look empty...
export const SearchPageContainer = styled(Container)`
    min-height: 90vh;
`

export const MediaPageContainer = styled(Container)`
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`