import { useNavigate, useParams } from 'react-router';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Avatar,
  CardContent,
  Grid2,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import useCharacterDetails from '../../api/hooks/useCharacterDetails';
import { Circle } from '@mui/icons-material';
import { useIsMobile } from '../../utils/useIsMobile';
import ButtonPortal from '../../components/ButtonPortal';

function CharacterDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacterDetails(id);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useIsMobile();

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
      <ButtonPortal
        sx={{ position: 'absolute', top: 0, left: 0 }}
        onClick={() => navigate('/')}
      >
        Voltar
      </ButtonPortal>
      {character ? (
        <Card
          sx={{
            display: 'flex',
            maxWidth: 700,
            p: 2,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #1f1f1f, #272727)',
            boxShadow: '0px 0px 15px 2px rgba(0, 255, 170, 0.7)',
            border: '1px solid rgba(0, 255, 170, 0.4)',
            overflow: 'hidden',
            margin: 5,
          }}
        >
          <CardContent>
            {/* Avatar do personagem */}
            <Grid2 container spacing={1} alignItems="center">
              <Grid2 size={{ md: 4, xs: 12 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    mr: isMobile ? 0 : 2,
                  }}
                >
                  <Avatar
                    src={character.image}
                    alt={character.name}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      border: '2px solid #ccc',
                      boxShadow: 2,
                    }}
                  />
                </Box>
              </Grid2>

              {/* Informações */}
              <Grid2 size={{ md: 8, xs: 12 }}>
                <Typography
                  textAlign="center"
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: theme.palette.secondary.main,
                    textShadow: `0 0 5px ${theme.palette.secondary.main}, 0 0 10px rgba(0, 255, 170, 0.7)`,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    borderBottom: `2px solid ${theme.palette.secondary.main}`,
                    paddingBottom: '4px',
                  }}
                >
                  {character.name}
                </Typography>
                <Box display="flex" alignItems="center" m={1}>
                  <Circle
                    sx={{
                      fontSize: 18,
                      mr: 1,
                      color: character.status === 'Alive' ? 'green' : 'red',
                    }}
                  />
                  <Typography variant="body1">
                    Status: {character.status}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" m={1}>
                  <PersonIcon color="primary" sx={{ fontSize: 18, mr: 1 }} />
                  <Typography variant="body1">
                    Specie: {character.species}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" m={1}>
                  <WcIcon sx={{ fontSize: 18, mr: 1 }} color="primary" />
                  <Typography variant="body1">
                    Gender: {character.gender}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" m={1}>
                  <LocationOnIcon
                    sx={{ fontSize: 18, mr: 1 }}
                    color="primary"
                  />
                  <Typography variant="body1">
                    Origem: {character.origin?.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" m={1}>
                  <InfoIcon sx={{ fontSize: 18, mr: 1 }} color="primary" />
                  <Typography variant="body1">
                    Localização Atual: {character.location?.name}
                  </Typography>
                </Box>
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
