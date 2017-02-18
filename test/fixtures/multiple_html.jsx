import React from 'react';
import HtmlWrapper from './html_wrapper.jsx';

const Main = () => (
  <div className="main">
    <span>
      Main page
    </span>
  </div>
);

const About = () => (
  <div className="about">
    <span>
      About page
    </span>
  </div>
);

const Contacts = () => (
  <div className="contacts">
    <span>
      Contacts page
    </span>
  </div>
);

const PageMain = () => (
  <HtmlWrapper>
    <Main />
  </HtmlWrapper>
);

const PageAbout = () => (
  <HtmlWrapper>
    <About />
  </HtmlWrapper>
);

const PageContacts = () => (
  <HtmlWrapper>
    <Contacts />
  </HtmlWrapper>
);

export default {
  main: <PageMain />,
  about: <PageAbout />,
  contacts: <PageContacts />,
};
