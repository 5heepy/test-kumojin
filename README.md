# Test technique Solutions Kumojin

Seulement besoin de docker-compose pour rouler l'application.

```bash
docker-compose up
```

####Tests frontend

(Il y a beaucoup d'erreurs dans les tests du EventCreationForm dont je n'ai pas été capable de me débarasser. Elles sont dues à `react-hook-form`, mais même en essayant la solution que les devs proposent, ça ne change rien.)

```bash
cd frontend
npm run test
```

####Tests backend

```bash
cd backend
./mvnw test
```
