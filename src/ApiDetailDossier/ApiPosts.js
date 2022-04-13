export default function getCase() {
 return (
    fetch('http://localhost:5052/api/Case/'+1)
    .then((response) => response.json()
    )
   )
  };
export function getCategories() {
 return (
    fetch('http://localhost:5052/api/Case/Category')
    .then((response) => response.json()
    )
   )
  };
 export function getStatuts() {
   return (
      fetch('http://localhost:5052/api/Case/Status')
      .then((response) => response.json()
      )
     )
    };
 export function getVote() {
   return (
      fetch('http://localhost:5052/api/Vote')
      .then((response) => response.json()
      )
     )
    };
    export function getResults() {
      return (
         fetch('http://localhost:5052/api/Results')
         .then((response) => response.json()
         )
        )
       };