// let head = document.querySelector(".heading").onmouseover = event => {

//   let iterations = 0;

//   const interval = setInterval(() => {
//     event.target.innerText = event.target.innerText.split("")
//       .map((letter, index) => {
//         if (index < iterations) {
//           return event.target.dataset.value[index];
//         }
//         return letters[Math.floor(Math.random() * 26)]
//       })
//       .join("")

//     if (iterations >= event.target.dataset.value.length) {
//       clearInterval(interval)
//     }

//     iterations+= 1/2;

//   }, 30)

// }

// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// <div data-value="HELLOGAMER" class="heading spin slide">
//   HELLOGAMER
// </div>

const blob = document.getElementById("blob");

document.body.onpointermove = event => {
  const { clientX, clientY } = event;
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" })
}
