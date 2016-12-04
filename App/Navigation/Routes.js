import { Transitions } from '../Themes/';

// I18n

export default new class Routes {

  // Here are the "Containers" in our app (e.g. Screens).
  //
  // These routes are implemented as getter functions
  // because I like the simple calling notation, but
  // they're lazily evaluated to prevent recursion
  // when the screens themselves use this Routes file.

  get AppView() {
    return {
      title: 'Expenso',
      component: require('../Containers/App').default,
      leftButton: 'HAMBURGER',
    };
  }

  get AddForm() {
    return {
      title: 'Add transaction',
      component: require('../Containers/AddForm').default,
      leftButton: 'BACK',
      params: {
        isExpense: false,
      },
      customConfiguration: Transitions.fadeIn,
    };
  }

  get LoginScreen() {
    return {
      title: 'Login',
      component: require('../Containers/LoginForm').default,
      leftButton: '',
      customConfiguration: Transitions.fadeIn,
    };
  }

  get TransactionDetail() {
    return {
      title: 'Transaction detail',
      component: require('../Containers/TransactionDetail').default,
      leftButton: 'BACK',
      params: {
        id: null,
      },
    };
  }

}();
