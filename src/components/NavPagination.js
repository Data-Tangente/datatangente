import React from 'react';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

export const PaginationNav = (props) => {
    const { t } = useTranslation();
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
            <span className="page-nav total-page">{t('posts.of') + " " + props.pageNumber}</span>
        </div>
    )
}