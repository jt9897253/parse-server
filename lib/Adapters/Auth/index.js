"use strict";

var _AdapterLoader = _interopRequireDefault(require("../AdapterLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const apple = require('./apple');

const gcenter = require('./gcenter');

const gpgames = require('./gpgames');

const facebook = require('./facebook');

const instagram = require('./instagram');

const linkedin = require('./linkedin');

const meetup = require('./meetup');

const google = require('./google');

const github = require('./github');

const twitter = require('./twitter');

const spotify = require('./spotify');

const digits = require('./twitter'); // digits tokens are validated by twitter


const janrainengage = require('./janrainengage');

const janraincapture = require('./janraincapture');

const line = require('./line');

const vkontakte = require('./vkontakte');

const qq = require('./qq');

const wechat = require('./wechat');

const weibo = require('./weibo');

const oauth2 = require('./oauth2');

const phantauth = require('./phantauth');

const microsoft = require('./microsoft');

const keycloak = require('./keycloak');

const ldap = require('./ldap');

const anonymous = {
  validateAuthData: () => {
    return Promise.resolve();
  },
  validateAppId: () => {
    return Promise.resolve();
  }
};
const providers = {
  apple,
  gcenter,
  gpgames,
  facebook,
  instagram,
  linkedin,
  meetup,
  google,
  github,
  twitter,
  spotify,
  anonymous,
  digits,
  janrainengage,
  janraincapture,
  line,
  vkontakte,
  qq,
  wechat,
  weibo,
  phantauth,
  microsoft,
  keycloak,
  ldap
};

function authDataValidator(adapter, appIds, options) {
  return function (authData) {
    return adapter.validateAuthData(authData, options).then(() => {
      if (appIds) {
        return adapter.validateAppId(appIds, authData, options);
      }

      return Promise.resolve();
    });
  };
}

function loadAuthAdapter(provider, authOptions) {
  let defaultAdapter = providers[provider];
  const providerOptions = authOptions[provider];

  if (providerOptions && Object.prototype.hasOwnProperty.call(providerOptions, 'oauth2') && providerOptions['oauth2'] === true) {
    defaultAdapter = oauth2;
  }

  if (!defaultAdapter && !providerOptions) {
    return;
  }

  const adapter = Object.assign({}, defaultAdapter);
  const appIds = providerOptions ? providerOptions.appIds : undefined; // Try the configuration methods

  if (providerOptions) {
    const optionalAdapter = (0, _AdapterLoader.default)(providerOptions, undefined, providerOptions);

    if (optionalAdapter) {
      ['validateAuthData', 'validateAppId'].forEach(key => {
        if (optionalAdapter[key]) {
          adapter[key] = optionalAdapter[key];
        }
      });
    }
  } // TODO: create a new module from validateAdapter() in
  // src/Controllers/AdaptableController.js so we can use it here for adapter
  // validation based on the src/Adapters/Auth/AuthAdapter.js expected class
  // signature.


  if (!adapter.validateAuthData || !adapter.validateAppId) {
    return;
  }

  return {
    adapter,
    appIds,
    providerOptions
  };
}

module.exports = function (authOptions = {}, enableAnonymousUsers = true) {
  let _enableAnonymousUsers = enableAnonymousUsers;

  const setEnableAnonymousUsers = function (enable) {
    _enableAnonymousUsers = enable;
  }; // To handle the test cases on configuration


  const getValidatorForProvider = function (provider) {
    if (provider === 'anonymous' && !_enableAnonymousUsers) {
      return;
    }

    const {
      adapter,
      appIds,
      providerOptions
    } = loadAuthAdapter(provider, authOptions);
    return authDataValidator(adapter, appIds, providerOptions);
  };

  return Object.freeze({
    getValidatorForProvider,
    setEnableAnonymousUsers
  });
};

module.exports.loadAuthAdapter = loadAuthAdapter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BZGFwdGVycy9BdXRoL2luZGV4LmpzIl0sIm5hbWVzIjpbImFwcGxlIiwicmVxdWlyZSIsImdjZW50ZXIiLCJncGdhbWVzIiwiZmFjZWJvb2siLCJpbnN0YWdyYW0iLCJsaW5rZWRpbiIsIm1lZXR1cCIsImdvb2dsZSIsImdpdGh1YiIsInR3aXR0ZXIiLCJzcG90aWZ5IiwiZGlnaXRzIiwiamFucmFpbmVuZ2FnZSIsImphbnJhaW5jYXB0dXJlIiwibGluZSIsInZrb250YWt0ZSIsInFxIiwid2VjaGF0Iiwid2VpYm8iLCJvYXV0aDIiLCJwaGFudGF1dGgiLCJtaWNyb3NvZnQiLCJrZXljbG9hayIsImxkYXAiLCJhbm9ueW1vdXMiLCJ2YWxpZGF0ZUF1dGhEYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ2YWxpZGF0ZUFwcElkIiwicHJvdmlkZXJzIiwiYXV0aERhdGFWYWxpZGF0b3IiLCJhZGFwdGVyIiwiYXBwSWRzIiwib3B0aW9ucyIsImF1dGhEYXRhIiwidGhlbiIsImxvYWRBdXRoQWRhcHRlciIsInByb3ZpZGVyIiwiYXV0aE9wdGlvbnMiLCJkZWZhdWx0QWRhcHRlciIsInByb3ZpZGVyT3B0aW9ucyIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImFzc2lnbiIsInVuZGVmaW5lZCIsIm9wdGlvbmFsQWRhcHRlciIsImZvckVhY2giLCJrZXkiLCJtb2R1bGUiLCJleHBvcnRzIiwiZW5hYmxlQW5vbnltb3VzVXNlcnMiLCJfZW5hYmxlQW5vbnltb3VzVXNlcnMiLCJzZXRFbmFibGVBbm9ueW1vdXNVc2VycyIsImVuYWJsZSIsImdldFZhbGlkYXRvckZvclByb3ZpZGVyIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUEsTUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxNQUFNQyxPQUFPLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLE1BQU1FLE9BQU8sR0FBR0YsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O0FBQ0EsTUFBTUcsUUFBUSxHQUFHSCxPQUFPLENBQUMsWUFBRCxDQUF4Qjs7QUFDQSxNQUFNSSxTQUFTLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLE1BQU1LLFFBQVEsR0FBR0wsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsTUFBTU0sTUFBTSxHQUFHTixPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQSxNQUFNTyxNQUFNLEdBQUdQLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLE1BQU1RLE1BQU0sR0FBR1IsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsTUFBTVMsT0FBTyxHQUFHVCxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7QUFDQSxNQUFNVSxPQUFPLEdBQUdWLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUNBLE1BQU1XLE1BQU0sR0FBR1gsT0FBTyxDQUFDLFdBQUQsQ0FBdEIsQyxDQUFxQzs7O0FBQ3JDLE1BQU1ZLGFBQWEsR0FBR1osT0FBTyxDQUFDLGlCQUFELENBQTdCOztBQUNBLE1BQU1hLGNBQWMsR0FBR2IsT0FBTyxDQUFDLGtCQUFELENBQTlCOztBQUNBLE1BQU1jLElBQUksR0FBR2QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsTUFBTWUsU0FBUyxHQUFHZixPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxNQUFNZ0IsRUFBRSxHQUFHaEIsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBQ0EsTUFBTWlCLE1BQU0sR0FBR2pCLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLE1BQU1rQixLQUFLLEdBQUdsQixPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxNQUFNbUIsTUFBTSxHQUFHbkIsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsTUFBTW9CLFNBQVMsR0FBR3BCLE9BQU8sQ0FBQyxhQUFELENBQXpCOztBQUNBLE1BQU1xQixTQUFTLEdBQUdyQixPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxNQUFNc0IsUUFBUSxHQUFHdEIsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBQ0EsTUFBTXVCLElBQUksR0FBR3ZCLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBLE1BQU13QixTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLGdCQUFnQixFQUFFLE1BQU07QUFDdEIsV0FBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRCxHQUhlO0FBSWhCQyxFQUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNuQixXQUFPRixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBTmUsQ0FBbEI7QUFTQSxNQUFNRSxTQUFTLEdBQUc7QUFDaEI5QixFQUFBQSxLQURnQjtBQUVoQkUsRUFBQUEsT0FGZ0I7QUFHaEJDLEVBQUFBLE9BSGdCO0FBSWhCQyxFQUFBQSxRQUpnQjtBQUtoQkMsRUFBQUEsU0FMZ0I7QUFNaEJDLEVBQUFBLFFBTmdCO0FBT2hCQyxFQUFBQSxNQVBnQjtBQVFoQkMsRUFBQUEsTUFSZ0I7QUFTaEJDLEVBQUFBLE1BVGdCO0FBVWhCQyxFQUFBQSxPQVZnQjtBQVdoQkMsRUFBQUEsT0FYZ0I7QUFZaEJjLEVBQUFBLFNBWmdCO0FBYWhCYixFQUFBQSxNQWJnQjtBQWNoQkMsRUFBQUEsYUFkZ0I7QUFlaEJDLEVBQUFBLGNBZmdCO0FBZ0JoQkMsRUFBQUEsSUFoQmdCO0FBaUJoQkMsRUFBQUEsU0FqQmdCO0FBa0JoQkMsRUFBQUEsRUFsQmdCO0FBbUJoQkMsRUFBQUEsTUFuQmdCO0FBb0JoQkMsRUFBQUEsS0FwQmdCO0FBcUJoQkUsRUFBQUEsU0FyQmdCO0FBc0JoQkMsRUFBQUEsU0F0QmdCO0FBdUJoQkMsRUFBQUEsUUF2QmdCO0FBd0JoQkMsRUFBQUE7QUF4QmdCLENBQWxCOztBQTJCQSxTQUFTTyxpQkFBVCxDQUEyQkMsT0FBM0IsRUFBb0NDLE1BQXBDLEVBQTRDQyxPQUE1QyxFQUFxRDtBQUNuRCxTQUFPLFVBQVVDLFFBQVYsRUFBb0I7QUFDekIsV0FBT0gsT0FBTyxDQUFDTixnQkFBUixDQUF5QlMsUUFBekIsRUFBbUNELE9BQW5DLEVBQTRDRSxJQUE1QyxDQUFpRCxNQUFNO0FBQzVELFVBQUlILE1BQUosRUFBWTtBQUNWLGVBQU9ELE9BQU8sQ0FBQ0gsYUFBUixDQUFzQkksTUFBdEIsRUFBOEJFLFFBQTlCLEVBQXdDRCxPQUF4QyxDQUFQO0FBQ0Q7O0FBQ0QsYUFBT1AsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRCxLQUxNLENBQVA7QUFNRCxHQVBEO0FBUUQ7O0FBRUQsU0FBU1MsZUFBVCxDQUF5QkMsUUFBekIsRUFBbUNDLFdBQW5DLEVBQWdEO0FBQzlDLE1BQUlDLGNBQWMsR0FBR1YsU0FBUyxDQUFDUSxRQUFELENBQTlCO0FBQ0EsUUFBTUcsZUFBZSxHQUFHRixXQUFXLENBQUNELFFBQUQsQ0FBbkM7O0FBQ0EsTUFDRUcsZUFBZSxJQUNmQyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ0osZUFBckMsRUFBc0QsUUFBdEQsQ0FEQSxJQUVBQSxlQUFlLENBQUMsUUFBRCxDQUFmLEtBQThCLElBSGhDLEVBSUU7QUFDQUQsSUFBQUEsY0FBYyxHQUFHcEIsTUFBakI7QUFDRDs7QUFFRCxNQUFJLENBQUNvQixjQUFELElBQW1CLENBQUNDLGVBQXhCLEVBQXlDO0FBQ3ZDO0FBQ0Q7O0FBRUQsUUFBTVQsT0FBTyxHQUFHVSxNQUFNLENBQUNJLE1BQVAsQ0FBYyxFQUFkLEVBQWtCTixjQUFsQixDQUFoQjtBQUNBLFFBQU1QLE1BQU0sR0FBR1EsZUFBZSxHQUFHQSxlQUFlLENBQUNSLE1BQW5CLEdBQTRCYyxTQUExRCxDQWhCOEMsQ0FrQjlDOztBQUNBLE1BQUlOLGVBQUosRUFBcUI7QUFDbkIsVUFBTU8sZUFBZSxHQUFHLDRCQUN0QlAsZUFEc0IsRUFFdEJNLFNBRnNCLEVBR3RCTixlQUhzQixDQUF4Qjs7QUFLQSxRQUFJTyxlQUFKLEVBQXFCO0FBQ25CLE9BQUMsa0JBQUQsRUFBcUIsZUFBckIsRUFBc0NDLE9BQXRDLENBQThDQyxHQUFHLElBQUk7QUFDbkQsWUFBSUYsZUFBZSxDQUFDRSxHQUFELENBQW5CLEVBQTBCO0FBQ3hCbEIsVUFBQUEsT0FBTyxDQUFDa0IsR0FBRCxDQUFQLEdBQWVGLGVBQWUsQ0FBQ0UsR0FBRCxDQUE5QjtBQUNEO0FBQ0YsT0FKRDtBQUtEO0FBQ0YsR0FoQzZDLENBa0M5QztBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBSSxDQUFDbEIsT0FBTyxDQUFDTixnQkFBVCxJQUE2QixDQUFDTSxPQUFPLENBQUNILGFBQTFDLEVBQXlEO0FBQ3ZEO0FBQ0Q7O0FBRUQsU0FBTztBQUFFRyxJQUFBQSxPQUFGO0FBQVdDLElBQUFBLE1BQVg7QUFBbUJRLElBQUFBO0FBQW5CLEdBQVA7QUFDRDs7QUFFRFUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVViLFdBQVcsR0FBRyxFQUF4QixFQUE0QmMsb0JBQW9CLEdBQUcsSUFBbkQsRUFBeUQ7QUFDeEUsTUFBSUMscUJBQXFCLEdBQUdELG9CQUE1Qjs7QUFDQSxRQUFNRSx1QkFBdUIsR0FBRyxVQUFVQyxNQUFWLEVBQWtCO0FBQ2hERixJQUFBQSxxQkFBcUIsR0FBR0UsTUFBeEI7QUFDRCxHQUZELENBRndFLENBS3hFOzs7QUFDQSxRQUFNQyx1QkFBdUIsR0FBRyxVQUFVbkIsUUFBVixFQUFvQjtBQUNsRCxRQUFJQSxRQUFRLEtBQUssV0FBYixJQUE0QixDQUFDZ0IscUJBQWpDLEVBQXdEO0FBQ3REO0FBQ0Q7O0FBRUQsVUFBTTtBQUFFdEIsTUFBQUEsT0FBRjtBQUFXQyxNQUFBQSxNQUFYO0FBQW1CUSxNQUFBQTtBQUFuQixRQUF1Q0osZUFBZSxDQUMxREMsUUFEMEQsRUFFMURDLFdBRjBELENBQTVEO0FBS0EsV0FBT1IsaUJBQWlCLENBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFrQlEsZUFBbEIsQ0FBeEI7QUFDRCxHQVhEOztBQWFBLFNBQU9DLE1BQU0sQ0FBQ2dCLE1BQVAsQ0FBYztBQUNuQkQsSUFBQUEsdUJBRG1CO0FBRW5CRixJQUFBQTtBQUZtQixHQUFkLENBQVA7QUFJRCxDQXZCRDs7QUF5QkFKLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlZixlQUFmLEdBQWlDQSxlQUFqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2FkQWRhcHRlciBmcm9tICcuLi9BZGFwdGVyTG9hZGVyJztcblxuY29uc3QgYXBwbGUgPSByZXF1aXJlKCcuL2FwcGxlJyk7XG5jb25zdCBnY2VudGVyID0gcmVxdWlyZSgnLi9nY2VudGVyJyk7XG5jb25zdCBncGdhbWVzID0gcmVxdWlyZSgnLi9ncGdhbWVzJyk7XG5jb25zdCBmYWNlYm9vayA9IHJlcXVpcmUoJy4vZmFjZWJvb2snKTtcbmNvbnN0IGluc3RhZ3JhbSA9IHJlcXVpcmUoJy4vaW5zdGFncmFtJyk7XG5jb25zdCBsaW5rZWRpbiA9IHJlcXVpcmUoJy4vbGlua2VkaW4nKTtcbmNvbnN0IG1lZXR1cCA9IHJlcXVpcmUoJy4vbWVldHVwJyk7XG5jb25zdCBnb29nbGUgPSByZXF1aXJlKCcuL2dvb2dsZScpO1xuY29uc3QgZ2l0aHViID0gcmVxdWlyZSgnLi9naXRodWInKTtcbmNvbnN0IHR3aXR0ZXIgPSByZXF1aXJlKCcuL3R3aXR0ZXInKTtcbmNvbnN0IHNwb3RpZnkgPSByZXF1aXJlKCcuL3Nwb3RpZnknKTtcbmNvbnN0IGRpZ2l0cyA9IHJlcXVpcmUoJy4vdHdpdHRlcicpOyAvLyBkaWdpdHMgdG9rZW5zIGFyZSB2YWxpZGF0ZWQgYnkgdHdpdHRlclxuY29uc3QgamFucmFpbmVuZ2FnZSA9IHJlcXVpcmUoJy4vamFucmFpbmVuZ2FnZScpO1xuY29uc3QgamFucmFpbmNhcHR1cmUgPSByZXF1aXJlKCcuL2phbnJhaW5jYXB0dXJlJyk7XG5jb25zdCBsaW5lID0gcmVxdWlyZSgnLi9saW5lJyk7XG5jb25zdCB2a29udGFrdGUgPSByZXF1aXJlKCcuL3Zrb250YWt0ZScpO1xuY29uc3QgcXEgPSByZXF1aXJlKCcuL3FxJyk7XG5jb25zdCB3ZWNoYXQgPSByZXF1aXJlKCcuL3dlY2hhdCcpO1xuY29uc3Qgd2VpYm8gPSByZXF1aXJlKCcuL3dlaWJvJyk7XG5jb25zdCBvYXV0aDIgPSByZXF1aXJlKCcuL29hdXRoMicpO1xuY29uc3QgcGhhbnRhdXRoID0gcmVxdWlyZSgnLi9waGFudGF1dGgnKTtcbmNvbnN0IG1pY3Jvc29mdCA9IHJlcXVpcmUoJy4vbWljcm9zb2Z0Jyk7XG5jb25zdCBrZXljbG9hayA9IHJlcXVpcmUoJy4va2V5Y2xvYWsnKTtcbmNvbnN0IGxkYXAgPSByZXF1aXJlKCcuL2xkYXAnKTtcblxuY29uc3QgYW5vbnltb3VzID0ge1xuICB2YWxpZGF0ZUF1dGhEYXRhOiAoKSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9LFxuICB2YWxpZGF0ZUFwcElkOiAoKSA9PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9LFxufTtcblxuY29uc3QgcHJvdmlkZXJzID0ge1xuICBhcHBsZSxcbiAgZ2NlbnRlcixcbiAgZ3BnYW1lcyxcbiAgZmFjZWJvb2ssXG4gIGluc3RhZ3JhbSxcbiAgbGlua2VkaW4sXG4gIG1lZXR1cCxcbiAgZ29vZ2xlLFxuICBnaXRodWIsXG4gIHR3aXR0ZXIsXG4gIHNwb3RpZnksXG4gIGFub255bW91cyxcbiAgZGlnaXRzLFxuICBqYW5yYWluZW5nYWdlLFxuICBqYW5yYWluY2FwdHVyZSxcbiAgbGluZSxcbiAgdmtvbnRha3RlLFxuICBxcSxcbiAgd2VjaGF0LFxuICB3ZWlibyxcbiAgcGhhbnRhdXRoLFxuICBtaWNyb3NvZnQsXG4gIGtleWNsb2FrLFxuICBsZGFwLFxufTtcblxuZnVuY3Rpb24gYXV0aERhdGFWYWxpZGF0b3IoYWRhcHRlciwgYXBwSWRzLCBvcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYXV0aERhdGEpIHtcbiAgICByZXR1cm4gYWRhcHRlci52YWxpZGF0ZUF1dGhEYXRhKGF1dGhEYXRhLCBvcHRpb25zKS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChhcHBJZHMpIHtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXIudmFsaWRhdGVBcHBJZChhcHBJZHMsIGF1dGhEYXRhLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbG9hZEF1dGhBZGFwdGVyKHByb3ZpZGVyLCBhdXRoT3B0aW9ucykge1xuICBsZXQgZGVmYXVsdEFkYXB0ZXIgPSBwcm92aWRlcnNbcHJvdmlkZXJdO1xuICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSBhdXRoT3B0aW9uc1twcm92aWRlcl07XG4gIGlmIChcbiAgICBwcm92aWRlck9wdGlvbnMgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvdmlkZXJPcHRpb25zLCAnb2F1dGgyJykgJiZcbiAgICBwcm92aWRlck9wdGlvbnNbJ29hdXRoMiddID09PSB0cnVlXG4gICkge1xuICAgIGRlZmF1bHRBZGFwdGVyID0gb2F1dGgyO1xuICB9XG5cbiAgaWYgKCFkZWZhdWx0QWRhcHRlciAmJiAhcHJvdmlkZXJPcHRpb25zKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRBZGFwdGVyKTtcbiAgY29uc3QgYXBwSWRzID0gcHJvdmlkZXJPcHRpb25zID8gcHJvdmlkZXJPcHRpb25zLmFwcElkcyA6IHVuZGVmaW5lZDtcblxuICAvLyBUcnkgdGhlIGNvbmZpZ3VyYXRpb24gbWV0aG9kc1xuICBpZiAocHJvdmlkZXJPcHRpb25zKSB7XG4gICAgY29uc3Qgb3B0aW9uYWxBZGFwdGVyID0gbG9hZEFkYXB0ZXIoXG4gICAgICBwcm92aWRlck9wdGlvbnMsXG4gICAgICB1bmRlZmluZWQsXG4gICAgICBwcm92aWRlck9wdGlvbnNcbiAgICApO1xuICAgIGlmIChvcHRpb25hbEFkYXB0ZXIpIHtcbiAgICAgIFsndmFsaWRhdGVBdXRoRGF0YScsICd2YWxpZGF0ZUFwcElkJ10uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAob3B0aW9uYWxBZGFwdGVyW2tleV0pIHtcbiAgICAgICAgICBhZGFwdGVyW2tleV0gPSBvcHRpb25hbEFkYXB0ZXJba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogY3JlYXRlIGEgbmV3IG1vZHVsZSBmcm9tIHZhbGlkYXRlQWRhcHRlcigpIGluXG4gIC8vIHNyYy9Db250cm9sbGVycy9BZGFwdGFibGVDb250cm9sbGVyLmpzIHNvIHdlIGNhbiB1c2UgaXQgaGVyZSBmb3IgYWRhcHRlclxuICAvLyB2YWxpZGF0aW9uIGJhc2VkIG9uIHRoZSBzcmMvQWRhcHRlcnMvQXV0aC9BdXRoQWRhcHRlci5qcyBleHBlY3RlZCBjbGFzc1xuICAvLyBzaWduYXR1cmUuXG4gIGlmICghYWRhcHRlci52YWxpZGF0ZUF1dGhEYXRhIHx8ICFhZGFwdGVyLnZhbGlkYXRlQXBwSWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4geyBhZGFwdGVyLCBhcHBJZHMsIHByb3ZpZGVyT3B0aW9ucyB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhdXRoT3B0aW9ucyA9IHt9LCBlbmFibGVBbm9ueW1vdXNVc2VycyA9IHRydWUpIHtcbiAgbGV0IF9lbmFibGVBbm9ueW1vdXNVc2VycyA9IGVuYWJsZUFub255bW91c1VzZXJzO1xuICBjb25zdCBzZXRFbmFibGVBbm9ueW1vdXNVc2VycyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcbiAgICBfZW5hYmxlQW5vbnltb3VzVXNlcnMgPSBlbmFibGU7XG4gIH07XG4gIC8vIFRvIGhhbmRsZSB0aGUgdGVzdCBjYXNlcyBvbiBjb25maWd1cmF0aW9uXG4gIGNvbnN0IGdldFZhbGlkYXRvckZvclByb3ZpZGVyID0gZnVuY3Rpb24gKHByb3ZpZGVyKSB7XG4gICAgaWYgKHByb3ZpZGVyID09PSAnYW5vbnltb3VzJyAmJiAhX2VuYWJsZUFub255bW91c1VzZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBhZGFwdGVyLCBhcHBJZHMsIHByb3ZpZGVyT3B0aW9ucyB9ID0gbG9hZEF1dGhBZGFwdGVyKFxuICAgICAgcHJvdmlkZXIsXG4gICAgICBhdXRoT3B0aW9uc1xuICAgICk7XG5cbiAgICByZXR1cm4gYXV0aERhdGFWYWxpZGF0b3IoYWRhcHRlciwgYXBwSWRzLCBwcm92aWRlck9wdGlvbnMpO1xuICB9O1xuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHtcbiAgICBnZXRWYWxpZGF0b3JGb3JQcm92aWRlcixcbiAgICBzZXRFbmFibGVBbm9ueW1vdXNVc2VycyxcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5sb2FkQXV0aEFkYXB0ZXIgPSBsb2FkQXV0aEFkYXB0ZXI7XG4iXX0=