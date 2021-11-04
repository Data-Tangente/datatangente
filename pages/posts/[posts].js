import React, { useState, useEffect } from 'react';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import Tags from '../../components/Tags';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { dateFormat } from '../../functions/generalMethods';
import { useRouter } from 'next/router'


export default function PostDetailPage({post, posts, host, content}) {
    const router = useRouter();
    let contentTag = [];

    const handleTagRedirection = (tag) => {
        sessionStorage.setItem("redirectTag", tag);
        router.push({
            pathname: '/posts/',
        })
    }

    useEffect(() => {
        if(contentTag.length > 0) {
            contentTag.forEach(item => {
                item.innerHTML = item.textContent.trim();
            });
        }
    }, [contentTag]);

    return(

        <Grid style={{backgroundColor:'#fafafa', paddingBottom:'5rem'}}>
            <div className="post-detail-banner"></div>
            <Grid container direction="row" className="post-content-wrapper">
                <Grid item container direction="column" className="post-content-container">
                    {
                        post.banner_img &&
                        <div className="post-detail-title-img" style={{backgroundImage:`url(${post.banner_img})`}}></div>
                    }
                    <Typography  
                        variant="h4"
                        style={{color:'#dc5136', fontWeight:600, marginTop:'2rem'}}
                    >
                        <span>{post.title.rendered}</span>
                    </Typography>
                    <Grid container item direction="row" alignItems="center" alignContent="flex-start" style={{margin:'2rem 0'}}>
                        <Icon style={{color:'#878787', marginRight:'1rem'}} icon={faCalendarAlt} />
                        <Typography
                            variant="subtitle1"
                            style={{color:'#878787', fontWeight:600}}
                        >
                            { dateFormat(post.date) }
                        </Typography>
                    </Grid>
                    <div
                        id="post-content"
                        style={{color:'#383838', width:'100%'}}
                        dangerouslySetInnerHTML={{__html: post.content.rendered}}
                    ></div>

                </Grid>

                <Grid container item direction="column" justify="flex-start" className="post-page-side-content">
                    <div style={{alignItems:'center', flexDirection:'column', marginBottom:'2rem'}}>
                        {
                            (post.tag_name.length > 0) &&
                            <>
                                <Typography  
                                    variant="h5"
                                    style={{color:'#f05638', fontWeight:600, letterSpacing:2, borderBottom:'1px solid #f05638', paddingBottom: '1rem', marginBottom: '1rem'}}
                                >
                                    TAGS
                                </Typography>
                                {post.tag_name.map((tag, index) => {
                                    return(
                                        <div 
                                            style={{display:'inline-block', cursor:'pointer'}} 
                                            key={tag + "-container-" + index}
                                            onClick={handleTagRedirection.bind(this, tag)}
                                        >
                                            <Tags
                                                key={`${tag}-tag-${index}`}
                                                tag={tag}
                                                class="selected post-detail"
                                            />
                                        </div>
                                    )
                                })}
                            </>
                        }
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
                                return(
                                    <Grid item container xs={12} key={item.title+"_"+index} className="page-card-post-expand-container" style={{width:'22rem', height:'27rem'}}>
                                        <a href={`/posts/${item.slug}`} className="card-post-container" style={{position:'relative', backgroundColor: '#fff'}}>
                                            <div style={{backgroundImage: `url(${item.banner_img})`, backgroundRepeat:'no-repeat', backgroundSize: '100%', width:'100%', height:'150px'}}></div>
                                            <Grid container item direction="column" style={{padding:'1rem 1rem'}}>
                                                <Typography
                                                    variant="h6"
                                                    style={{color:'#606060', fontWeight:700, margin: '1rem 0 .5rem 0'}}
                                                >
                                                    {item.title.rendered}
                                                </Typography>
                                                <div 
                                                    ref={ref=>contentTag[index]=ref}
                                                    className="card-post-body"
                                                    style={{
                                                        marginTop:10, color:'#262626', fontWeight:400, 
                                                        overflow: 'hidden', 
                                                        width:'100%',
                                                        height: 120,
                                                        textOverflow:'ellipsis',
                                                    }}
                                                    dangerouslySetInnerHTML={{__html: post.content.rendered}}
                                                >
                                                </div>
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
    const response = await fetch(`${process.env.host}/wp-json/wp/v2/posts?_embed`);
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
    const postsRequest = await fetch(`${process.env.host}/wp-json/wp/v2/posts?_embed`);
    const postsData = await postsRequest.json();
    const host = process.env.host;

    const tags = await fetch(`${process.env.host}/wp-json/wp/v2/tags`);
    const tagsData = await tags.json();

    postsData.forEach(post => {
        const bannerImg = post._embedded['wp:featuredmedia'];
        post.banner_img = bannerImg ? bannerImg[0].source_url : '';
        post.tag_name = tagsData.map(t => (post.tags.includes(t.id) && t.name) || '').filter(tt => tt);
    });
    const post = postsData.find(item => item.slug === `${posts}`);

	return {
        props: { post, posts: postsData.filter(item => item.slug !== posts).splice(0, 3), host: host}
    }
}