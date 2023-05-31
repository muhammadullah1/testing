
import SidebarProvider from './Constants/SidebarContext';
import AppRoutes from './Route'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from './Components/ScrollTop';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
function App() {
  const {i18n} = useTranslation();
  return (
    <ConfigProvider direction={i18n.dir()}>
      <SidebarProvider>
        <div className="App">
          <ScrollToTop/>
        <AppRoutes />
        </div>
      </SidebarProvider>
      </ConfigProvider>

    
  );
}

export default App;
