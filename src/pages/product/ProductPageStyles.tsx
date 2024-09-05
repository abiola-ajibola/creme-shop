import styled from "@emotion/styled";

export const ProductPageStyle = styled.div`
  display: flex;
  justify-comtent: center;
  padding: 2rem 1.5rem;
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: calc(100% / 3);
      padding: 0 1rem;
      min-width: 300px;
      flex-grow: 1;
    }
  }
  .image-wrapper > img {
    width: 100%;
    height: unset;
  }
  .actions-wrapper {
    p {
      display: flex;
      justify-content: space-between;
    }
    .qty_input {
      text-align: center;
      width: 4ch;
    }
  }
`;
