(function(angular) {
  'use strict';

  angular.module('linagora.esn.contact')
    .directive('contactListCard', contactListCard);

  function contactListCard(
    contactService,
    ContactShellDisplayBuilder,
    CONTACT_AVATAR_SIZE
  ) {
    return {
      restrict: 'E',
      templateUrl: '/contact/app/contact/list/contact-list-card.html',
      scope: {
        contact: '='
      },
      controller: 'contactItemController',
      link: {
        pre: function(scope) {
          contactService.setContactMainEmail(scope.contact);
          scope.displayShell = ContactShellDisplayBuilder.build(scope.contact);
          scope.avatarSize = CONTACT_AVATAR_SIZE.cards;
        }
      }
    };
  }
})(angular);
