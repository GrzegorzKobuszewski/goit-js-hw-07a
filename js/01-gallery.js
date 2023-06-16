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

/* W ten sposób niepotrzebnie zużywamy zasoby pamięci przeglądarki, bo za każdym razem (event click) otwieramy nowe nasłuchiwanie --> wniosek, trzeba je zamknąć! :)
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


// MOJA REFLEKSJA

/*
Zadanie 1 - błędy, refleksje, rozwiązanie

Trochę nad tym siedziałem i mijałem się totalnie ze zrozumieniem tematu, udało się dzięki @George Bakhanovych (mentor) - chociaż pewnie sam przyzna, że mega topornie mi szło :wink:

Opiszę Wam trochę jakie błędy popełniałem, bo może się przydać... a niektóre były totalnym zuuuuuułem, jak oceniam z perspektywy czasu :slightly_smiling_face: 

Samo "postawienie galerii" (część 1 zadania) nie było dużym wyzwaniem, można skorzystać z 3 zadania w poprzedniej pracy domowej, ja dałem coś takiego:

---------------------------------------------------KOD-1a----------------------------------------------------------
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
---------------------------------------------------KONIEC-KODU-1a----------------------------------------------------------

warto zauważyć, że insertAdjacentHTML jest na całej tablicy - tablicy wszystkich zdjęć, kiedyś robiłem to pojedynczo, co niepotrzebnie zużywa zasoby...

można też zrobić tą galerię w inny sposób:

---------------------------------------------------KOD-1b----------------------------------------------------------
import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const newGalleryItems = [];

galleryItems.forEach(e => {
    const galleryItem = document.createElement("div");
    const galleryItemLink = document.createElement("a");
    const galleryItemImage = document.createElement("img");
    
    galleryItem.className = "gallery__item";
    galleryItemLink.className = "gallery__link";
    galleryItemImage.className = "gallery__image";

    galleryItemLink.href = e.original;
    galleryItemImage.src = e.preview;
    galleryItemImage.setAttribute("data-source", e.original);
    galleryItemImage.alt = e.description;
    
    galleryItem.append(galleryItemLink);
    galleryItemLink.append(galleryItemImage);
    newGalleryItems.push(galleryItem);
});

gallery.append(...newGalleryItems);

---------------------------------------------------KONIEC-KODU-1b----------------------------------------------------------

i tutaj nie wiem, które rozwiązanie jest lepsze, optymalniejsze, częściej praktykowane - oba działają, ale sam nie wiem, to pierwsze wydawało mi się bardziej sexy :smile:
tutaj prośba o komentarz mentorów @George Bakhanovych (mentor) @Filip Kamiński (mentor) jak to jest :)


kolejnym krokiem było wykorzystanie biblioteki basicLightbo (część 2 zadania) i poprawne napisanie metod

Generalnie metoda w basicLightbox.create ma dwa argumenty, pierwszym jest wyświetlany obrazek, a drugim obiekt z innymi metodami np. onShow czy onClose i tam dajemy wszystkie które chcemy wykorzystać czyli te dwie o których wspomniałem... mnie trochę zmyliła dokumentacja i na początku myślałem, że każda metoda, ma być kolejnym argumentem-obiektem, zmyliła, albo źle zrozumiałem, chociaż przykładu nie było z 3 argumentami, więc to była moja nadinterpretacja...

więc, wniosek jest jeden... dajemy 2 argumenty...

pierwszym jest kliknięty obrazek natomiast drugim obiekt z dodatkowymi metodami - przynajmniej tak to zrozumiałem :slightly_smiling_face:

i normalnie taki kodzik KOD-2a by wystarczył, ale tutaj pojawia się szkopuł... kontynuacja refleksji pod kodem ;)

---------------------------------------------------KOD-2a----------------------------------------------------------
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

});
---------------------------------------------------KONIEC-KODU-2a----------------------------------------------------------

Jak zauważył @George Bakhanovych (mentor) przy każdym odpaleniu obrazka będzie nam się odpalał kolejny Listener... i po kliknięciu 2 raz niepotrzebnie będziemy zużywać zasoby...

WNIOSEK JEST JEDEN ---> trzeba zamknąć to nasłuchiwanie, i myślałem, że takie coś wystarczy:

---------------------------------------------------KOD-2b----------------------------------------------------------
gallery.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") return;

    const handleEscapeKey = e => { if (e.key === "Escape") instance.close() };

const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}">`,
        {
            onShow: () => {
                document.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") instance.close();
                });
            },
            onClose: () => {
                document.removeEventListener("keydown", (e) => {
                    if (e.key === "Escape") instance.close();
                });
            },
        });
    
    instance.show();

});
---------------------------------------------------KONIEC-KODU-2b----------------------------------------------------------

... iiiiii, jak bardzo się MYLIŁEM :slightly_smiling_face:

nie można tak napisać, bo chociaż zapisy: (e) => { if (e.key === "Escape") instance.close() }
który mamy zarówno przy metodzie onShow, jak i onClose chociaż są takie same to DOTYCZĄ DWÓCH RÓZNYCH FUNKCJ... 
i tutaj moja wiedza o referencji została błyskawicznie odświeżona, z moralniakiem jak mogłem o tym zapomnieć trwającym około 2 godzin :rolling_on_the_floor_laughing:

Zatem trzeba było zdefinować 1 funkcję, która będzie mogła być wykorzystana w tych dwóch metodach, 
PO CO? ---> żeby nie marnować zasobów przeglądarki, bo jak napiszemy kod tak jak w 2b, to będzie to miało taki sam skutek jak w 2a

można to sprawdzić w konsoli (chroma) wciskając F12 i wpisując w poleceniu: getEventListeners(document);
polecam sobie przetestować, z każdym kliknięciem tworzy się nowe nasłuchiwanie obciążające pamięć, 

Przykładowo po 3 kliknięciach konsola wyświetli coś takiego:
{keydown: Array(3)}

A MY NIE CHCEMY TAKIEGO DZIAŁANIA, chemy zwolnić pamięć, zaraz po zammknięciu okna modalnego, czyli odpiąć nasłuchiwanie - removeEventListener

.... zatem najlepszą opcją jest stworzenie wcześniej wspomnianej funkcji, ktrą przekażemy jako callback - tak tak, teraz powtórka z modułu 4 się kładnia :wink:

Funkcja ma postać:
const handleEscapeKey = e => { if (e.key === "Escape") instance.close() };

Tylko uwaga, musi być w bloku: gallery.addEventListener (inaczej nie będzie działać)

Zatem ostatecznie powstaje nam coś takiego:

---------------------------------------------------KOD-2c----------------------------------------------------------
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
---------------------------------------------------KONIEC-KODU-2c----------------------------------------------------------

Zatem ostatecznym rozwiązaniem, które będzie śmigać jak należy jest połączenie kodu 1a (opcjonalnie 1b) z kodem 2c :wink:

oczywiście drobniejszych i nieco większych błędów popełniłem znacznie więcej, żeby w pełni dojść do ostatecznego rozwiązania, ale nie chce Was zanudzać...
opisałem najważniejsze błędy, które totalnie wykrzaczały mi pełne zrozumienie tego zadania i progam - ale głónie to pierwsze :wink:

bardzo, ale to bardzo chciałem zrozumieć praktyczność zastosowania zdejmowania nasłuchiwania, czy też odpinania nasłuchiwania zdarzeń (removeEventListener) i chyba się udało :)

ogromne dzięki za cierpliwość @George Bakhanovych (mentor), jak dziś czytam naszą konwersację to niektórych pytań się wstydzę :p

no i chyba tyle, mam nadzieję, że Komuś z Was pomogą te moje refleksje, albo w zrozumieniu, albo w wykonaniu zadania - a najlepiej w obu :slightly_smiling_face:

Dajcie znać czy też mieliście jakieś trudności?

*/

