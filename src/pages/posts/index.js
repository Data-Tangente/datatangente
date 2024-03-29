import React, { useState, useEffect } from 'react';
import {Typography, Grid, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Link from 'next/link';
import { PaginationNav } from '../../components/NavPagination';
import Tags from '../../components/Tags';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { dateFormat } from '../../functions/generalMethods';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPostsData } from '../../functions/generalMethods';


function FilterBtn(props) {
    const { t } = useTranslation();
    return(
        <div
            onClick={props.toggleDialog}
            className={"filter-btn " + (props.active && 'active' || '')}
        >
            {t('posts.filter')}
            <Icon icon={faAlignLeft} />
        </div>
    )
}

function FilterDialog(props) {
    const { t } = useTranslation();
    return(
        <Dialog
            fullWidth
            maxWidth="sm"
            keepMounted
            style={{overflow: 'hidden', zIndex:10000}}
            onClose={props.toggleDialog.bind(this, 'close')}
            className="dialog-container"
            open={props.open}
        >
            <DialogTitle className="dialog-header">
                <Grid container justifyContent="space-evenly" alignItems="center" className="dialog-header-title">
                    <Typography onClick={props.toggleDialog.bind(this, 'close')} component={'span'} variant="h6" className="dialog-title" style={{color: '#878787'}}>
                        {t('posts.accept')}
                    </Typography>
                    <Typography component={'span'} variant="h4" className="dialog-title tag-title" style={{color: '#f05638'}}>
                        TAGS
                    </Typography>
                    <Typography onClick={props.resetTagSelection} component={'span'} variant="h6" className="dialog-title" style={{color: '#878787'}}>
                        {t('posts.reset')}
                    </Typography>
                </Grid>
                <div className="dialog-title-bar">
                    <span>
                        {t('posts.filterSelect')}
                    </span>
                </div>
            </DialogTitle>
            <DialogContent className="dialog-tags-container" style={{margin:'1rem 0'}}>
                {props.tags && props.tags.map((item, index) => {
                    return(
                        <Tags
                            key={item + index}
                            tag={item}
                            class="dialog"
                            selectTag={props.handleTagSelect}
                            selectedTags={props.selectedTags}
                        />
                    )
                })}
            </DialogContent>
        </Dialog>
    )
}

