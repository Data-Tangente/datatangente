import React, { useState, useEffect } from 'react';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import Tags from '../../components/Tags';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { dateFormat } from '../../functions/generalMethods';
import marked from 'marked'
import createDOMPurify from 'dompurify'
import { useRouter } from 'next/router'
import { JSDOM } from 'jsdom'


export default function PostDetailPage({post, posts, host, content}) {
    const router = useRouter();
    const image = post && post.post_img.url;

    const handleTagRedirection = (tag) => {
        sessionStorage.setItem("redirectTag", tag);
        router.push({
            pathname: '/posts/',
        })
    }
    useEffect(() => {
        const el = document.querySelector('#post-content');
        el.innerHTML = content
        const images = document.querySelectorAll('#post-content > p > img');
        images.forEach(item => {
            const currentAtt = item.getAttribute('src');
            item.setAttribute('src', host+currentAtt);
        });
    }, []);

    return(

        <Grid style={{backgroundColor:'#fafafa', paddingBottom:'5rem'}}>
            <div className="post-detail-banner"></div>
            <Grid container direction="row" className="post-content-wrapper">
                <Grid item container direction="column" className="post-content-container">
                    <div className="post-detail-title-img" style={{backgroundImage:`url(${host}${image})`}}></div>
                    <Typography  
                        variant="h4"
                        style={{color:'#dc5136', fontWeight:600, marginTop:'2rem'}}
                    >
                        <span>{post.title}</span>
                    </Typography>
                    <Grid container item direction="row" alignItems="center" alignContent="flex-start" style={{margin:'2rem 0'}}>
                        <Icon style={{color:'#878787', marginRight:'1rem'}} icon={faCalendarAlt} />
                        <Typography
                            variant="subtitle1"
                            style={{color:'#878787', fontWeight:600}}
                        >
                            { dateFormat(post.published_at) }
                        </Typography>
                    </Grid>

                    <Typography  
                        variant="body1"
                        style={{color:'#383838', width:'100%'}}
                        id="post-content"
                    >
                        {content}
                    </Typography>

                </Grid>

                <Grid container item direction="column" justify="flex-start" className="post-page-side-content">
                    <div style={{alignItems:'center', flexDirection:'column', marginBottom:'2rem'}}>
                        <Typography  
                            variant="h5"
                            style={{color:'#f05638', fontWeight:600, letterSpacing:2, borderBottom:'1px solid #f05638', paddingBottom: '1rem', marginBottom: '1rem'}}
                        >
                            TAGS
                        </Typography>
                        {post.tags.length > 0 && post.tags.map((item, index) => {
                            return(
                                <div 
                                    style={{display:'inline-block', cursor:'pointer'}} 
                                    key={item.name + " - " + index}
                                    onClick={handleTagRedirection.bind(this, item.name)}
                                >
                                    <Tags
                                        key={item.name + index}
                                        tag={item.name}
                                        class="selected post-detail"
                                    />
                                </div>
                            )
                        })}
                    </div>
                    {  
                        posts.length > 0 ?
                        <div style={{alignItems:'center', flexDirection:'column'}}>
                            <Typography  
                                variant="h5"
                                style={{color:'#f05638', fontWeight:600, letterSpacing:2, borderBottom:'1px solid #f05638', paddingBottom: '1rem', marginBottom: '1rem'}}
                            >
                                <span>OTRAS PUBLICACIONES</span>
                            </Typography>
                            {posts && posts.map((item, index) => {
                                const image = item.post_img && item.post_img.url;
                                const plainTextHtml = item.content.replace(/<[^>]+>/g, '');
                                return(
                                    <Grid item container xs={12} key={item.title+"_"+index} className="page-card-post-expand-container" style={{width:'22rem', height:'27rem'}}>
                                        <a href={`/posts/${item.slug}`} className="card-post-container" style={{position:'relative', backgroundColor: '#fff'}}>
                                            <div style={{backgroundImage: `url(${host}${image})`, backgroundRepeat:'no-repeat', backgroundSize: '100%', width:'100%', height:'150px'}}></div>
                                            <Grid container item direction="column" style={{padding:'1rem 1rem'}}>
                                                <Typography
                                                    variant="h6"
                                                    style={{color:'#606060', fontWeight:700, margin: '1rem 0 .5rem 0'}}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Typography 
                                                    variant="body1" 
                                                    className="card-post-body"
                                                    style={{
                                                        marginTop:10, color:'#262626', fontWeight:400, 
                                                        overflow: 'hidden', 
                                                        width:'100%',
                                                        height: 120,
                                                        textOverflow:'ellipsis',
                                                    }}
                                                >
                                                    {/* {item.content} */}
                                                    {plainTextHtml}
                                                </Typography>
                                                <Typography 
                                                    variant="body1"
                                                    style={{color:'#262626', fontWeight:400, }}
                                                >
                                                    [...]
                                                </Typography>
                                            </Grid>
                                        </a>
                                    </Grid>
                                )
                            })}
                        </div> : null
                    }
                </Grid>
            </Grid>
        </Grid>
    
    )
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:1337/posts");
    const posts = await response.json();
    const paths = posts.map((post) => ({
         params: { posts: post.slug },
    }));
    
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { posts } = params;
    const response = await fetch(`http://localhost:1337/posts?slug=${posts}`);
    const data = await response.json();
    const post = data[0];

    const allPosts = await fetch(`http://localhost:1337/posts`);
    const allPostsData = await allPosts.json();
    const host = process.env.HOST;

    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const content = DOMPurify.sanitize(marked(post.content));

    allPostsData.forEach(item => {
        item.content = DOMPurify.sanitize(marked(item.content));
    })

	return {
        props: { post, posts: allPostsData.filter(item => item.slug !== posts).splice(0, 3), host: host, content: content}
    }
}