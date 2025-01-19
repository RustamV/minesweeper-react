import styled from "styled-components";

const StyledInput = styled.input`
    border: 2px solid var(--secondary);
    background: var(--third);
    border-radius: 4px;
    height: 24px;
    padding: 2px 4px;
    font-family: "UpheavalPro";

    &:focus-visible {
        outline: none;
    }
`;

export { StyledInput };
