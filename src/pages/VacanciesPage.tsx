import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useDebouncedValue } from '@mantine/hooks';
import { Stack, Text } from '@mantine/core';

import { JobCard } from '../components/JobCard/JobCard';
import { Pagination } from '../components/Pagination/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchJobs } from '../store/jobsSlice';
import { CITIES } from '../constants/cities';

export const VacanciesPage = () => {
  const { city: citySlug } = useParams<{ city: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const skillsParam = searchParams.get('skills');
  const page = Number(searchParams.get('page')) || 1;

  const skills = useMemo(
    () => (skillsParam ? skillsParam.split(',').filter(Boolean) : []),
    [skillsParam],
  );

  const [debouncedSearch] = useDebouncedValue(search, 500);

  const dispatch = useDispatch<AppDispatch>();

  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.loading);
  const error = useSelector((state: RootState) => state.jobs.error);
  const totalPages = useSelector((state: RootState) => state.jobs.totalPages);

 
  const cityName = citySlug ? CITIES[citySlug] : undefined;

  useEffect(() => {
    if (cityName) {
      dispatch(
        fetchJobs({
          search: debouncedSearch,
          city: cityName,
          skills,
          page,
        }),
      );
    }
  }, [dispatch, debouncedSearch, cityName, skills, page]);

  const handlePageChange = (newPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    setSearchParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  if (citySlug && !cityName) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Stack gap="md">
      {loading && <Text ta="center" py="xl">Загрузка вакансий...</Text>}
      {error && !loading && <Text c="red" ta="center" py="xl">{error}</Text>}
      {!loading && !error && jobs.length === 0 && (
        <Text ta="center" py="xl">Вакансии не найдены</Text>
      )}
      {!loading && !error && jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {!loading && !error && jobs.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  );
};