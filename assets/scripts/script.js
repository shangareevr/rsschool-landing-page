import products from './products.json' with { type: 'json' };
window.addEventListener('DOMContentLoaded', e=> {
  let theme = localStorage.getItem('theme_rsh') ? localStorage.getItem('theme_rsh') : 'base';
  const switchers = document.querySelectorAll('.switcher__item');
  if (switchers.length > 0) {
    switchers.forEach(switcher=> {
      if (theme == 'dark') {
        document.body.classList.add('dark-theme');
        switcher.classList.remove('active');

          if (switcher.classList.contains('switcher__item--dark')) {
            switcher.classList.add('active');
          }
      }
      switcher.addEventListener('click', e=> {
        if (!switcher.classList.contains('active')) {
          const activeSwitcher = document.querySelector('.switcher__item.active');
          activeSwitcher.classList.remove('active');
          switcher.classList.add('active');

          if (switcher.classList.contains('switcher__item--dark')) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme_rsh', 'dark');
          } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme_rsh', 'base');
          }
        }

      })
    })
  }

  openBurger();
  closeBurger();

  createTabs();

  products.forEach(item=>{
    createCarts(item.name, item.img, item.description, item.price, item.category)
  })

  hideTab();
  showTabContent();
  showAll();
  showBtn();

  // openModal
  const carts = document.querySelectorAll('.catalog__items');

  carts.forEach(cart=>{
    cart.addEventListener('click', e=>{
      const name = e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id;
      products.forEach(item=>{
        if(item.name === name){
          createModal(item.img,item.name, item.description, item.sizes, item.additives, item.price);
        }
      })
      document.querySelector('.overlay').classList.add('active');
      document.body.classList.add('no-scroll');
    })
  })

  // close Modal
  window.addEventListener('click',e=>{
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal__close')){
      document.querySelector('.overlay').classList.remove('active');
      document.body.classList.remove('no-scroll');
      const sizeBtns = document.querySelectorAll('.size__btn');
      sizeBtns.forEach(btn=>{
        btn.classList.remove('active');
      })
      sizeBtns[0].classList.add('active');
      const additivesBtns = document.querySelectorAll('.additives__btn');
      additivesBtns.forEach(btn=>{
        btn.classList.remove('active');
      })
    }
  })

  const sizeBtns = document.querySelectorAll('.size__btn');

  sizeBtns.forEach(btn=>{
    btn.addEventListener('click', e=>{
      let addPrice = 0;
      const active = document.querySelector('.size__btn.active');
      let current = +active.value;
      active.classList.remove('active');
      addPrice = +btn.value;
      btn.classList.add('active');
      const price = document.querySelector('.total__price').lastElementChild;
      price.innerText = (+price.innerText - +current + +addPrice).toFixed(2);
    })
  })

  const additivesBtns = document.querySelectorAll('.additives__btn');

  additivesBtns.forEach(btn=>{
    btn.addEventListener('click',e=>{
      const price = document.querySelector('.total__price').lastElementChild;
      if (btn.classList.contains('active')){
        btn.classList.remove('active');
        price.innerText = (+price.innerText - +btn.value).toFixed(2);
      } else{
        btn.classList.add('active');
        price.innerText = (+price.innerText + +btn.value).toFixed(2);
      }

    })
  })
})

function openBurger(){
  const menu = document.querySelector('.header__menu');
  const burger = document.querySelector('.header__burger');
  burger.addEventListener('click',e=>{
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    burger.classList.toggle('active');
  })
}

