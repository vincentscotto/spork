$(document).ready(() => {

// add class for nav
  $(window).scroll(function() {
     if($(window).scrollTop() >= 100) {
       $('nav').addClass('scrolled');
     }
    else {
      $('nav').removeClass('scrolled');
    }
  });

// delete category
  $('.delete-category').on('click', (e) => {
    $target = $(e.target);
    $.ajax({
      type: 'DELETE',
      url: '/catagories/delete/' + $target.attr('data-cat-id'),
      success: (response) => {
        alert ('Category Deleted');
        window.location.href='/'
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

// delete article
  $('.delete-article').on('click', (e) => {
    $target = $(e.target);
    $.ajax({
      type: 'DELETE',
      url: '/manage/delete/articles/' + $target.attr('data-article-id'),
      success: (response) => {
        alert ('Article Deleted');
        window.location.href='/'
      },
      error: (error) => {
        console.log(error);
      }
    })
  });

});
