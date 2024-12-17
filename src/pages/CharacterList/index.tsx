import React, { useState } from 'react';
import {
  TextField,
  CircularProgress,
  List,
  ListItem,
  Typography,
  Container,
  Box,
  Grid2,
  Pagination,
} from '@mui/material';
import useCharacters from '../../api/hooks/useCharacters';
import CharacterCard from './components/CharacterCard';
import AppBarCustom from '../../components/AppBar';
import ButtonPortal from '../../components/ButtonPortal';

const CharacterList: React.FC = () => {
  const { characters, loading, error, setParams, info } = useCharacters();
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
          label="Find a character"
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
          Characters
        </Typography>

        {loading && <CircularProgress />}

        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <>
            <List>
              <Grid2 container spacing={6}>
                {characters.map((character) => (
                  <Grid2 key={character.id} size={{ xs: 12, sm: 4 }}>
                    <ListItem>
                      <CharacterCard character={character} />
                    </ListItem>
                  </Grid2>
                ))}
              </Grid2>
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

export default CharacterList;
