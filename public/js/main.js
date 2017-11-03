// const deleteCategoryButton = document.querySelector('.delete-category');
// const deleteArticleButton = document.querySelector('.delete-article');

// console.log(deleteArticleButton)

//   deleteCategoryButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     $target = $(e.target);

//     $.ajax({
//       type: 'DELETE',
//       url: '/delete/category/' + $target.data('cat-id'),
//       success: (response) => {
//         alert('Category Deleted');
//         window.location.href = '/'
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//   });



//   deleteArticleButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     $target = $(e.target);

//     $.ajax({
//       type: 'DELETE',
//       url: '/delete/article/' + $target.data('article-id'),
//       success: (response) => {
//         alert('Article Deleted');
//         window.location.href = '/'
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });
//   }); 



$(document).ready(() => {
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











