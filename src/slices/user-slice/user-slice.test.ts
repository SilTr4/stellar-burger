import { userSlice, TUserState, loginUser, getUser, updateUser, logout } from './user-slice';
import { registerUser } from './user-slice';

describe('user Slice', () => {
  const initialState: TUserState = {
    isAuthenticated: false,
    name: '',
    email: '',
    isLoading: false,
    error: undefined
  };

  const testUserData = {
    email: 'test@test.ru',
    name: 'user',
    password: '123456'
  };

  const testResponseData = {
    refreshToken: 'token',
    accessToken: 'token',
    user: { email: 'test@test.ru', name: 'user' },
    success: true
  };

  describe('registerUser async action', () => {
    it('set isLoading true, when registerUser pending', () => {
      const actualState = userSlice.reducer(
        initialState,
        registerUser.pending('', testUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('set state with user data and set isLoading false, when registerUser fullfilled', () => {
      const actualState = userSlice.reducer(
        initialState,
        registerUser.fulfilled(testResponseData, '', testUserData)
      );

      expect(actualState).toEqual({
        isLoading: false,
        isAuthenticated: true,
        name: testResponseData.user.name,
        email: testResponseData.user.email
      });
    });

    it('set error, when request crushed', () => {
      const error = new Error('Test error');

      const actualState = userSlice.reducer(
        initialState,
        registerUser.rejected(error, '', testUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });
  });
  /////
  describe('loginUser async action', () => {
    it('set isLoading true, when loginUser pending', () => {
      const actualState = userSlice.reducer(
        initialState,
        loginUser.pending('', testUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('set state with user data and set isLoading false, when loginUser fullfilled', () => {
      const actualState = userSlice.reducer(
        initialState,
        loginUser.fulfilled(testResponseData, '', testUserData)
      );

      expect(actualState).toEqual({
        isLoading: false,
        isAuthenticated: true,
        name: testResponseData.user.name,
        email: testResponseData.user.email
      });
    });

    it('set error, when request crushed', () => {
      const error = new Error('Test error');

      const actualState = userSlice.reducer(
        initialState,
        loginUser.rejected(error, '', testUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });
  });
  /////2
  describe('getUser async action', () => {
    it('set isLoading true, when getUser pending', () => {
      const actualState = userSlice.reducer(initialState, getUser.pending(''));

      expect(actualState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('set state with user data and set isLoading false, when getUser fullfilled', () => {
      const actualState = userSlice.reducer(
        initialState,
        getUser.fulfilled(testResponseData, '')
      );

      expect(actualState).toEqual({
        isLoading: false,
        isAuthenticated: true,
        name: testResponseData.user.name,
        email: testResponseData.user.email
      });
    });

    it('set error, when request crushed', () => {
      const error = new Error('Test error');

      const actualState = userSlice.reducer(
        initialState,
        getUser.rejected(error, '')
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });
  });
  /////3
  describe('updateUser async action', () => {
    it('set isLoading true, when updateUser pending', () => {
      const actualState = userSlice.reducer(
        initialState,
        updateUser.pending('', testUserData)
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('set state with user data and set isLoading false, updateUser loginUser fullfilled', () => {
      const actualState = userSlice.reducer(
        { ...initialState, name: 'notUser' },
        updateUser.fulfilled(testResponseData, '', testUserData)
      );

      expect(actualState).toEqual({
        isLoading: false,
        isAuthenticated: true,
        name: testResponseData.user.name,
        email: testResponseData.user.email
      });
    });

    it('set error, when request crushed', () => {
      const error = new Error('Test error');

      const actualState = userSlice.reducer(
        initialState,
        getUser.rejected(error, '')
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });
  });
  /////4
  describe('logout async action', () => {
    it('set isLoading true, when logout pending', () => {
      const actualState = userSlice.reducer(initialState, logout.pending(''));

      expect(actualState).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('set state with user data and set isLoading false, logout loginUser fullfilled', () => {
      const actualState = userSlice.reducer(
        {
          isAuthenticated: true,
          name: 'user',
          email: 'test@test.ru',
          isLoading: false,
          error: undefined
        },
        logout.fulfilled({ success: true }, '')
      );

      expect(actualState).toEqual({
        isLoading: false,
        isAuthenticated: false,
        name: '',
        email: ''
      });
    });

    it('set error, when request crushed', () => {
      const error = new Error('Test error');

      const actualState = userSlice.reducer(
        initialState,
        getUser.rejected(error, '')
      );

      expect(actualState).toEqual({
        ...initialState,
        isLoading: false,
        error: error.message
      });
    });
  });
});
