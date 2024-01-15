'use strict';

/* [ Articles section  */
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
/* [ Articles section  */

/* (Additional functions */
function resizePostWindow(){
  /* get sidebar section selectors */
  let sidebarLeftSelector = document.querySelector('.left');
  let sidebarRightSelector = document.querySelector('.right');

  /* select an article with class active*/
  let activeArticle = document.querySelector('.posts article.active');

  /* get active article height */
  let activeArticleHeight = activeArticle.clientHeight;
  activeArticleHeight = activeArticleHeight + 45;

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
/* Additional functions ) */

/* Selectors */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

/* [ Title Links */
function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ' ';

  /* for each article */
  let articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* and get the title from the title element */

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
}
/* Title Links ] */

/* [ Tags  */
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

    /* START LOOP: for each tag */
    for (let articleTag of splitArticleTagsList){
      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + articleTag + '"><span>' + articleTag + '</span></a></li>';

      /* add generated code to html variable */
      htmlString = htmlString + ' ' + linkHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    articleTagsSection.insertAdjacentHTML('beforeend', htmlString);

    /* END LOOP: for every article: */
  }
}

generateTags();

generateTitleLinks();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* find all tag links with class active */
  let tagList = document.querySelectorAll('.post-tags .active');

  /* START LOOP: for each active tag link */
  for(let tagListElement of tagList){
    /* remove class active */
    tagListElement.classList.remove('active');
  }
  /* END LOOP: for each active tag link */


  /* find all tag links with "href" attribute equal to the "href" constant */
  let tagLinkList = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinkList){
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

/* ( Additional functions */
function resetPostList(){
  /* call list making function without any additional argument */
  generateTitleLinks();
}

function postSectionTitleModifier(booleanValue) {
  /* get the reset button by id */
  let resetButton = document.getElementById('reset-button');
  /* switch between type of view based on boolean value */
  if (booleanValue) {
    document.querySelector('.left h2').textContent = 'Related posts';
    resetButton.style.display='block';
  } else {
    document.querySelector('.left h2').textContent = 'All posts';
    resetButton.style.display='none';
  }
}
/* Additional functions ) */

function addClickListenersToTags(){
  /* get list of tag links and reset button */
  let tagLinkList = document.querySelectorAll('.post-tags a');
  let resetButton = document.getElementById('reset-button');

  /* make a for loop by the tag link list */
  for(let tagLink of tagLinkList){
    tagLink.addEventListener('click',tagClickHandler);
    tagLink.addEventListener('click', function () {postSectionTitleModifier(true);});
  }

  /* add event listeners for the reset button */
  resetButton.addEventListener('click',resetPostList);
  resetButton.addEventListener('click', function () {postSectionTitleModifier(false);});
  
}

addClickListenersToTags();
/* Tags ] */

/* [ Authors */
function generateAuthors(){
  /* find all articles */
  let articleList = document.querySelectorAll('.posts article');

  /* START LOOP: for every article: */
  for (let article of articleList){

    /* find author section */
    let articleAuthorSection = article.querySelector(optArticleAuthorSelector);
    
    /* make html variable with empty string */
    let htmlString = '';

    /* get article author from data-author attribute */
    let articleAuthor = article.getAttribute('data-author');
    let articleAuthorString = article.getAttribute('data-author').replace(' ','-');
    // replace was put as a last change in code

    /* generate HTML of the link */
    let linkHTML = '<a href="#author-' + articleAuthorString + '"><span>' + 'by ' + articleAuthor + '</span></a>';

    /* add generated code to html variable */
    htmlString = htmlString + ' ' + linkHTML;

    /* insert the html string */
    articleAuthorSection.insertAdjacentHTML('beforeend', htmlString);
      
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const authorString = href.replace('#author-','').replace('-',' ');

  /* find all authir links with class active */
  let authorList = document.querySelectorAll('.post-author');

  /* START LOOP: for each active tag link */
  for(let authorListElement of authorList){
    /* remove class active */
    authorListElement.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all author links with "href" attribute equal to the "href" constant */
  let authorLinkList = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each found author link */
  for(let authorLink of authorLinkList){
    /* add class active */
    authorLink.classList.add('active');
  }
  /* END LOOP: for each found author link */

  generateTitleLinks('[data-author="' + authorString + '"]');
}

function addClickListenersToAuthors(){
  let resetButton = document.getElementById('reset-button');
  let authorLinkList = document.querySelectorAll('.post-author a');

  for(let authorLink of authorLinkList){
    authorLink.addEventListener('click', authorClickHandler);
    authorLink.addEventListener('click', function () {postSectionTitleModifier(true);});
  }
  resetButton.addEventListener('click',resetPostList);
  resetButton.addEventListener('click', function () {postSectionTitleModifier(false);});
}

addClickListenersToAuthors();
/* Authors ] */