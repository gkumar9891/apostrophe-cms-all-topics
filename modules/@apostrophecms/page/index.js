// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      {
        name: 'category-page',
        label: 'Category'
      },
      {
        name: 'contact-page',
        label: 'Contact'
      },
      {
        name: 'news-single-page',
        label: 'News Single'
      }
    ]
  }
};
