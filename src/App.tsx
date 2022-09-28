import './App.scss';
import {Route, Routes} from "react-router-dom";
import {privateRoutes} from "./routes/routes";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useState} from "react";
import NavBar from "./components/navBar/NavBar";
import Header from "./components/header/Header";

const drawerWidth = 240;

interface Props {

    window?: () => Window;
}

function App(props : Props) {

    const [pageTitle, setPageTitle] = useState('Tasks Manager')


    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    return (
        <div className="App">
            <Box sx={{display: 'flex'}}>
                <Header
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                    pageTitle={pageTitle}
                />
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                    aria-label="mailbox folders"
                >
                    <NavBar
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        setPageTitle={setPageTitle}
                        window={window}
                        drawerWidth={drawerWidth}
                    />
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
                >
                    <Toolbar/>
                    <Routes>
                        {privateRoutes.map(route => <Route path={route.path} element={route.component}
                                                           key={route.path}/>)}
                    </Routes>
                </Box>
            </Box>
        </div>
    );
}

export default App;
