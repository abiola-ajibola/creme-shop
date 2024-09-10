import { Paper, PaperTypeMap, styled } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Image from "next/image";

export const SignupWrapper = styled("main")(({ theme }) => {
  return `
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${theme._.padding.large};
  
  .submit_button {
    // width: 100%;
  }

  ${theme.breakpoints.down("sm")} {
    .gridContainer {
      flex-direction: column;
    }
  }
  
  .gridItem {
    flex-basis: 50%;
  }
`;
});
declare module "@mui/material" {
  export interface PaperOwnProps {
    component?: string;
  }
}
export const StyledPaper = styled(
  Paper as OverridableComponent<PaperTypeMap<{}, "div">>
)(
  ({ theme }) => `
border-radius = ${theme.shape.borderRadius};
max-width: ${theme._.sizes.md};
width: 100%;
padding: ${theme._.padding.normal};
`
);

export const Div = () => {
  return (
    <div>
      <Image src="./sample" alt="" />
    </div>
  );
};
