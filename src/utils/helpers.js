export const getTotalBookingValue = (booking) =>
  (
    ((new Date(booking.end_date).getTime() -
      new Date(booking.start_date).getTime()) /
      (1000 * 3600 * 24)) *
    booking.daily_value
  ).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
