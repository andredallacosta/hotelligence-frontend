export const getTotalBookingValue = (booking) =>
  (
    ((new Date(booking.end_date).getTime() -
      new Date(booking.start_date).getTime()) /
      (1000 * 3600 * 24)) *
      parseFloat(booking.daily_value || 0) +
    parseFloat(booking.extras_value || 0)
  ).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
