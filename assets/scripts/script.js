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