(function() {
  angular
      .module('myApp')
      .factory('iconServices', iconServices);

  iconServices.$inject=[];

  function iconServices() {
    return {
      getIcon: function (id) {
        var ico = '';
        switch (id) {
          case 1:
            ico = 'images/documents/pdf.png';
            break;
          case 2:
            ico = 'images/documents/Word.png';
            break;
          case 3:
            ico = 'images/documents/ppt.png';
            break;
          case 4:
            ico = 'images/documents/image.png';
            break;
          case 5:
            ico = 'images/documents/ZIP.png';
            break;
          case 6:
            ico = 'images/documents/video.png';
            break;
          default:
            ico = 'images/documents/all.png';
            break;
        }
        return ico;
      }
    };
  }
})();