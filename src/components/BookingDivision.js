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
                onClick={() => {
                    window.open(
                        "https://outlook.office365.com/owa/calendar/DataTangente2@datatangente.com/bookings/s/tmq1G2DB4U-lfVUJFQ5QDw2",
                        "_blank"
                    )
                }}
                className="booking-button"
            >
                {t('home.booking.book-appt')}
            </div>
        </div>
    )
}

export default BookingDivision;