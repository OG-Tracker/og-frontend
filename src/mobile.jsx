import React from 'react';
import mobImage from '@/assets/images/all-img/mobile-image.png'
import CanvasAnimation from './pages/ecommerce/canvasAnimation';
class MobileBlocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: this.checkMobile() };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: this.checkMobile() });
  }

  checkMobile() {
    return window.innerWidth < 860; // Adjust this value based on your needs
  }

  render() {
    if (this.state.isMobile) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: 20 }}>
          {/* <CanvasAnimation height="100%"/> */}
          <div className=' text-white font-bold text-2xl px-5 mb-10'>Please get your 1st <span className='text-kog-900'> OGT</span> experience on desktop<span className='text-kog-900'>.</span></div>
          <img className='rounded-full border border-kog-900 shadow-[0px_0px_10px_10px_rgba(0,0,0,0.4)] ' src={mobImage} alt="Mobile Access Blocked" style={{ maxWidth: '100%', marginBottom: 20 }} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default MobileBlocker;
