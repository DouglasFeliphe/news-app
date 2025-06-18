# News App

Aplicativo móvel desenvolvido com React Native e Expo para leitura de notícias.

## Stack Tecnológica

- **Framework:** React Native com Expo
- **Navegação:** React Navigation v7
- **Estilização:** Styled Components
- **Animações:** Moti e React Native Reanimated
- **Gerenciamento de Estado:** React Native Async Storage
- **Componentes UI:**
  - Expo Vector Icons
  - React Native Toast Message
  - React Native Safe Area Context
  - React Native Screens
- **Desenvolvimento:**
  - TypeScript
  - Metro bundler
  - Module resolver para aliases de caminho
  - Suporte a variáveis de ambiente (react-native-dotenv)

## Começando

### Pré-requisitos

- Node.js
- npm
- Expo CLI

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis de ambiente necessárias (veja `.env.example`)

4. Inicie o servidor de desenvolvimento:

```bash
npm start
```

### Desenvolvimento

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Executa no emulador/dispositivo Android
- `npm run ios` - Executa no simulador/dispositivo iOS
- `npm run web` - Executa no navegador

## Estrutura do Projeto

```
news-app/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── theme/         # Configuração e estilos do tema
│   └── types/         # Definições de tipos TypeScript
├── app.json          # Configuração do Expo
├── babel.config.js   # Configuração do Babel
├── tsconfig.json    # Configuração do TypeScript
└── package.json     # Dependências e scripts do projeto
```

## Funcionalidades Principais

- Aliases de caminho configurados (`@/*` resolve para `src/*`)
- Sistema de notificações toast
- Tratamento de safe area
- Sistema de tema personalizado
- Componentes tipados com TypeScript
- Animações suaves com Moti

## Como Contribuir

1. Faça um fork do repositório
2. Crie sua branch de feature
3. Faça seus commits
4. Envie a branch
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT.
