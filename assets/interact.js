
(()=>{
 function setText(id,t){const n=document.getElementById(id);if(n)n.textContent=t}
 function press(group,v){document.querySelectorAll('button['+group+']').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute(group)===v)))}
 const responses={
  signal:{remove:'Если сразу удалить 4200 ppm, отчёт станет спокойнее, но возможный важный сигнал исчезнет. Без проверки источника это не доказанная ошибка.',keep:'Сохранить исходное значение необходимо, но без пометки его достоверности вывод тоже будет преждевременным.',review:'Надёжное решение: не менять исходник, обозначить спорный статус и запросить сведения о приборе и соседних измерениях.'},
  join:{yes:'Не обязательно. Если справочник предполагается как «одна аудитория — одна строка», рост строк означает возможную ошибку ключа.',inspect:'Да. При связи многие-к-одному число строк измерений обычно не должно увеличиваться. Проверьте уникальность кода аудитории в справочнике.',dedup:'Удаление после объединения замаскирует ошибочную связь: сначала нужно найти её причину.'},
  purpose:{report:'Для отчёта важнее читаемые названия, единицы измерения, временные интервалы и объяснимые агрегаты. Номер аудитории — идентификатор, не число для усреднения.',similar:'Для поиска похожих состояний нужны численные признаки и обоснованные масштабы. Категории следует кодировать, не выдумывая числовой порядок.',lookup:'Для поиска конкретной аудитории нужен устойчивый идентификатор и правила нормализации алиасов. Масштабировать room_id бессмысленно.'},
  capacity:{high:'28 человек могут заполнять маленькую аудиторию почти полностью, а большой зал — лишь частично. Пока нет знаменателя, вывод не обоснован.',low:'28 человек сами по себе не показывают долю заполнения. Нужна вместимость и контекст времени.',need:'Верно. Доля заполнения = количество присутствующих / вместимость; обе величины должны относиться к одному помещению и моменту.'}
 };
 document.querySelectorAll('[data-choice]').forEach(box=>{
   const k=box.getAttribute('data-choice');box.querySelectorAll('button[data-v]').forEach(btn=>btn.addEventListener('click',()=>{
     box.querySelectorAll('button[data-v]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
     setText(k+'-output',responses[k]?.[btn.getAttribute('data-v')]||'Проверьте решение.');
   }));
 });
 function renderMissing(v){press('data-missing',v);let drop=v==='drop';setText('missing-a',drop?'72':'80');setText('missing-b',drop?'8':'20');setText('missing-output',drop?'Осталось 80 наблюдений. Корпус Б теперь составляет 8/80 = 10% выборки вместо исходных 20%. Пропуски непропорционально исключили корпус Б.':'Всего 100 наблюдений. На корпус Б приходится 20/100 = 20% выборки; пропуски: 8 из 80 в А и 12 из 20 в Б.');let a=document.getElementById('bar-a'),b=document.getElementById('bar-b');if(a)a.style.width=drop?'90%':'100%';if(b)b.style.width=drop?'40%':'100%'}
 document.querySelectorAll('button[data-missing]').forEach(b=>b.onclick=()=>renderMissing(b.getAttribute('data-missing')));
 let mode='raw';const fmt=n=>n.toLocaleString('ru-RU',{maximumFractionDigits:2,minimumFractionDigits:2});
 function renderDist(){const w=Number(document.getElementById('weight-temp')?.value||1);setText('weight-temp-label',w.toFixed(1));const dx=mode==='raw'?Math.hypot((22-21)*w,900-400):Math.hypot(((22-21)/10)*w,(900-400)/1000);const dy=mode==='raw'?Math.hypot((22-28)*w,900-880):Math.hypot(((22-28)/10)*w,(900-880)/1000);setText('dist-x',fmt(dx));setText('dist-y',fmt(dy));setText('distance-output','Ближе '+(dx<dy?'X':'Y')+'. '+(mode==='raw'?'Расстояния рассчитаны в исходных единицах: величина CO₂ преобладает из-за масштаба чисел.':'Признаки приведены к выбранным диапазонам: теперь температура и CO₂ соизмеримы, но вывод зависит от весов.'))}
 document.querySelectorAll('button[data-distance]').forEach(b=>b.onclick=()=>{mode=b.getAttribute('data-distance');press('data-distance',mode);renderDist()});const range=document.getElementById('weight-temp');if(range)range.addEventListener('input',renderDist);
 document.querySelectorAll('button[data-category]').forEach(b=>b.onclick=()=>{const v=b.getAttribute('data-category');press('data-category',v);setText('category-output',v==='onehot'?'Климат → [1,0,0]; оборудование → [0,1,0]; сеть → [0,0,1]. Произвольное числовое соседство исчезло, но появилось три столбца.':'Климат → 1; оборудование → 2; сеть → 3. Порядок кодов назначен произвольно, но может ошибочно влиять на вычисления.')});
})();
