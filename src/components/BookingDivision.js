import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core'

function BookingDivision() {
    const { t } = useTranslation();
    return (
        <div className="booking-container max-width--">
            <h1 className="booking-title">
                <span className="booking_bold">{t('home.booking.book')} </span>
                {t('home.booking.appointment')}
            </h1>
            <div
                target="_blank"
                href='https://jeandeleon-datatangente.zohobookings.com/#/customer/datatangente'
                className="booking-button"
            >
                {t('home.booking.book-appt')}
            </div>
        </div>
    )
}

export default BookingDivision;