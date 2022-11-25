import React from 'react'
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core'

function BookingDivision() {
    const { t } = useTranslation();
    return (
        <div className="button-container max-width--">
            <a target="_blank" className="button-booking" href='https://outlook.office365.com/owa/calendar/DataTangente2@datatangente.com/bookings/s/tmq1G2DB4U-lfVUJFQ5QDw2'><span className="button-booking_bold">{t('home.booking.book')}</span> {t('home.booking.appointment')}</a>
        </div>
    )
}

export default BookingDivision;