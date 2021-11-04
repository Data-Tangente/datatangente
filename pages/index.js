import React, { useState, useEffect } from 'react';
import Slideshow from './../components/Slideshow';
import Division from  './../components/Division';
import BigDivision from  './../components/BigDivision';
import WorkedDivision from  './../components/WorkedDivision';
import PostCard from  './../components/PostCard';
import SubsDivision from  './../components/SubscribeDivision';
// import Projects from  './../components/Projects';
// import imagesLoaded from 'imagesloaded';
// import marked from 'marked'
// import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

export default function Home({posts}) {
	return(
		<div className="page-wrap">
            <Slideshow />
            <Division 
                boldText="SOLUCIONES"
                normalText="ACORDE A TUS NECESIDADES"
                bgColor="#f05638"
                textColor="#fff"
            />
            <BigDivision />
            <Division 
                boldText="HAN CONFIADO"
                normalText="EN NUESTRO TRABAJO"
                // bgColor="#fff"
                // textColor="#dc5136"
                bgColor="#fff"
                textColor="#f05638"
            />
            <WorkedDivision 
                bgColor="#f05638"
            />
            <Division 
                boldText="PUBLICACIONES"
                normalText="RECIENTES"
                bgColor="#fff"
                textColor="#dc5136"
            />
            <PostCard 
                posts={posts}
            />
            <SubsDivision />
        </div>
	)
}

export async function getStaticProps() {

    // const allPosts = await fetch(`https://datatangente.herokuapp.com/posts`);
    // const allPosts = await fetch(`http://localhost:1337/posts`);
    const allPosts = await fetch(`${process.env.host}/wp-json/wp/v2/posts?_embed`);
    const allPostsData = await allPosts.json();
    // const window = new JSDOM('').window;
    // const DOMPurify = createDOMPurify(window);

    // allPostsData.forEach(item => {
    //     item.content = DOMPurify.sanitize(marked(item.content));
    // })
    allPostsData.forEach(item => {
        const bannerImg = item._embedded['wp:featuredmedia'];
        item.banner_img = bannerImg ? bannerImg[0].source_url : '';
    });

	return {
        props: {posts: allPostsData.splice(0, 3) }
    }
}