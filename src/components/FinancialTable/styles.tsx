import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 4.5rem 0 1rem;
  display: flex;
  overflow-x: scroll;
  max-width: 100%;
  margin-bottom: 7.5rem;

  @media screen and (max-width: 768px) {
    padding: 2.5rem 0 1rem;
  }
`;