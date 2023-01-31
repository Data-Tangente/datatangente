import React, { useState, useEffect } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import imagesLoaded from 'imagesloaded';
import { useRouter } from 'next/router';


const Layout = ({children}) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        imagesLoaded(document.querySelector('.main'), {background: true}, function( instance ) {
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        router.events.on("routeChangeComplete", () => {
            setLoaded(false);
            imagesLoaded(document.querySelector('.main'), {background: true}, function( instance ) {
                setLoaded(true);
            });
        });
        return () => {
            router.events.off("routeChangeComplete");
        }
    }, [router.events]);
    
    useEffect(() => {
        console.log('this page re-renderd');
    });
    return(
        <div className="main">
            {
                !loaded &&
                <div style={{width:'100%', height:'300rem', position:'absolute', backgroundColor:'#fff', transition:'all .2s ease-out', zIndex:99999999}}></div>
            }
            <Navbar />
            { children }
            <Footer />
        </div>
    )
};

export default Layout;