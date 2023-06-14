import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector("ul.gallery");

const galleryImages = galleryItems
    .map(image => 
        `<li class = "gallery__item">
            <a class = "gallery__link" href = "${image.original}">
                <img class = "gallery__image" src = "${image.preview}" alt = "${image.description}" data-alt = "${ image.description } &#8212 ${ image.original }" />
            </a>
        </li>`)
    .join("");

gallery.insertAdjacentHTML("beforeend", galleryImages);
console.log(gallery);

new SimpleLightbox(".gallery a", {
    animationSpeed: 500,
    captionsData: "data-alt",
    captionDelay: 250,
    download: "If you want download this picture please click here...",
    doubleTapZoom: 4,
    maxZoom: 20,
    scrollZoomFactor: 0.1,
});


