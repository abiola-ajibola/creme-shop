import { Paper, PaperTypeMap, styled } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const LoginStyles = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 69px);
  align-items: center;

  .submit_button {
    width: 100%;
  }
`;

export const StyledPaper: OverridableComponent<
  PaperTypeMap<{}, "div">
> = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  max-width: 600px;
  min-width: 420px;
`;
