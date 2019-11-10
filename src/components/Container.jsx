import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1800px;
    x-overflow: hidden;
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
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`