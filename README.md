# Rick and Morty Wiki

Uma aplicação **React + TypeScript + Vite** que consome a [API Rick and Morty](https://rickandmortyapi.com/) para listar e detalhar Personagens, Localizações e Episódios.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalacao)
- [Variáveis de Ambiente](#variaveis-de-ambiente)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts](#scripts)
- [Uso](#uso)
- [Contribuição](#contribuicao)
- [Autor](#autor)

## Funcionalidades

- Listagem de personagens com busca e paginação
- Listagem de localizações com avatares dos residentes (cache em memória de imagens)
- Listagem de episódios
- Detalhes de localização com infinite scroll e modal de personagem
- Layout responsivo e estilo futurista (glassmorphism, neon sutil com cores do tema)

## Tecnologias

- React ^18.3.1
- TypeScript ^5.6.2
- Vite ^6.0.1
- Material-UI ^6.2.0
- Axios ^1.7.9
- React Router ^7.0.2
- ESLint ^9.15.0
- @vitejs/plugin-react ^4.3.4

## Pré-requisitos

- Node.js >=16.x
- npm >=8.x

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/BielChiode/rick-and-morty-app.git
   cd rick-and-morty-app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL="https://rickandmortyapi.com/api"
```

## Estrutura de Pastas

```
rick-and-morty-app/
├── public/                  # Arquivos estáticos (index.html, assets, etc.)
├── src/
│   ├── api/                 # Chamadas à API e hooks
│   │   ├── getLocations.ts
│   │   ├── getCharacters.ts
│   │   └── hooks/
│   │       ├── useGetLocations.ts
│   │       └── useGetCharactersByIds.ts
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AppBar.tsx
│   │   └── ButtonPortal.tsx
│   ├── interfaces/          # Tipagens TypeScript (Character, Location, etc.)
│   │   ├── Location.ts
│   │   └── Character.ts
│   ├── pages/               # Páginas principais e rotas
│   │   ├── LocationList/
│   │   ├── LocationDetails/
│   │   ├── CharacterList/
│   │   ├── CharacterDetails/
│   │   └── NotFound/
│   ├── theme/               # Tema MUI personalizado
│   │   └── index.ts
│   ├── utils/               # Hooks utilitários (ex: useIsMobile)
│   │   └── useIsMobile.tsx
│   ├── App.tsx              # Componente raiz com roteamento
│   ├── main.tsx             # Ponto de entrada React + Vite
│   └── vite-env.d.ts        # Types para Vite
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Scripts

- `npm run dev` — Executa em modo de desenvolvimento com HMR
- `npm run build` — Compila para produção
- `npm run preview` — Pré-visualiza a build de produção
- `npm run lint` — Executa ESLint para checagem de código

## Uso

Após instalar e configurar o `.env`, execute:

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Contribuição

Contribuições são bem-vindas! Abra issues ou pull requests.

## Autor

- Biel Chiode — [GitHub](https://github.com/BielChiode)
