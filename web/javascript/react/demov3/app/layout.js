import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "./globals.css"

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <body className="d-flex flex-column h-100">
      <Header />
      {children}
      <Footer />
    </body>
  )
}
