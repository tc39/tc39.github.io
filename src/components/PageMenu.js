import React from 'react';

const MenuBtn = ({ link, title }) => (
  <a href={link} className="btn menu-btn">{title}</a>
)

const SubMenu = ({ children }) => (
  <span className="sub-menu">{children}</span>
)

const MenuItem = ({ link, title, children }) => (
  <span className="menu-item">
    <MenuBtn {...{ link, title }}/>
    {children}
  </span>
)

const Menu = ({ children }) => (
  <span className="menu">{children}</span>
)

const PageMenu = () => (
  <section className="page-menu">
    <Menu>
      <MenuItem link="https://github.com/tc39/ecma262#ecmascript" title="Proposals">
        <SubMenu>
          <MenuBtn link="https://github.com/tc39/proposals" title="Active Proposals" />
          <MenuBtn link="https://github.com/tc39/proposals/blob/master/inactive-proposals.md" title="Inactive Proposals" />
          <MenuBtn link="https://github.com/tc39/proposals/blob/master/finished-proposals.md" title="Finished Proposals" />
        </SubMenu>
      </MenuItem>
      <MenuItem link="/guides" title="Guides">
        <SubMenu>
          <MenuBtn link="https://timothygu.me/es-howto/" title="Reading the spec" />
          <MenuBtn link="/guides/first-proposal" title="Making your first Proposal" />
          <MenuBtn link="" title="Implementing a Proposal" />
          <MenuBtn link="" title="Giving meaningful feedback" />
          <MenuBtn link="" title="Running the tests" />
          <MenuBtn link="" title="Joining the TC39 as a member organization" />
          <MenuBtn link="" title="More Guides" />
        </SubMenu>
      </MenuItem>
      <MenuItem link="" title="Process">
        <SubMenu>
          <MenuBtn link="https://tc39.github.io/process-document/" title="Overview" />
        </SubMenu>
      </MenuItem>
      <MenuItem link="" title="Discussion">
        <SubMenu>
          <MenuBtn link="https://github.com/tc39/agendas/blob/master/2018/03.md" title="Upcoming Agenda" />
          <MenuBtn link="https://github.com/tc39/tc39-notes/blob/master/es8/2018-01/jan-25.md" title="Recent Meeting Notes" />
          <MenuBtn link="https://github.com/tc39/" title="Github Directory" />
          <MenuBtn link="https://esdiscuss.org/" title="ES Discuss" />
          <MenuBtn link="/discussion/irc" title="IRC" />
        </SubMenu>
      </MenuItem>
      <MenuItem link="" title="Contributing">
        <SubMenu>
          <MenuBtn link="https://github.com/tc39/proposals/blob/master/CONTRIBUTING.md" title="Proposal Guideline" />
          <MenuBtn link="https://github.com/tc39/test262/blob/master/CONTRIBUTING.md" title="Tests Guideline" />
        </SubMenu>
      </MenuItem>
      <MenuItem link="" title="Resources">
        <SubMenu>
          <MenuBtn link="https://www.ecma-international.org/ecma-262/8.0/index.html" title="Current Spec" />
          <MenuBtn link="https://www.ecma-international.org/publications/standards/Ecma-262-arch.htm" title="Archive" />
          <MenuBtn link="https://ecma-international.org/memento/TC39.htm" title="Programme of Work" />
          <MenuBtn link="http://exploringjs.com/es2016-es2017/ch_tc39-process.html" title="Questions and answers" />
        </SubMenu>
      </MenuItem>
    </Menu>
  </section>
)

export default PageMenu
