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

const handleEscapeKey = e => { if (e.key === "Escape") instance.close() };

gallery.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") return;

    const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}">`,
        {
            onShow: (instance) => {
                document.addEventListener("keydown", handleEscapeKey(e, instance));
            },
            onClose: (instance) => {
                document.removeEventListener("keydown", handleEscapeKey(e, instance));
            },

        });
    
    instance.show();

});

// getEventListeners(document);
