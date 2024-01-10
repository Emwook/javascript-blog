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
  /* get sidebar section selectors */
  let sidebarLeftSelector = document.querySelector('.left');
  let sidebarRightSelector = document.querySelector('.right');

  /* select an article with class active*/
  let activeArticle = document.querySelector('.posts article.active');

  /* get active article height */
  let activeArticleHeight = activeArticle.clientHeight;
  activeArticleHeight = activeArticleHeight + 15;

  /* make a selector for the posts section */
  let postsSectionSelector = document.querySelector('.posts');
  postsSectionSelector.style.height = activeArticleHeight + 'px';

  /* get posts section height and make a selector for the list in the left sidebar */
  let postsSectionHeight = postsSectionSelector.clientHeight;
  let sidebarLeftList = document.querySelector('.left ul');
  /* change layout based on the width of viewport*/
  console.log(postsSectionHeight);
  if (window.innerWidth > 932){
    sidebarLeftSelector.style.height = postsSectionHeight + 2 + 'px';
    sidebarRightSelector.style.height = postsSectionHeight + 2 + 'px';
    if(postsSectionHeight > 450){
      sidebarRightSelector.style.display = 'flex';
      sidebarRightSelector.style.flexDirection = 'column';
      sidebarRightSelector.firstElementChild.style.marginRight = 'auto';
      sidebarLeftList.style.columns = '1';
    }
    else {
      sidebarRightSelector.style.display = 'flex';
      sidebarRightSelector.style.flexDirection = 'row';
      sidebarRightSelector.firstElementChild.style.marginRight = '14px';
      sidebarLeftList.style.columns = '2';
    }
  }
  else{
    sidebarRightSelector.firstElementChild.style.marginRight = 'auto';
    sidebarRightSelector.style.textAlign = 'center';
  }
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
}

generateTitleLinks();