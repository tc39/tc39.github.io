import React from 'react'
// import Link from 'gatsby-link'
import logo from '../TC39.svg'

const IndexPage = ({ content }) => (
  <div>
    <section className="main">
      <section className="page-header">
        <img src={logo} />
      </section>
      <span className="project-tagline">
        <h2>Specifying ECMAScript.</h2>
      </span>
      <section className="side-info">
        <span className="basic-info">
          <h3>Who?</h3>
          <p>
            The specification is standardized by the TC39 (Technical committee
            39) of ECMA (European Computer Manufacturers Association). You can
            read our{' '}
            <a href="https://ecma-international.org/memento/TC39.htm#Scope">
              the scope of our work here
            </a>
          </p>
        </span>
        <span className="basic-info">
          <h3>How?</h3>
          <p>
            We have a{' '}
            <a href="https://tc39.github.io/process-document/">
              four stage process
            </a>{' '}
            with a rolling release schedule with a new specification published
            every year.
          </p>{' '}
          <p>
            Proposals move through stages at TC39 meetings, which are held every{' '}
            <a href="https://github.com/tc39/agendas/">two months</a>, and the{' '}
            <a href="https://github.com/tc39/tc39-notes/">Notes</a> are made
            public.
          </p>
        </span>
        <span className="basic-info">
          <h3>Want to get involved?</h3>
          <p>
            There are many opportunities to get involved on an individual level.
            Check out our
            <a href="https://github.com/tc39/proposals/blob/master/CONTRIBUTING.md">
              Contributor Documentation
            </a>{' '}
            and our guides to learn more. To get involved with the committee on
            an organizational level, read our
            <a href="https://ecma-international.org/memento/TC39-M.htm">
              Joining the TC39
            </a>{' '}
            documentation.
          </p>
        </span>
      </section>
      <section className="main-content">{content}</section>
      <section className="footer">
        <span className="footer-item">
          <a
            href="https://github.com/tc39/ecma262#ecmascript"
            className="btn menu-btn"
          >
            Proposals
          </a>
        </span>
      </section>
    </section>
  </div>
)

export default IndexPage
