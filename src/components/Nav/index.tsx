import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { StyledNav } from "./StyledNav";
import Image from "next/image";
import Link from "../Link";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllCartItems } from "@/redux/reducers";
import { RootState } from "@/redux/store";

export const pages = [
  { name: "Products", route: "/#products" },
  { name: "Pricing", route: "/#pricing" },
  { name: "Blog", route: "/#blog" },
];
const settings = ["Profile", "Account", "Cart", "Logout"];
export function Nav() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  // eslint-disable-next-line no-unused-vars
  const [_drawerState, setDrawerState] = useState<boolean>(false);
  const cartItemsCount = useSelector((state: RootState) =>
    selectAllCartItems(state).reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0)
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const toggleDrawer =
  //   (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
  //     if (
  //       event.type === "keydown" &&
  //       ((event as KeyboardEvent).key === "Tab" ||
  //         (event as KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setDrawerState(true);
  //   };
  return (
    <StyledNav>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
              }}
            >
              <Image
                src={"/logo_stripped.png"}
                alt="Logo"
                width={82}
                height={69}
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map(({ name, route }) => (
                  <MenuItem
                    sx={{ padding: 0 }}
                    key={route}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      sx={{
                        textDecoration: "none",
                        padding: "8px 16px",
                      }}
                      textAlign="center"
                      href={route}
                    >
                      {name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                color: "inherit",
                flexGrow: 1,
              }}
            >
              <Image
                src={"/logo_stripped.png"}
                alt="Logo"
                width={82}
                height={69}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, route }) => (
                <Link
                  sx={{
                    textDecoration: "none",
                  }}
                  textAlign="center"
                  href={route}
                  key={route}
                >
                  <Button
                    role="link"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    {name}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Link href="/cart">
                <Badge
                  sx={{
                    margin: 2,
                  }}
                  badgeContent={cartItemsCount}
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </Link>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </StyledNav>
  );
}
