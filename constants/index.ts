export const headerLinks = [
  { href: "/", label: "Home" },
  { href: "/events/create", label: "Create Event" },
  { href: "/profile", label: "My Profile" },
];


export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}