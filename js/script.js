'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');   

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}   

function resizePostWindow(){
  /* get sidebar left section selector */
  let sidebarLeft = document.querySelector('.left');

  /* read sidebar left height*/
  let sidebarLeftHeight = sidebarLeft.clientHeight;
  let sidebarLeftSelector = document.querySelector('.left');
  let sidebarRightSelector = document.querySelector('.right');


  /* select an article with class active*/
  let activeArticle = document.querySelector('.posts article.active');

  /* get active article height and add 15px as a bottom margin*/
  let activeArticleHeight = activeArticle.clientHeight;
  activeArticleHeight = activeArticleHeight + 15;

  /* make a selector for the posts section */
  let postsSectionSelector = document.querySelector('.posts');
  let postsSectionHeight = postsSectionSelector.style.height;
  //console.log(sidebarLeftHeight);

  /* [BUGGED] set active article height to sidebar height if the center section in layout type 1-1-1 is shorter than sidebars*/
  /* BUGGED: not reseting back to a shorter window height when switched to a taller window by an article setting; dead space leftover */
  console.log(activeArticleHeight);
  console.log(postsSectionHeight);
  if (window.innerWidth > 932){
    if (activeArticleHeight < postsSectionHeight){
      activeArticleHeight = postsSectionHeight;
    }
    else{
      let postsSectionHeightChanger = postsSectionSelector.style.height;
      // still doesnt reset back :(
      postsSectionHeightChanger = activeArticleHeight + 'px';
      if (activeArticleHeight < sidebarLeftHeight){
        activeArticleHeight = sidebarLeftHeight + 2;
      }
      else {
        sidebarLeftSelector.style.height = activeArticleHeight + 'px';
        sidebarRightSelector.style.height = activeArticleHeight + 'px';
      }
    }
  }

  /* set posts section height to equal active article height */
  //let postsSectionHeightChanger = postsSectionSelector.style.height = activeArticleHeight + 'px';
}
resizePostWindow();

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';

  /* for each article */
  let articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    link.addEventListener('click', resizePostWindow);
  }
  window.addEventListener('resize',resizePostWindow);
  resizePostWindow();
}

generateTitleLinks();