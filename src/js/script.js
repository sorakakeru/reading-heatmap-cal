/**
 * reading-heatmap-cal
 * https://github.com/sorakakeru/reading-heatmap-cal
 * 
 * Copyright (c) 2026 Yamatsu
 * Released under the MIT license
 * https://github.com/sorakakeru/reading-heatmap-cal/blob/main/LICENSE
 */

/**
 * Cal-Heatmap
 * @see https://cal-heatmap.com
 */

const logfile = 'log.json';

const nowDate = new Date();
const nowDateYmd = `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-01`;
const oneYearAgoDate = new Date(`${nowDateYmd}T00:00:00`);
oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1);
oneYearAgoDate.setMonth(oneYearAgoDate.getMonth() + 3);
const nowDateYmdOneYearAgo = `${oneYearAgoDate.getFullYear()}-${String(oneYearAgoDate.getMonth() + 1).padStart(2, '0')}-01`;

//Cal-Heatmapオプション
const calOptions = {
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
    type: 'ghDay',
    width: 14,
    height: 14,
    radius: 2,
    label: null
  },
  date: {
    start: nowDateYmdOneYearAgo
  },
  data: {
    source: logfile,
    x: 'date',
    y: 'count'
  },
  scale: {
    color: {
      scheme: 'Greens',
      type: 'linear',
      domain: [0, 100]
    }
  }
};

const calTooltip = [
  [Tooltip, {
    enabled: true,
    text: (_, value, dayjsDate) => {
      return `${value ?? 0}ページ ${dayjs(dayjsDate).format('YYYY/MM/DD')}`;
    }
  }]
];

const calContainer = document.getElementById('cal-heatmap');

const renderCalHeatmap = () => {
  calContainer.replaceChildren();

  const cal = new CalHeatmap();
  const nextCalOptions = {
    ...calOptions,
    itemSelector: calContainer,
    data: {
      ...calOptions.data,
      source: `${logfile}?t=${Date.now()}`
    }
  };

  cal.paint(nextCalOptions, calTooltip);
};

renderCalHeatmap();


/**
 * フォーム送信処理
 */

const bindFormSubmit = () => {
  const form = document.querySelector('.form_area form');

  if (!form || form.getAttribute('id') !== 'dataForm') {
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentForm = e.currentTarget;

    //error&success文言削除
    document.querySelectorAll('.msg').forEach(function(txt) { txt.remove() })

    //バリデーションチェック
    const dd = currentForm.querySelector('dd');
    const inputText = dd.querySelector('input').value.trim();
    if (inputText.length === 0) {
      dd.insertAdjacentHTML('afterbegin', `<p class="msg error">入力必須項目です</p>`);
    }

    const num = Number(inputText);
    if (inputText.length > 0 && (Number.isNaN(num) || !Number.isInteger(num))) {
      dd.insertAdjacentHTML('afterbegin', `<p class="msg error">整数値を入力してください</p>`);
    }

    //フォームデータ送信
    const errText = document.querySelectorAll('.msg.error');
    if (errText.length !== 0) {
      return;
    }

    const formData = new FormData(currentForm);
    if (e.submitter?.name) {
      formData.append(e.submitter.name, e.submitter.value ?? '1');
    }

    const response = await fetch(currentForm.action || window.location.href, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('数値の送信に失敗しました');
      return;
    }

    const responseHtml = await response.text();
    const parser = new DOMParser();
    const nextDocument = parser.parseFromString(responseHtml, 'text/html');
    const currentFormArea = document.querySelector('.form_area');
    const nextFormArea = nextDocument.querySelector('.form_area');

    if (!currentFormArea || !nextFormArea) {
      alert('送信結果の反映に失敗しました');
      return;
    }

    currentFormArea.innerHTML = nextFormArea.innerHTML;

    if (nextFormArea.querySelector('.msg.success')) {
      renderCalHeatmap();
    }

    bindFormSubmit();
  });
};

bindFormSubmit();
