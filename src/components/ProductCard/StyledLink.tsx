import styled from "@emotion/styled";
import Link from "next/link";

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  &:link,
  &:visited,
  &:hover {
    text-decoration: none;
    color: unset;
  }
  img {
    width: 100%;
    height: unset;
  }
`;

export default StyledLink;
