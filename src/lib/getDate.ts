const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export function getDate(date: Date): string {
   const day = date.getDate();
   const month = monthArr[date.getMonth()];
   const year = date.getFullYear();

   return `${day} ${month}, ${year}`;
}
