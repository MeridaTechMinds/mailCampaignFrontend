
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import ReduxWrapper from "@/Redux/ReduxWrapper";
import '../Styles/scrollBar.css'
import '../Styles/table.css'
import '../Styles/font.css'
import 'react-quill-new/dist/quill.snow.css';


export const metadata = {
  title: 'Mail Management',
  description: 'Mail Management developed by the Merida',
  icons: {
    icon: '/faviconMerida.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=AR+One+Sans:wght@400..700&family=Coustard:wght@400;900&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"></link>
      </head>
      <body>
        <ReduxWrapper>
          {children}
        </ReduxWrapper>
        <ToastContainer autoClose={3000} position="top-center" />
      </body>
    </html>
  );
}
