function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},a={},t=r.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in a){var r=a[e];delete a[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){a[e]=r},r.parcelRequired7c6=t);var l=t("iQIUW"),n=t("arR5w"),i=t("fZKcF");const s={searchQuery:document.querySelector('input[name="searchQuery"]'),searchForm:document.querySelector(".search-form"),list:document.querySelector(".gallery"),butLoadMore:document.querySelector(".load-more")};let d=0,c=s.searchQuery.value;function u(e){return e.map((({webformatURL:e,largeImageURL:r,tags:o,likes:a,views:t,comments:l,downloads:n})=>`<div class="photo-card">\n       <div class="img_block">\n    <a class="gallery_link" href =${r}><img class="gallery_image" src=${e} alt=${o} loading="lazy" /></a></div>\n    <ul class="info">\n      <li class="info-item">\n        Likes<p>${a}</p>\n      </li>\n      <li class="info-item">\n        Views<p>${t}</p>\n        </li>\n        <li class="info-item">\n        Comments<p>${l}</p>\n        </li>\n      <li class="info-item">\n        Downloads<p>${n}</p>\n        </li>\n        </ul>\n  </div>`)).join("")}function f(){s.butLoadMore.classList.replace("load-more","load-more-hidden"),l.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}s.butLoadMore.classList.replace("load-more","load-more-hidden"),s.searchForm.addEventListener("submit",(async function(r){r.preventDefault(),s.list.innerHTML="",d=1,c=s.searchQuery.value,(0,n.fetchSearch)(c,d,40).then((r=>{let o=r.totalHits/40;r.hits.length>0?(l.Notify.success(`Hooray! We found ${r.totalHits} images.`),s.list.insertAdjacentHTML("beforeend",u(r.hits)),new(e(i))(".gallery a"),s.butLoadMore.classList.replace("load-more-hidden","load-more"),d<o?s.butLoadMore.classList.replace("load-more-hidden","load-more"):(s.butLoadMore.classList.replace("load-more","load-more-hidden"),l.Notify.info("We're sorry, but you've reached the end of search results."))):(l.Notify.failure("Sorry, there are no images matching your search query. Please try again."),s.list.innerHTML="")})).catch(f)})),s.butLoadMore.addEventListener("click",(function(){c=s.searchQuery.value,d+=1,(0,n.fetchSearch)(c,d,40).then((r=>{s.list.insertAdjacentHTML("beforeend",u(r.hits));new(e(i))(".gallery a");let o=r.totalHits/40;d>=o&&(s.butLoadMore.classList.replace("load-more","load-more-hidden"),l.Notify.info("We're sorry, but you've reached the end of search results."))}))}));
//# sourceMappingURL=load-more.31321357.js.map