import{B as e,c as t}from"./ui.mjs";import{S as s,N as i}from"./navigation-d2e99bbf.js";import{A as a,P as r}from"./autoplay-a58ed208.js";function n(e,t){return e.transformEl?t.find(e.transformEl).css({"backface-visibility":"hidden","-webkit-backface-visibility":"hidden"}):t}function o({swiper:e,extendParams:t,on:s}){t({fadeEffect:{crossFade:!1,transformEl:null}});!function(e){const{effect:t,swiper:s,on:i,setTranslate:a,setTransition:r,overwriteParams:n,perspective:o,recreateShadows:l,getEffectParams:d}=e;let h;i("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),o&&o()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),i("setTranslate",(()=>{s.params.effect===t&&a()})),i("setTransition",((e,i)=>{s.params.effect===t&&r(i)})),i("transitionEnd",(()=>{if(s.params.effect===t&&l){if(!d||!d().slideShadows)return;s.slides.each((e=>{s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()})),l()}})),i("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(h=!0),requestAnimationFrame((()=>{h&&s.slides&&s.slides.length&&(a(),h=!1)})))}))}({effect:"fade",swiper:e,on:s,setTranslate:()=>{const{slides:t}=e,s=e.params.fadeEffect;for(let i=0;i<t.length;i+=1){const t=e.slides.eq(i);let a=-t[0].swiperSlideOffset;e.params.virtualTranslate||(a-=e.translate);let r=0;e.isHorizontal()||(r=a,a=0);const o=e.params.fadeEffect.crossFade?Math.max(1-Math.abs(t[0].progress),0):1+Math.min(Math.max(t[0].progress,-1),0);n(s,t).css({opacity:o}).transform(`translate3d(${a}px, ${r}px, 0px)`)}},setTransition:t=>{const{transformEl:s}=e.params.fadeEffect;(s?e.slides.find(s):e.slides).transition(t),function({swiper:e,duration:t,transformEl:s,allSlides:i}){const{slides:a,activeIndex:r,$wrapperEl:n}=e;if(e.params.virtualTranslate&&0!==t){let t,o=!1;t=i?s?a.find(s):a:s?a.eq(r).find(s):a.eq(r),t.transitionEnd((()=>{if(o)return;if(!e||e.destroyed)return;o=!0,e.animating=!1;const t=["webkitTransitionEnd","transitionend"];for(let e=0;e<t.length;e+=1)n.trigger(t[e])}))}}({swiper:e,duration:t,transformEl:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!e.params.cssMode})})}var l={root:null,rootMargin:"50px"},d={autoplay:!1};class h extends e{constructor(){super()}init(e){this.el=e,this.$el=t(this.el),this.options=t.extend({},d,this.$el.data("js-slideshow")),this.$track=this.$el.find(".js-Slideshow--track"),this.$title=this.$el.find(".js-Slideshow--title"),this.$text=this.$el.find(".js-Slideshow--text"),this.$link=this.$el.find(".js-Slideshow--link");var n,h,p,f,c,u=window.innerWidth>700;return this.autoplay="number"==typeof this.options.autoplay?{delay:this.options.autoplay}:this.options.autoplay,this.swiper=new s(this.el.querySelector(".swiper"),{modules:[a,o,i,r],navigation:{prevEl:this.el.querySelector(".js-Slideshow--prev"),nextEl:this.el.querySelector(".js-Slideshow--next")},pagination:{el:this.el.querySelector(".swiper-pagination")},autoplay:this.autoplay,loop:!0,effect:u?"fade":void 0,fadeEffect:u?{crossFade:!0}:void 0,on:{afterInit:e=>{this.$images=this.$el.find(".js-Slideshow--image"),this.sizeItems(),this.updateCaption(e.slides[e.activeIndex])},slideChange:e=>this.updateCaption(e.slides[e.activeIndex])}}),this.on(window,"resize",this.sizeItems),this.one("focusin",this.stopAutoplay),this.one("click",this.stopAutoplay),!1!==this.autoplay&&(this.unobserve=(n=this.el,h=e=>this.setAutoplay(e.isIntersecting),f=function(e){e.forEach((e=>{h(e)}))},(c=p?new IntersectionObserver(f,p):new IntersectionObserver(f,l)).observe(n),function(){c.unobserve(n)})),this}stopAutoplay(){var e,t;this.autoplay=!1,null===(e=this.swiper)||void 0===e||null===(t=e.autoplay)||void 0===t||t.stop(),this.unobserve&&this.unobserve()}setAutoplay(e){var t,s,i,a;e?null===(t=this.swiper)||void 0===t||null===(s=t.autoplay)||void 0===s||s.start():null===(i=this.swiper)||void 0===i||null===(a=i.autoplay)||void 0===a||a.pause()}sizeItems(){this.$images.each(((e,t)=>{t.style.width="",t.style.marginTop=""}));var{width:e,height:t}=this.$track[0].getBoundingClientRect(),s=e/t;this.$images.each(((e,i)=>{var{width:a,height:r}=i.getBoundingClientRect(),n=a/r;if(n>s){var o=t-r;i.style.marginTop="".concat(o/2,"px")}else i.style.width="".concat(t*n,"px")}))}updateCaption(e){var s=t(e).find(".js-Slideshow--slide-title").text(),i=t(e).find(".js-Slideshow--slide-text").text(),a=t(e).find(".js-Slideshow--slide-link").attr("href");this.$title.text(s),this.$text.text(i),this.$link.attr("href",a||"")}destroy(){super.destroy(),this.unobserve()}}function p(){return new h}export{p as default};