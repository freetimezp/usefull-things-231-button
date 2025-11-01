const btn = document.querySelector(".btn");
const background = document.querySelector(".background");

let trailActive = false;
let trailTimer;

var newColor = "rgba(236, 186, 247, 0.2)";

// Floating spark animation around the button
function createSpark() {
    const spark = document.createElement("span");
    spark.classList.add("spark");

    const size = Math.random() * 6 + 4;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${Math.random() * 100}%`;
    spark.style.animationDuration = `${1 + Math.random() * 2}s`;

    btn.appendChild(spark);
    setTimeout(() => spark.remove(), 2500);
}
setInterval(() => {
    if (Math.random() > 0.4) createSpark();
}, 400);

// ------------------------------
// Button click -> shimmer burst + enable trail
// ------------------------------
btn.addEventListener("click", (e) => {
    trailActive = true;

    // Create shimmer burst
    const burst = document.createElement("span");
    burst.classList.add("burst");
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);

    //random color
    const generateRGBA = () => {
        const r = Math.floor(Math.random() * 256); // 0-255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.random().toFixed(2); // 0.00 - 1.00

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    burst.style.setProperty("--color", generateRGBA());

    // Auto-disable trail after 6 seconds
    clearTimeout(trailTimer);
    trailTimer = setTimeout(() => {
        trailActive = false;
    }, 6000);
});

// ------------------------------------
// Mousemove trail (active for 6 sec)
// ------------------------------------
document.body.addEventListener("mousemove", (e) => {
    if (!trailActive) return;

    const trail = document.createElement("span");
    trail.classList.add("trail");

    const size = Math.random() * 12 + 8;
    trail.style.width = `${size}px`;
    trail.style.height = `${size}px`;
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1500);
});