function closeBurger(){
  window.addEventListener('click',e=>{
    if (e.target.classList.contains('header__wrapper') || e.target.classList.contains('menu__link')) {
      document.querySelector('.header__menu').classList.remove('active');
      document.querySelector('.header__burger').classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  })
}

function createCarts(name,src, description, num, category){
  const itemWrapper = document.createElement('div');
  itemWrapper.className = 'catalog__item';
  itemWrapper.id = name;
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'catalog__img';
  const img = document.createElement('img');
  // указать путь из json
  img.src=src;
  img.alt = name;
  imgWrapper.appendChild(img);
  const wrapperItems = document.querySelectorAll('.catalog__items');
  const info = document.createElement('div');
  info.className = 'catalog__info';
  const title = document.createElement('div');
  title.className = 'info__title';
  title.innerText = name;
  info.append(title);
  const text = document.createElement('div');
  text.className = 'info__text';
  text.innerText = description;
  info.append(text);
  const price = document.createElement('div');
  price.className = 'info__price';
  price.innerText = '$'+num;
  info.append(price);
  itemWrapper.append(imgWrapper)
  itemWrapper.append(info);
  const tabsName = document.querySelectorAll('.tabs__name');
  tabsName.forEach((item, i)=>{
    if (item.innerText.toLowerCase() == category) {
      wrapperItems[i].appendChild(itemWrapper);
    }
  })
}

function createTabs(){
  // получаем все имена табов
  const tabsName = document.querySelectorAll('.tabs__name');
  // получаем обертку
  const list = document.querySelector('.catalog__list');
  for (let i = 0; i < tabsName.length; i++){
    // создаем оберку для элементов и вставляем в глобальную обертку
    const wrapperItems = document.createElement('div');
    wrapperItems.className = 'catalog__items';
    list.appendChild(wrapperItems);
  }
}

function hideTab (){
  const tabs = document.querySelectorAll('.tabs__items'),
        tabsContent = document.querySelectorAll('.catalog__items');
  tabsContent.forEach(item=>{
    item.classList.remove('active');
    tabs.forEach(item=>{
      item.classList.remove('active');
    })
  })
};

function showTabContent(elem = 0){
  const tabs = document.querySelectorAll('.tabs__items'),
        tabsContent = document.querySelectorAll('.catalog__items');
        if (tabs && tabsContent.length > 0) {
          tabsContent[elem].classList.add('active');
          tabs[elem].classList.add('active');
        }
}

const tabs = document.querySelectorAll('.tabs__items'),
    tabsParrent = document.querySelector('.catalog__tabs');
  if (tabsParrent) {
    tabsParrent.addEventListener('click', (e)=>{
      if(e.target && e.target.closest('.tabs__items')){
        tabs.forEach((item, i)=>{
          if( e.target == item || e.target.parentNode == item || e.target.parentNode.parentNode == item){
            hideTab();
            showTabContent(i);
            document.querySelector('.catalog__icon').classList.add('hide');
            document.querySelector('.catalog__list').classList.remove('active');
            showBtn();
          }
        })
      }
    })
  }

  
  function showAll(){
    const btn = document.querySelector('.catalog__icon');
    if (btn) {
      btn.addEventListener('click',e=>{
      document.querySelector('.catalog__icon').classList.add('hide');
      document.querySelector('.catalog__list').classList.add('active');
    })
    }
  }
  
  function showBtn (){
    const active = document.querySelector('.catalog__items.active'),
    btn = document.querySelector('.catalog__icon'),
    list = document.querySelector('.catalog__list');
    if(active && window.innerWidth < 1200 && active.children.length > 4 && !list.classList.contains('active')){
      btn.classList.remove('hide');
    }
  }

window.addEventListener('resize', e=>{
  showBtn();
})

function createModal(img, name, description, sizes, additives, price){
  const icon = document.querySelector('.modal__img');
  icon.firstElementChild.src = img;
  icon.firstElementChild.alt = name;
  const title = document.querySelector('.modal__title');
  title.innerText = name;
  const subtitle = document.querySelector('.modal__subtitle');
  subtitle.innerText = description;
  const small = document.querySelector('.size__btn_small');
  small.value = sizes.s['add-price'];
  small.lastElementChild.innerText = sizes.s.size;
  const medium = document.querySelector('.size__btn_medium');
  medium.value = sizes.m['add-price'];
  medium.lastElementChild.innerText = sizes.m.size;
  const large = document.querySelector('.size__btn_large');
  large.value = sizes.l['add-price'];
  large.lastElementChild.innerText = sizes.l.size;
  const firstAdditives = document.querySelector('.additives__btn_first');
  firstAdditives.value = additives[0]['add-price'];
  firstAdditives.lastElementChild.innerText = additives[0]['name'];
  const secondAdditives = document.querySelector('.additives__btn_second');
  secondAdditives.value = additives[1]['add-price'];
  secondAdditives.lastElementChild.innerText = additives[1]['name'];
  const thirdAdditives = document.querySelector('.additives__btn_third');
  thirdAdditives.value = additives[2]['add-price'];
  thirdAdditives.lastElementChild.innerText = additives[2]['name'];
  const total = document.querySelector('.total__price');
  total.lastElementChild.innerText = price;
}