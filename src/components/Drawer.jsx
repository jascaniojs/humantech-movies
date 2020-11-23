import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import { NavLink, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;
const barHeigth = 60;
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  drawer: {
    marginTop: barHeigth,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    height: barHeigth,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100&',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: barHeigth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: 8,
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function ResponsiveDrawer(props) {
  const { window, history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {[
          { text: 'Dashboard', path: '/' },
          { text: 'Peliculas', path: '/peliculas' },
          { text: 'Turnos', path: '/turnos' },
          { text: 'Administradores', path: '/administradores' },
          { text: 'Perfil', path: '/perfil' },
          { text: 'Cerrar sesión', path: '' },
        ].map((route, index) => (
          <NavLink
            to={route.path}
            style={{ textDecoration: 'none' }}
            key={route.text}
          >
            <ListItem button key={route.text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={route.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.main}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
          >
            <Typography variant='h6' noWrap>
              UI Gestor de Videos
            </Typography>
            <div className={classes.avatar}>
              <Avatar className={classes.large}>
                <FaceIcon />
              </Avatar>
              <Typography variant='body1'>Usuario</Typography>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default withRouter(ResponsiveDrawer);
