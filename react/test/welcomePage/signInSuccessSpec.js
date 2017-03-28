describe('user visits welcome page', () => {
  beforeEach(() => {
    stubGlobalFetch({
      '/api/v1/authorize':  { POST: ['postAuthorizeSuccessResponse', 200] }
    });

    page = mountReactAppAt('/')
  });

  it('can toggle the sign in form', () => {
    expect(page.text()).toMatch('Jesse & David');
    expect(page.text()).not.toMatch('Email');

    clickOn('#sign-in-form', page);
    expect(page.text()).toMatch('Email');
    clickOn('#sign-in-form', page);
    expect(page.text()).not.toMatch('Email');
  });

  it('can sign in and see nav links', done => {
    clickOn('#sign-in-form', page);
    expect(page.text()).toMatch('Email');
    expect(page.text()).toMatch('Password');
    let signInButton = page.find('#sign-in-button');
    expect(signInButton.text()).toMatch('Sign In');

    fillIn('email', { with: 'test@test.com' }, page);
    fillIn('password', { with: 'test-password' }, page);
    simulateIfPresent(signInButton, 'submit');

    setTimeout(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/v1/authorize',
        {
          credentials: 'same-origin',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: {
              email: 'test@test.com',
              password: 'test-password'
            }
          })
        }
      )

      expect(page.text()).not.toMatch('Email');
      expect(page.text()).not.toMatch('Password');
      expect(page.text()).toMatch('Events');
      expect(page.text()).toMatch('Photos');

      clickOn('#sign-out-link', page);
      done();
    }, 0)
  });
});
