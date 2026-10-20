import { useState, useMemo } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Container, Divider, Group, Stack, Card } from '@mantine/core';

import { SearchBar } from '../components/SearchBar/SearchBar';
import { CityTabs } from '../components/CityTabs/CityTabs';
import { SkillsFilter } from '../components/SkillsFilter/SkillsFilter';

import styles from './VacanciesPage.module.css';

export const VacanciesLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const skillsParam = searchParams.get('skills');

  const skills = useMemo(
    () => (skillsParam ? skillsParam.split(',').filter(Boolean) : []),
    [skillsParam],
  );

  const [newSkill, setNewSkill] = useState('');

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ search: value || null, page: '1' });
  };

  const handleSearch = () => {
    updateParams({ page: '1' });
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill) return;

    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    );

    if (alreadyExists) {
      setNewSkill('');
      return;
    }

    const nextSkills = [...skills, skill];
    updateParams({ skills: nextSkills.join(','), page: '1' });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const nextSkills = skills.filter((skill) => skill !== skillToRemove);
    updateParams({
      skills: nextSkills.length > 0 ? nextSkills.join(',') : null,
      page: '1',
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.topSection}>
        <Container size="xl" className={styles.topContainer}>
          <div className={styles.topContent}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Список вакансий</h1>
              <p className={styles.subtitle}>
                по профессии Frontend-разработчик
              </p>
            </div>

            <div className={styles.searchBlock}>
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </Container>

        <Divider />
      </section>

      <Container size="xl" py="xl">
        <Group align="flex-start" wrap="nowrap" gap="xl">
          <aside style={{ width: 300, flexShrink: 0 }}>
            <Stack gap="md">
              <Card withBorder padding="md" radius="md" bg="white">
                <SkillsFilter
                  skills={skills}
                  newSkill={newSkill}
                  onNewSkillChange={setNewSkill}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
              </Card>
            </Stack>
          </aside>

          <Stack gap="md" style={{ flex: 1, minWidth: 0 }}>
            <CityTabs />

            <Outlet />
          </Stack>
        </Group>
      </Container>
    </main>
  );
};