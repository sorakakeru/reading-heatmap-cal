/**
 * Cal-Heatmap
 * @see https://cal-heatmap.com
 */
const cal = new CalHeatmap();
cal.paint(
  {
    itemSelector: document.getElementById('cal-heatmap'),
    domain: {
      type: 'month',
      gutter: 3,
      sort: 'asc',
      label: {
        text: 'YY年M月', 
        textAlign: 'start', 
        position: 'top'
      }
    },
    subDomain: {
      type:'ghDay',
      width:14,
      height:14,
      radius:2,
      label:null
    },
    date: {
      start: new Date('2026-02-01')
    },
    data: {
      source: 'log.json',
      x: 'date',
      y: 'count'
    },
    scale: {
      color: {
        range: ['#ededed', '#eaf4e6', '#dae5cf', '#c8d4b7', '#b7c5a0', '#a6b58a', '#94a676', '#819863', '#6f8b53', '#5b8045', '#44753a'],
        type: 'threshold',
        domain: [1, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700]
      }
    }
  },
  [[Tooltip, {
    enabled: true,
    text: (_, value, dayjsDate) => {
      return `${value ?? 0}ページ ${dayjs(dayjsDate).format('YYYY/MM/DD')}`;
    }
  }]]
);

/**
 * 入力フォームバリデーションチェック
 */
/*
//1行＆複数行テキストエリア
function validateInput(elm, type) {
  const dd = elm.closest('dd')
  const required = dd.previousElementSibling.querySelector('.required')
  const countElm = dd.querySelector('.count span')
  const value = elm.value
  let error = ''

  if (required && value.length === 0) error = '入力必須項目です'

  if (countElm) {
    const maxCount = parseInt(countElm.dataset.maxcount, 10) || parseInt(countElm.textContent, 10)
    if (maxCount && value.length > maxCount) error = '送信できる文字数を超えています'
  }

  if (error) {
    dd.insertAdjacentHTML('beforeend', `<p class="error">${error}</p>`)
    return false
  }
  return true
}

//チェックボックス＆ラジオボタン
function validateChoice(elm, type) {
  const dd = elm.closest('dd')
  const required = dd.previousElementSibling.querySelector('.required')
  const checked = elm.querySelectorAll(`input[type="${type}"]:checked`)
  let error = ''

  if (required && checked.length === 0) {
    error = type === 'radio' ? '1つ選択してください' : '1つ以上選択してください'
    dd.insertAdjacentHTML('beforeend', `<p class="error">${error}</p>`)
    return false
  }
  return true
}

//送信ボタンを押した処理
const form = document.getElementById('enqForm')
form.addEventListener('submit', (e) => {

  //error&success文言削除
  document.querySelectorAll('.form_area p.error').forEach(function(txt) { txt.remove() })
  document.querySelector('.success') && document.querySelector('.success').remove()

  //ラジオボタン
  form.querySelectorAll('dd:has(input[type="radio"])').forEach(elm => {
    if (!validateChoice(elm, 'radio')) e.preventDefault()
  })

  //チェックボックス
  form.querySelectorAll('dd:has(input[type="checkbox"])').forEach(elm => {
    if (!validateChoice(elm, 'checkbox')) e.preventDefault()
  })

  //テキスト（1行）
  form.querySelectorAll('dd input[type="text"]').forEach(elm => {
    if (!validateInput(elm, 'text')) e.preventDefault()
  })

  //テキストエリア（複数行）
  form.querySelectorAll('dd textarea').forEach(elm => {
    if (!validateInput(elm, 'textarea')) e.preventDefault()
  })

})
*/