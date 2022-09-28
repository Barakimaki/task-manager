import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import ListItemText from "@mui/material/ListItemText";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Drawer from "@mui/material/Drawer";
import {useNavigate} from "react-router-dom";

interface Props {

    mobileOpen: boolean
    handleDrawerToggle: ()=>void
    setPageTitle: (str: string) => void
    window?: () => Window;
    drawerWidth: number
}


const NavBar = ({window, setPageTitle, handleDrawerToggle, mobileOpen, drawerWidth}: Props) => {

    const navigate = useNavigate()

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('My Projects')
                    navigate('/projects')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'My Projects'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('Project\'s tasks')
                    navigate('/projectsTasks')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <TaskRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Project\'s tasks'}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('My Tasks')
                    navigate('/myTasks')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'My Tasks'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('Tasks Calendar')
                    navigate('/tasksCalendar')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Tasks Calendar'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open
            >
                {drawer}
            </Drawer>
        </div>
    );
};

export default NavBar;