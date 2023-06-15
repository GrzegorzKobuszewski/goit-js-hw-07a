import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector("ul.gallery");

const galleryImages = galleryItems
    .map(image => 
        `<div class = "gallery__item">
            <a class = "gallery__link" href = "${image.original}">
                <img class = "gallery__image" data-source = "${image.original}" src = "${image.preview}" alt = "${image.description}" />
            </a>
        </div>`)
    .join("");

gallery.insertAdjacentHTML("beforeend", galleryImages);
console.log(gallery);

gallery.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") return;

    const handleEscapeKey = e => { if (e.key === "Escape") instance.close() };

    const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}">`,
        {
            onShow: () => {
                document.addEventListener("keydown", handleEscapeKey);
            },
            onClose: () => {
                document.removeEventListener("keydown", handleEscapeKey);
            },

        });
    
    instance.show();

});

// getEventListeners(document);

/*
gallery.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") return;
    const imageDataSource = e.target.getAttribute("data-source");

    const instance = basicLightbox.create(
        `<img src="${imageDataSource}" width="800" height="600">`,
        {
            onShow: (instance) => {
                document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") instance.close();
                });
            }
        });
    
    instance.show();
*/