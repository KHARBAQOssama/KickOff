export const formatDateTime = (dateTimeStr) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dateObj = new Date(dateTimeStr);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const month = months[monthIndex];
  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);

  const formattedDate = `${day} ${month}`;
  const formattedTime = `${hours}:${minutes}`;

  return [formattedDate, formattedTime];
};

export const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);

  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
};

export const  isArray =(value) =>{
  return typeof value === "object" && value.length !== undefined;
}