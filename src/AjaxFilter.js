/**
 * Rend le fonctionnement d'un formulaire en ajax pour un système de filtre produit par exemple
 *
 * ## Exemple :
 *
 * <form class="js-ajax-filter" action="...." data-target="#content">
 *    ....
 * </form>
 * <div id="content">
 *
 * </div>
 */

const options = {
  selector: '.js-ajax-filter',
  loadingClass: 'is-loading'
}

export default function ({ selector, loadingClass } = options) {
  const onSubmit = async function (e) {
    e.preventDefault()
    const form = e.target
    const targetSelector = form.dataset.target

    if (form.classList.contains(loadingClass)) return
    form.classList.add(loadingClass)
    try {
      let action = form.getAttribute('action')
      if (action.startsWith('//')) action = location.protocol + action
      const url = new URL(action)
      const data = new FormData(form)
      const urlParts = url.href.split('#')
      let anchor = null
      if (urlParts.length > 1) {
        anchor = '#' + urlParts[1]
      }
      url.search = new URLSearchParams(data)
      const response = await fetch(url).then(r => r.text())
      const fragment = document.createRange().createContextualFragment(response)
      const content = fragment.querySelector(targetSelector)
      const title = fragment.querySelector('title').innerHTML
      const target = document.querySelector(targetSelector)
      target.parentNode.replaceChild(content, target)
      history.replaceState({}, title, url)
      if (anchor !== null) {
        document.querySelector(anchor).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })
      }
    } catch (e) {
      alert(e)
    }
    form.classList.remove(loadingClass)
  }

  document.querySelectorAll(selector).forEach(form => form.addEventListener('submit', onSubmit))
}
