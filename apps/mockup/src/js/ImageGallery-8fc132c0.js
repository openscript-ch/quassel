import{B as e,c as t}from"./ui.mjs";import{S as i,N as s}from"./navigation-d2e99bbf.js";class l extends e{constructor(){super()}init(e){return this.el=e,this.$el=t(this.el),this.$slides=this.$el.find(".js-ImageGallery--slide"),this.swiper=new i(this.el.querySelector(".swiper"),{modules:[s],navigation:{prevEl:this.el.querySelector(".js-ImageGallery--prev"),nextEl:this.el.querySelector(".js-ImageGallery--next")},grabCursor:!0,rewind:!0,breakpoints:{700:{allowTouchMove:!1,grabCursor:!1,slideToClickedSlide:!0}},slidesPerView:"auto"}),this}sizeItems(){var e;this.$slides.each(((t,i)=>{if(!e){var{height:s}=i.getBoundingClientRect();e=s}var l=i.querySelector(".Image"),{width:r,height:a}=l.getBoundingClientRect(),n=r/a;l.style.width="".concat(e*n,"px")}))}updateCaption(e){var i=t(e).find(".js-ImageGallery--slide-title").text(),s=t(e).find(".js-ImageGallery--slide-text").text(),l=t(e).find(".js-ImageGallery--slide-link").attr("href");this.$title.text(i),this.$text.text(s),this.$link.attr("href",l||"")}}function r(){return new l}export{r as default};