import React, {  useEffect } from 'react';
import HomeIcon from '../../assets/images/Icons/home.jsx';
import UsersIcon from '../../assets/images/Icons/users.jsx';
import SidebarIcon from '../../assets/images/Icons/sidebaricon.jsx';
import Search from '../../Components/Header/Serach.jsx';
import ChangeLangBtn from '../../Components/Header/ChangeLangBtn.jsx';
import UserProfile from '../../Components/Header/ShowProfile.jsx';
import {ReactComponent as Logo} from '../../assets/images/dashboardlogo.svg'
import { Link } from "react-router-dom";
import { useSidebar } from '../../Constants/SidebarContext.js';
import { Button, ConfigProvider } from "antd";
import ManageContent from '../../assets/images/Icons/managecontent.jsx'
import Requests from '../../assets/images/Icons/requests.jsx';
import Purchases from '../../assets/images/Icons/purchases.jsx';
import { ReactComponent as Serviceicon } from "../../assets/images/SVGS/serviceicon.svg"
function Layout({ activePage, children }) {
    const sidebarFun = useSidebar();
    const { width, sidebar, content, updateSidebar } = sidebarFun;
    const pages = [
        {
            name: 'Dashboard',
            url: '/admin/dashboard',
            icon: <HomeIcon />
        },
        {
            name: 'Template',
            url: '/admin/template',
            icon: <UsersIcon />
        },
        {
            name: 'Requests',
            url: '/admin/requests',
            icon: <Requests/>
        },
        {
            name: 'Purchases',
            url: '/admin/purchases',
            icon: <Purchases/>
        },
        {
            name: 'Manage Content',
            url: '/admin/managecontent',
            icon: <ManageContent/>
        },
        {
            name: 'Services',
            url: '/admin/services',
            icon: <Serviceicon/>
        },
    ]
    // const { pageTitle = "Dashboard" } = activePage;
    useEffect(() => {
        document.title = activePage;
    }, [activePage]);
    // const [sidebar, setSidebar] = useState('sidebar');
    // const [content, setContent] = useState('content');
    // const changeSidebarStatus = () => {
    //     if (sidebar === 'sidebar') {
    //         setSidebar('toggled-sidebar');
    //         setContent('toggled-content');
    //     } else {
    //         setSidebar('sidebar');
    //         setContent('content');
    //     }
    // };
    // using React callback hook
    // const changeSidebarStatus = useCallback(() => {
    //     if (sidebar === 'sidebar') {
    //         setSidebar('toggled-sidebar');
    //         setContent('toggled-content');
    //     } else {
    //         setSidebar('sidebar');
    //         setContent('content');
    //     }
    // }, [sidebar, content]);

    // useEffect(() => {
    // 	setWidth(window.innerWidth);
    // 	window.innerWidth < 700 ? setSize(200) : setSize(375);
    // }, [width, size, changeLanguage]) 




    const changeSidebarStatus = () => {
        if (sidebar === 'sidebar') {
            updateSidebar('toggled-sidebar', 'toggled-content');
        } else {
            updateSidebar('sidebar', 'content');
        }
    };

    useEffect(() => {
        if (width < 1025) {
            updateSidebar('toggled-sidebar', 'toggled-content');
        } else {
            updateSidebar('sidebar', 'content');
        }
    }, [width]);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FFC641",
                },
                button: {
                    colorPrimary: "#FFC641",
                },
            }}
        // direction={language === 'ar' ? 'rtl' : 'ltr'}

        >
            <div className={"layout"}
            // dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className={sidebar}>
                    <div className={"f-18 fw-700 d-flex justify-content-between text-white sidebar-style"} style={{
                        paddingBottom: '34px',
                        marginLeft: '17px',
                    }}>
                        {/* <p className='f-20 fw-700'> */}
                        {sidebar === 'sidebar' ? <Logo />  : ''}
                        <Button type="link" onClick={changeSidebarStatus}><SidebarIcon /></Button>
                    </div>
                    <p className={"text-secondary"}>Navigation</p>
                    <ul>
                        {
                            pages.map((page, index) => {
                                return (
                                    <li key={index} className={`${activePage === page.name ? 'active' : ''}`}>
                                        {sidebar === 'sidebar' ? <Link to={page.url}>{page.icon}<span className='px-3'>{page.name}</span></Link> : <Link to={page.url}>{page.icon}</Link>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={content}>
                    <div className={"layout__header"}>
                        <div style={{ textAlign: "initial" }}>
                            <Search />
                        </div>
                        <div className={"layout__header__menu"}>
                            <ChangeLangBtn />
                            <UserProfile gotoprofile={'/admin/profile'} gotologin={'/'} />
                        </div>
                    </div>
                    <div className='pt-2' style={{ padding: '25px' }}>
                        {children}
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default Layout;
