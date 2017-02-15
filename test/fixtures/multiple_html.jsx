import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
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

const pageMain = (
  <HtmlWrapper>
    <Main />
  </HtmlWrapper>
);

const pageAbout = (
  <HtmlWrapper>
    <About />
  </HtmlWrapper>
);

const pageContacts = (
  <HtmlWrapper>
    <Contacts />
  </HtmlWrapper>
);

export default {
  main: renderToStaticMarkup(pageMain),
  about: renderToStaticMarkup(pageAbout),
  contacts: renderToStaticMarkup(pageContacts),
};
