/**
 * Permet de charger un contenu en AJAX et de le placer dans une div spécifique
 * Pour une pagination ajax par exemple
 *
 * ## Exemple :
 *
 * <div class="items" id="items">
 *   @loop
 *      @include('card')
 *   @endloop
 *   <div class="js-ajax-more" data-target="#items"><a href="/page/2">En voir plus</a></div>
 * </div>
 */

const options = {
  selector: '.js-ajax-more',
  loadingClass: 'is-loading'
}

export default function ({ selector, loadingClass } = options) {
  document.addEventListener('click', async function (e) {
    if (!e.target.matches(selector + ' a')) return
    e.preventDefault()

    const link = e.target
    const linkElement = link.parentNode
    const targetSelector = linkElement.dataset.target
    const target = document.querySelector(targetSelector)

    if (target.classList.contains(loadingClass)) return
    target.classList.add(loadingClass)
    try {
      const response = await (await fetch(link.getAttribute('href'))).text()
      const fragment = document.createRange().createContextualFragment(response)
      const content = fragment.querySelector(targetSelector)
      const title = fragment.querySelector('title').innerHTML

      linkElement.insertAdjacentHTML('afterend', content.innerHTML)
      linkElement.parentNode.removeChild(linkElement)
      history.replaceState({}, title, link.getAttribute('href'))
    } catch (e) {
      alert(e)
    }
    target.classList.remove(loadingClass)
  })
}
