import { IconUserCircle } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './Header.module.css';

export const Header = () => {
 
  const isVacancies = useMatch('/vacancies/*');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoHh}>hh</span>
        <span className={styles.logoText}>.FrontEnd</span>
      </div>

      <nav className={styles.navigation}>
        <NavLink
          to="/vacancies/moscow"
          className={
            isVacancies ? styles.activeLinkWithDot : styles.link
          }
        >
          <Text size="sm">Вакансии FE</Text>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <IconUserCircle size={22} stroke={1.5} />
          <Text size="sm">Обо мне</Text>
        </NavLink>
      </nav>
    </header>
  );
};