import React, { useEffect } from 'react';
import {Typography, Grid} from '@material-ui/core';
import { dateFormat } from '../functions/generalMethods';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function Card({posts}) {
    let contentTag = [];
    let cardSize;
    if(posts.length > 0 && posts.length < 3) {
        cardSize = 4;
    }else if(posts.length > 2) {
        cardSize = 2;
    }
    useEffect(() => {
        if(contentTag.length > 0) {
            contentTag.forEach(item => {
                const content = item.textContent.trim().substring(0,400);
                item.innerHTML = content;
            });
        }
    }, [contentTag]);
    return(
        <Grid container className="post-cards-container-wrapper">
            {posts.length > 0 && posts.map((post, index) => {
                return(
                    <Grid item container sm={12} md={6} lg={cardSize} key={post.id+"_"+index} className="card-post-expand-container">
                        <a href={`/posts/${post.slug}`} className="card-post-container">
                            <Grid container item style={{position:'relative', background: `url("/assets/post${(index+1)}.jpg") no-repeat`, backgroundSize: 'cover', width:'100%', height:'100%'}}>
                                <div style={{position:'absolute', width:'100%', height:'100%', zIndex:10, backgroundColor:'rgb(0, 0, 0, .7)'}}></div>
                                <Grid container style={{position:'relative', zIndex:20, padding:'1rem 2rem'}}>
                                    <Grid container item direction="row" alignItems="center" alignContent="flex-start">
                                        <Icon style={{color:'#fff', marginRight:'1rem'}} icon={faCalendarAlt} />
                                        <Typography
                                            variant="subtitle1"
                                            style={{color:'#fff', fontWeight:600}}
                                        >
                                            {dateFormat(post.date, post.language.code)}
                                        </Typography>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid container item direction="column">
                                            <Typography
                                                variant="h4"
                                                style={{fontStyle:'italic', color:'#ffbf64', fontWeight:600}}
                                            >
                                                {post.title}
                                            </Typography>
                                            <div
                                                ref={ref=>contentTag[index] = ref}
                                                className="card-post-body"
                                                style={{
                                                    fontSize:'20px',
                                                    marginTop:10, 
                                                    color:'#fff', 
                                                    fontWeight:400, 
                                                    overflow: 'hidden', 
                                                    width:'100%',
                                                    height: 120,
                                                    textOverflow:'ellipsis',
                                                }}
                                                dangerouslySetInnerHTML={{__html: post.content}}
                                            ></div>
                                            <span
                                                style={{
                                                    fontSize:'20px',
                                                    color:'#fff',
                                                    fontWeight:400,
                                                }}
                                            >[...]</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </a>
                    </Grid>
                )
            })}
        </Grid>
    );
}