# Tasca S2.03 - MongoDB Structure

## Installation and Execution

1. Download the `docker-compose.yml` file.

2. Run the following command in the directory containing the file:

```bash
docker compose up -d
```

3. Execute the MongoDB script:
```bash
cat n3exercici1.js | docker exec -i tascas203-container mongosh -u root -p joel --authenticationDatabase admin
```
