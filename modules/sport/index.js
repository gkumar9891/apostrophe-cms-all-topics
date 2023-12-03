module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    name: 'sport'
  },
  fields: {
    add: {
      _galleryItems: {
        label: 'Gallery Items',
        type: 'relationship',
        withType: '@apostrophecms/image',
      }
    }
  }
}