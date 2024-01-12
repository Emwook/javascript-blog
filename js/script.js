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
  if (window.innerWidth > 755){
    sidebarLeftSelector.style.height = postsSectionHeight + 2 + 'px';
    sidebarRightSelector.style.height = postsSectionHeight + 2 + 'px';
    if(postsSectionHeight > 450){
      sidebarRightSelector.classList.remove('right-short');
      sidebarRightSelector.classList.add('right-tall');
      sidebarLeftSelector.classList.remove('left-short');
      sidebarLeftSelector.classList.add('left-tall');
    }
    else {
      sidebarRightSelector.classList.remove('right-tall');
      sidebarRightSelector.classList.add('right-short');
      sidebarLeftSelector.classList.remove('left-tall');
      sidebarLeftSelector.classList.add('left-short');
    }
  }
}
resizePostWindow();

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

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

function generateTags(){
  /* find all articles */

  let articleList = document.querySelectorAll('.posts article');

  /* START LOOP: for every article: */
  for (let article of articleList){

    /* find tags wrapper */
    let articleTagsSection = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let htmlString = '';

    /* get tags from data-tags attribute */
    let articleTagsList = article.getAttribute('data-tags');

    /* split tags into array */
    let splitArticleTagsList = articleTagsList.split(' ');
    console.log(splitArticleTagsList);

    /* START LOOP: for each tag */
    for (let articleTag of splitArticleTagsList){
      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + articleTag + '"><span>' + articleTag + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      htmlString = htmlString + ' ' + linkHTML;

      /* END LOOP: for each tag */
      
    }
    /* insert HTML of all the links into the tags wrapper */
    articleTagsSection.insertAdjacentHTML('beforeend', htmlString);


    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }
}

generateTags();

generateTitleLinks();