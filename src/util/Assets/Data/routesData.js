import Event from "../Icon/event.png";
import Room from "../Icon/room.png";
import Dashboard from "../Icon/dashobard.png";
import Worker from "../Icon/workers.png";
import Booking from "../Icon/booking.png";

export const routeData = [
  {
    id: 0,
    name: "Dashboard",
    route: "/",
    subRoutes: ["/"],
    img: Dashboard,
  },
  {
    id: 1,
    name: "Event",
    route: "/eventList",
    subRoutes: ["/eventList", "/addEvent"],
    img: Event,
  },
  {
    id: 2,
    name: "Rooms",
    route: "/room",
    subRoutes: ["/room", "/addRoom", "/viewBooking"],
    img: Room,
  },
  {
    id: 3,
    name: "Room Booking",
    route: "/roomBooking",
    subRoutes: ["/roomBooking"],
    img: Booking,
  },
  {
    id: 4,
    name: "Labour",
    route: "/labour",
    subRoutes: ["/labour", "/addLabour", "/attendenceView"],
    img: Worker,
  },
];
