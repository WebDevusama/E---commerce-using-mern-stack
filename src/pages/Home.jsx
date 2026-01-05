import './Home.css'
import Card from '../components/ui/Card'
import DealsSection from '@/components/ui/DealsSection'
import Clothes from '../components/ui/Clothes'
import ProductPage from './ProductPage'
import Footer from "../components/ui/Footer.jsx";
import FilterSidebar from '../pages/FilterSidebar'
export default function Home() {
  return (
    <>
      <Card/>
      <DealsSection/>
      <Clothes/>
     
    <Footer />

    </>
    
  )
}
