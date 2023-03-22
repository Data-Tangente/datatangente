import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";

function BookingDivision() {
  const { t } = useTranslation();
  return (
    <section className="booking-container">
      <h1 className="booking-title">
        <span className="booking_bold">{t("home.booking.book")} </span>
        {t("home.booking.appointment")}
      </h1>
      <a
        target="_blank"
        href="https://outlook.office365.com/owa/calendar/DataTangente3@jeandeleon.com/bookings/"
        className="booking-button">
        {t("home.booking.book-appt")}
      </a>
    </section>
  );
}

export default BookingDivision;
