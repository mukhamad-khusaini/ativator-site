let containerAnimated = document.querySelector(".containerAnimated");
let animated = document.querySelector(".animated");
let clickedLf = document.querySelector(".clickedLf");
let clickedRg = document.querySelector(".clickedRg");

let pointer = 0;
let dataJson = [
    { competition: "PKM", ach: "Juara 1", time: "20 Juni 2023" },
    { competition: "PKM", ach: "Juara 2", time: "20 Juni 2023" },
    { competition: "PKM", ach: "Juara 3", time: "20 Juni 2023" },
];

window.onload = () => (animated.style.transform = "translateX(0)");
clickedLf.onclick = () => {
    let positionTemp = animated.style.transform;
    if (positionTemp[positionTemp.length - 2] === "x") {
        animated.style.transform = "translateX(0%)";
    }

    let position = animated.style.transform.slice(11, -2);

    if (position != "-46") {
        animated.style.transform = `translateX(${parseInt(position) - 23}%)`;
    }
};

clickedRg.onclick = () => {
    let positionTemp = animated.style.transform;
    if (positionTemp[positionTemp.length - 2] === "x") {
        animated.style.transform = "translateX(0%)";
    }

    let position = animated.style.transform.slice(11, -2);

    if (position != "0") {
        animated.style.transform = `translateX(${parseInt(position) + 23}%)`;
    }
};