export default function PostsPage({ posts, tags }) {
    const { t, i18n } = useTranslation();
    let contentTag = [];
    const router = useRouter();
    const [pagination, setPagination] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState("1");

    // CHANGE THE LANGUAGE POST FILTER TO SOMETHING DYNAMIC, DUE TO HUGE POST LOAD IN FUTURE
    // const posts = resPosts.filter(item => item._embedded['wp:term'].find(lng => lng.slug === i18n.resolvedLanguage));

    const [selectedTags, setSelectedTags] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const tagsList = tags.map(item => item.name);

    const handleToggleDialog = (action) => {
        setOpenDialog(!openDialog);
        if(action === 'close') {
            handleSetFilteredPosts(selectedTags);
        }
    }
    const handleTagSelect = (tag, action) => {
        const preSelectedTags = selectedTags;
        const index = preSelectedTags.indexOf(tag);
        if(index !== -1) {
            preSelectedTags.splice(index, 1);
        }else {
            preSelectedTags.push(tag);
            setSelectedTags(preSelectedTags);
        }
    }

    const handleSetFilteredPosts = (tagSelection, action) => {
        if(tagSelection.length > 0){
            let filteredPosts = [];
            tagSelection.map(item => {
                filteredPosts = filteredPosts.concat(posts.filter( p => p.tag_name.map(t => t).includes(item) ));
                filteredPosts = [...new Set(filteredPosts)];
            })
            setPages(filteredPosts);
            setCurrentPage(1);
        }else {
            setPages(posts);
            setCurrentPage(1);
        }

        if(action === 'singleTag') {
            setSelectedTags(tagSelection);
            router.push('#');
        }
    }

    const handleSetFilters = () => {
        const tagsToSet = preSelectedTags.length > 0 ? preSelectedTags : selectedTags
        setOpenDialog(!openDialog);
        setSelectedTags(tagsToSet);
    }

    const setPages = (thePosts) => {
        const pages = Math.ceil(thePosts.length / 4);
        let result = {};
        let start = 0;
        let end = 4;
        let itemsPerPage = 4;
        for(let i = 0 ; i < pages ; i++) {
            result[(i + 1).toString()] = thePosts.slice(start, end);
            start += itemsPerPage;
            end += itemsPerPage;
        }
        setPageNumber(pages);
        setPagination(result);
    }

    const handleNavArrows = (action) => {
        let page = 1;
        if(action === 'next') {
            page = Number(currentPage) + 1;
        }
        if(action === 'prev') {
            page = Number(currentPage) - 1;
        }
        setCurrentPage(page);
    }

    const handleResetTagSelection = () => {
        const el = document.querySelectorAll('.dialog-tags-container .tags.active');
        el.forEach(item => {
            item.classList.remove("active");
        });
        tags = [];
        setSelectedTags([]);
        setPages(posts);
        setCurrentPage(1);
        setOpenDialog(!openDialog);
    }

    useEffect(() => {
        setPages(posts);
        const redirectTag = sessionStorage.getItem("redirectTag");
        if(redirectTag) {
            handleSetFilteredPosts([redirectTag], 'singleTag');
            sessionStorage.removeItem("redirectTag");
        }
    }, [posts]);

    useEffect(() => {
        if(contentTag.length > 0) {
            contentTag.forEach(item => {
                const content = item.textContent.trim().substring(0,400);
                item.innerHTML = content;
            });
        }
    }, [contentTag]);

    return(
        <div style={{backgroundColor: '#fafafa'}}>
            <div className="page-rec-banner">
                <div className="max-width--">
                    <Typography  
                        variant="h3"
                        style={{color:'#fff', fontWeight:600, letterSpacing:3}}
                    >
                        <span>
                            {t('posts.title')}
                        </span>
                    </Typography>
                </div>
            </div>
            <Grid container direction="row" alignItems="center" justifyContent="space-between" className="nav-header-container max-width--">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} className="nav-filter">
                    <FilterBtn 
                        toggleDialog={handleToggleDialog}
                        active={selectedTags.length > 0}
                    />
                        {selectedTags && selectedTags.map((item, index) => {
                            return(
                                index < 3 ?
                                <Tags
                                    key={item + index}
                                    tag={item}
                                    class="selected"
                                /> :
                                (index + 1) === selectedTags.length && <span key={item + " - " + index} className="selected-filters-plus" style={{fontSize:18, fontWeight:600, color: '#878787'}}>{" + " + (index + 1 - 3)}</span>
                            )
                        })}
                </div>
                <PaginationNav
                    currentPage={currentPage}
                    pageNumber={pageNumber}
                    handleNav={handleNavArrows}
                    class="nav-pagination"
                />
            </Grid>
            <Grid container className="post-cards-container-wrapper posts-page max-width--" style={{paddingBottom: '10rem'}}>
                {(pagination && Object.keys(pagination).length > 0)  && pagination[currentPage].map((post, index) => {
                    return(
                        <Grid item container sm={12} md={6} lg={6} key={post.title.rendered+"_"+index} className="page-card-post-expand-container">
                            <div className="card-post-container" style={{position:'relative', backgroundColor: '#fff', cursor:'auto'}}>
                                {
                                    post.banner_img &&
                                    <div style={{backgroundImage: `url(${post.banner_img})`, backgroundRepeat:'no-repeat', backgroundSize: 'cover', backgroundPosition:'center', width:'100%', height:'300px'}}></div>
                                }
                                <Grid container item direction="column" style={{padding:'2rem 3rem'}}>
                                    <Typography
                                        variant="h4"
                                        style={{color:'#606060', fontWeight:700, letterSpacing: 4, margin: '2rem 0 1rem 0'}}
                                        className="all-posts-card-title"
                                    >
                                        {/* <a href={`/posts/${post.slug}`}> */}
                                        <Link href={post.path}>
                                            {post.title}
                                        </Link>
                                    </Typography>
                                    <Grid container item direction="row" alignItems="center" alignContent="flex-start">
                                        <Icon style={{color:'#878787', marginRight:'1rem'}} icon={faCalendarAlt} />
                                        <Typography
                                            variant="subtitle1"
                                            style={{color:'#878787', fontWeight:600}}
                                        >
                                            { dateFormat(post.date) }
                                        </Typography>
                                    </Grid>
                                    <div
                                        ref={ref=>contentTag[index]=ref}
                                        className="card-post-body"
                                        id="card-post-body"
                                        style={{
                                            fontSize:'22px',
                                            marginTop:15, 
                                            color:'#262626', 
                                            fontWeight:400, 
                                            overflow: 'hidden', 
                                            width:'100%',
                                            height: 135,
                                            // textOverflow:'ellipsis',
                                        }}
                                        dangerouslySetInnerHTML={{__html: post.excerpt}}
                                    ></div>
                                    <span 
                                        style={{
                                            fontSize:'22px',
                                            color:'#262626', 
                                            fontWeight:400,
                                        }}
                                    >[...]</span>
                                </Grid>
                                <Grid container direction="row" style={{width: '100%', padding:'2rem 3rem'}}>
                                    {post.tag_name.length > 0 && post.tag_name.map((item, index) => {
                                        return(
                                            item &&
                                            <div key={`${item} - ${index}`} style={{margin: '0 1.5rem 1rem 0'}} onClick={handleSetFilteredPosts.bind(this, [item], 'singleTag')}>
                                                <Tags tag={item}/>
                                            </div>
                                        )
                                    })}
                                </Grid>
                            </div>
                        </Grid>
                    )
                }) ||
                <div style={{width:'100%', marginTop:'2rem', textAlign:'center', fontWeight: 600, fontSize:30, color:'#878787'}}>
                    NO HAY PUBLICACIONES CON LOS PARÁMETROS SELECCIONADOS.
                </div>
                }
            </Grid>
            <Grid container direction="row" alignItems="center" justifyContent="center" style={{paddingBottom: '10rem'}}>
                <PaginationNav
                    currentPage={currentPage}
                    pageNumber={pageNumber}
                    handleNav={handleNavArrows}
                />
            </Grid>
            <FilterDialog 
                open={openDialog}
                toggleDialog={handleToggleDialog}
                tags={tagsList}
                selectedTags={selectedTags}
                handleTagSelect={handleTagSelect}
                handleSetFilters={handleSetFilters}
                resetTagSelection={handleResetTagSelection}
            />
            
        </div>
    )
}

export async function getStaticProps({locale}) {

    const data = await getPostsData(locale);
    const tagsResponse = await fetch(`${process.env.host}/wp-json/wp/v2/tags`);
    const tags = await tagsResponse.json();
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            ...data,
            tags
        }
    };
}