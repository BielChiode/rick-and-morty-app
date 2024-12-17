import React, { useState } from 'react';
import {
  TextField,
  CircularProgress,
  List,
  ListItem,
  Typography,
  Container,
  Box,
  Pagination,
  Grid2,
} from '@mui/material';
import AppBarCustom from '../../components/AppBar';
import ButtonPortal from '../../components/ButtonPortal';
import useGetLocations from '../../api/hooks/useGetLocations';

const LocationList: React.FC = () => {
  const { locations, loading, error, setParams, info } = useGetLocations();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleSearch = () => {
    setParams({ name: search });
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    const params = search ? { page: newPage, name: search } : { page: newPage };
    setParams(params);
  };

  return (
    <>
      <AppBarCustom />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Campo de busca */}
        <TextField
          label="Find a location"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <Box
          sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <ButtonPortal onClick={handleSearch}>Search</ButtonPortal>
        </Box>

        <Typography variant="h2" gutterBottom textAlign="center" mb={4}>
          Locations
        </Typography>

        {loading && <CircularProgress />}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <>
            <List>
              {locations.map((location) => (
                <ListItem
                  key={location.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'background-color 0.3s, transform 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'scale(1.02)',
                      borderRadius: '4px',
                      boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Grid2 container sx={{ width: '100%' }}>
                    <Grid2
                      size={{ xs: 12, md: 6 }}
                      sx={{ border: '1px solid white' }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {location.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Type:</strong> {location.type}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Dimension:</strong> {location.dimension}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}></Grid2>
                  </Grid2>
                </ListItem>
              ))}
            </List>

            <Pagination
              count={info?.pages || 1}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                mt: 4,
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                '& .MuiPaginationItem-root': {
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default LocationList;
