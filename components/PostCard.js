import React, { useEffect } from 'react';
import {Typography, Grid} from '@material-ui/core';
import { dateFormat } from '../functions/generalMethods';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
                item.innerHTML = item.textContent.trim();
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
                                            {dateFormat(post.date)}
                                        </Typography>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <Grid container item direction="column">
                                            <Typography
                                                variant="h4"
                                                style={{fontStyle:'italic', color:'#ffbf64', fontWeight:600}}
                                            >
                                                {post.title.rendered}
                                            </Typography>
                                            <div
                                                ref={ref=>contentTag[index] = ref}
                                                className="card-post-body"
                                                style={{
                                                    marginTop:10, color:'#fff', fontWeight:400, 
                                                    overflow: 'hidden', 
                                                    width:'100%',
                                                    height: 120,
                                                    textOverflow:'ellipsis',
                                                }}
                                                dangerouslySetInnerHTML={{__html: post.content.rendered}}
                                            ></div>
                                            {/* <Typography 
                                                variant="body1"
                                                style={{color:'#fff', fontWeight:400, }}
                                            >
                                                {
                                                    contentTag[index].innerHTML.length > 150 &&
                                                    `[...]`
                                                }
                                                
                                            </Typography> */}
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