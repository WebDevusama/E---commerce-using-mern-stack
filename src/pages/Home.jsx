import ImageSlider from '../components/ui/image-slider'
import '../pages/Home.css'
import Footer from '../components/ui/Footer'

export default function Home() {
  return (
    <>
      <ImageSlider 
        slides={[
          { url: '/assets/Images/imageslider/slider-image1.jpg', title: 'Image 1' },
          { url: '/assets/Images/imageslider/slider-image2.jpg', title: 'Image 2' },
          { url: '/assets/Images/imageslider/slider-image3.jpg', title: 'Image 3' },
        ]}
      />
    
      
    

    <Footer />






    </>
  )
}
