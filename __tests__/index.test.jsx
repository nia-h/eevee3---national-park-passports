import { render, screen } from 'testing-library/react';
import Home from '../pages/index.tsx';
import '@testing-library/jest-dom';

describe('Home', () => {
  beforeEach(() => {
    render(<Home/>);
  })

  it ('renders a heading', () => {
    const heading = screen.getRole('heading', {
        name: /National Park Digital Passport\.js!/i,
      })
      expect(heading).toBeInTheDocument();
  })

  it ('renders a heading', () => {
    const heading1 = screen.findByRole('heading');
    expect(heading1).toHaveTextContext('National Park Digital Passport');
  })
  
  it ('renders a login button', () => {
    const loginBtn = screen.findByTestId('login-btn');
    expect(loginBtn).toBeInTheDocument();
  })

  it ('renders a signup button', () => {
    const signupBtn = screen.findByTestId('signup-btn');
    expect(signupBtn).toHaveTextContent('Signup');
  });

  //check for logo/pic/icon whatever it is
  //docs: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f 

  //expect both modals to open on click
  //docs: https://testing-library.com/docs/example-react-modal/ 
})