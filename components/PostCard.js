import React, { useState, useEffect } from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import { dateFormat } from '../functions/generalMethods';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
// import marked from 'marked'
// import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

export default function Card({posts}) {
    // const content = [
    //     {
    //         title: '¿En que son idénticos Pepsi y Coca Cola?',
    //         body: `A pesar de que las compañías de Pepsi y Coca Cola venden bebidas similares, 
    //         ambas son muy diferentes por su calidad de producto o su estrategia de marketing [...]`,
    //         date: '25 Mayo 2021',
    //         bgImg:"/assets/post1.jpg",
    //     },
    //     {
    //         title: 'Reporte Ganancias y perdidas',
    //         body: `Es uno de los reportes financieros mas importantes y mas usados debido a 
    //         que resume las ganancias, costos, gastos, impuestos en un solo lugar y en un determinado periodo [...]`,
    //         date: '22 Mayo 2021',
    //         bgImg:"/assets/post2.jpg",
    //     },
    //     {
    //         title: 'Reporte ventas e ingresos',
    //         body: `Es el mas usado y uno de los mas básicos, solo tenemos que compilar las ventas, costos y 
    //         ingresos para un determinado periodo. Este reporte suele combinarse con los gastos obteniendo así 
    //         el margen de ganancia en la empresa [...]`,
    //         date: '17 Mayo 2021',
    //         bgImg:"/assets/post1.jpg",
    //     },
    //     {
    //         title: 'Reporte Inventario',
    //         body: `Es usado para determinar cuando producto tenemos disponible en un determinado momento. 
    //         Este reporte suele ser muy simple pero de gran utilidad debido a que podemos en conjunto con el 
    //         reporte de ventas podemos determinar cuando y cuantos productos comprar evitando [...]`,
    //         date: '12 Mayo 2021',
    //         bgImg:"/assets/post4.jpg",
    //     },
    // ]
    // marginLeft:(index === 0 && '5rem'), marginRight:(index === content.length - 1 && '5rem')
    // position:'relative', background: `url(${bgImg}) no-repeat`, backgroundSize: 'cover'
    let cardSize;
    if(posts.length > 0 && posts.length < 3) {
        cardSize = 4;
    }else if(posts.length > 2) {
        cardSize = 2;
    }
    return(
        <Grid container className="post-cards-container-wrapper">
            {posts.length > 0 && posts.map((post, index) => {
                const image = post.post_img && post.post_img.url;
                const plainTextHtml = post.content.replace(/<[^>]+>/g, '');
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
                                            {dateFormat(post.published_at)}
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
                                            <Typography 
                                                    variant="body1" 
                                                    className="card-post-body"
                                                    style={{
                                                        marginTop:10, color:'#fff', fontWeight:400, 
                                                        overflow: 'hidden', 
                                                        width:'100%',
                                                        height: 120,
                                                        textOverflow:'ellipsis',
                                                    }}
                                                >
                                                    {plainTextHtml}
                                                </Typography>
                                                <Typography 
                                                    variant="body1"
                                                    style={{color:'#fff', fontWeight:400, }}
                                                >
                                                    [...]
                                                </Typography>
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
// export async function getStaticProps() {

//     const allPosts = await fetch(`http://localhost:1337/posts`);
//     const allPostsData = await allPosts.json();
//     const host = process.env.HOST;

//     const window = new JSDOM('').window;
//     const DOMPurify = createDOMPurify(window);

//     allPostsData.forEach(item => {
//         item.content = DOMPurify.sanitize(marked(item.content));
//     })

// 	return {
//         props: {posts: allPostsData.filter(item => item.slug !== posts).splice(0, 3) }
//     }
// }