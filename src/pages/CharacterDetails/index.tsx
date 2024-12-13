import { useParams } from 'react-router';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Avatar,
  CardContent,
  Grid2,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import WcIcon from '@mui/icons-material/Wc';
import useCharacterDetails from '../../api/hooks/useCharacterDetails';

function CharacterDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacterDetails(id);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">Erro: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {character ? (
        <Card
          sx={{
            display: 'flex',
            maxWidth: 700,
            p: 3,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #1f1f1f, #272727)',
            boxShadow: '0px 0px 15px 2px rgba(0, 255, 170, 0.7)',
            border: '1px solid rgba(0, 255, 170, 0.4)',
            overflow: 'hidden',
          }}
        >
          {/* Avatar do personagem */}
          <Avatar
            src={character.image}
            alt={character.name}
            sx={{
              width: 150,
              height: 150,
              margin: 'auto',
              marginRight: 2,
              border: '2px solid #ccc',
              boxShadow: 2,
            }}
          />
          {/* Informações */}
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: '#00ffaa',
                textShadow: '0 0 8px #00ffaa, 0 0 15px #00ffaa',
              }}
            >
              {character.name}
            </Typography>
            <Grid2 container spacing={1} alignItems="center">
              <Grid2>
                <PetsIcon color="primary" />
              </Grid2>
              <Grid2>
                <Typography variant="body1">
                  Status: {character.status}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={1} alignItems="center">
              <Grid2>
                <PersonIcon color="primary" />
              </Grid2>
              <Grid2>
                <Typography variant="body1">
                  Espécie: {character.species}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={1} alignItems="center">
              <Grid2>
                <WcIcon color="primary" />
              </Grid2>
              <Grid2>
                <Typography variant="body1">
                  Gênero: {character.gender}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={1} alignItems="center">
              <Grid2>
                <LocationOnIcon color="primary" />
              </Grid2>
              <Grid2>
                <Typography variant="body1">
                  Origem: {character.origin?.name}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 container spacing={1} alignItems="center">
              <Grid2>
                <InfoIcon color="primary" />
              </Grid2>
              <Grid2>
                <Typography variant="body1">
                  Localização Atual: {character.location?.name}
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info">Personagem não encontrado</Alert>
      )}
    </Box>
  );
}

export default CharacterDetails;
