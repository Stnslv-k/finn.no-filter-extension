const fceCurencyData = 'FCECD'
let date = new Date()
const update_after_days = 14

const getCurrency = async () => {
  const response = await fetch(
    'https://api.currencyapi.com/v3/latest?apikey=&currencies=USD&base_currency=NOK'
  )
  const currency_data = await response.json()

  let next_update = new Date(
    date.setDate(date.getDate() + update_after_days)
  ).toISOString()

  localStorage.setItem(
    fceCurencyData,
    JSON.stringify({
      crncy: currency_data.data.USD.value,
      date: currency_data.meta.last_updated_at,
      set_date: date.toISOString(),
      next_update: next_update,
    })
  )
}

let fcecd_data = JSON.parse(localStorage.getItem(fceCurencyData))
if (!fcecd_data || fcecd_data.next_update == date.toISOString()) {
  let currency_data = getCurrency()
}

let htmlPriceBlockClasses =
  '.mb-8.flex.justify-between.whitespace-nowrap.font-bold'

document.querySelectorAll(htmlPriceBlockClasses).forEach((el) => {
  let priceBlock = el.getElementsByTagName('span')[2]
  if (priceBlock.textContent != 'Solgt') {
    priceBlock.style.position = 'relative'

    let price = priceBlock.textContent.match(/\d/g).join('')
    let newPrice = Math.floor(price * fcecd_data.crncy)
    priceBlock.insertAdjacentHTML(
      'beforeend',
      ' <strong style="position:absolute; top:16px; left:0; color:red;">~ ' +
        newPrice.toLocaleString('en-US') +
        '<strong/> $'
    )
  }
})
