import { MouseEventHandler, KeyboardEventHandler } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { pages } from ".";

export default function TemporaryDrawer({
  state,
  routes,
  onClose,
  onKeyDown,
}: {
  state: boolean;
  routes: typeof pages;
  onClose: MouseEventHandler<HTMLDivElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
}) {
  const list = () => (
    <Box
      sx={{ width: 250 }}
      component={"div"}
      onClick={onClose}
      onKeyDown={onKeyDown}
    >
      <List>
        {routes.map(({ name, route }, index) => (
          <ListItem key={route} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={state} onClose={onClose}>
        {list()}
      </Drawer>
    </div>
  );
}
