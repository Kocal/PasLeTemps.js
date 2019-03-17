/**
 * Initialise le carousel [slick](http://kenwheeler.github.io/slick/) sur les éléments qui ont la class js-slider
 *
 * ## Exemple :
 *
 * <div class="mon-slider js-slider" data-arrows data-page=".slick-pages">
 *     @foreach($images as $image)
 *         <img src="{{ $image['url'] }}" alt="">
 *     @endforeach
 * </div>
 */

export default function($ = window.jQuery) {
  $('.js-slider').each(function() {
    let options: JQuerySlickOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: this.dataset.center !== undefined,
      variableWidth: this.dataset.center !== undefined,
      infinite: this.dataset.norepeat === undefined,
      arrows: this.dataset.arrows !== undefined,
      dots: this.dataset.dots !== undefined,
      asNavFor: this.dataset.connect,
      adaptiveHeight: true,
    }

    if (this.dataset.dots && this.dataset.dots !== '') {
      let selector = this.dataset.dots
      options.customPaging = function(slider, i) {
        return slider.$slides.find(selector).get(i).innerHTML
      }
    }

    let $slider = $(this)

    if ($slider.data('page')) {
      let $pager = $slider.parent().find($slider.data('page'))
      $slider.on('init', function(event, slick: JQuerySlick) {
        $pager.html(`<span>0${slick.currentSlide + 1}</span>/0${slick.slideCount}`)
      })
      $slider.on('beforeChange', function(event, slick: JQuerySlick, currentSlide: number, nextSlide: number) {
        $pager.html(`<span>0${nextSlide + 1}</span>/0${slick.slideCount}`)
      })
    }

    $slider.slick(options)
  })
}
