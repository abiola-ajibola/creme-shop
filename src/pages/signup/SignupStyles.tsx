import { Paper, PaperTypeMap, styled } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const SignupWrapper = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme._.padding.large};
  .submit_button {
    width: 100%;
  }

  .gridItem {
    flex-basis: 50%;
  }
`;

export const StyledPaper: OverridableComponent<PaperTypeMap<{}, "div">> =
  styled(Paper)(
    ({ theme }) => `
border-radius = ${theme.shape.borderRadius};
max-width: ${theme._.sizes.md};
width: 100%;
padding: ${theme._.padding.normal};
`
  );
