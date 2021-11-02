import React from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const PaginationNav = (props) => {
    const disableLeft = props.currentPage > "1";
    const disableRight = Number(props.currentPage) === Number(props.pageNumber);
    return(
        <div className={props.class} style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                <div className={"page-nav arrow "+(!disableLeft&&"disabled"||"")} onClick={disableLeft && props.handleNav.bind(this, 'prev') || undefined} >
                    <Icon icon={faChevronLeft} />
                </div>
                <div className="page-nav current-page">{props.currentPage}</div>
                <div className={"page-nav arrow "+(disableRight&&"disabled"||"")} onClick={!disableRight && props.handleNav.bind(this, 'next') || undefined}>
                    <Icon  icon={faChevronRight} />
                </div>
            <span className="page-nav total-page">{"de " + props.pageNumber}</span>
        </div>
    )
}