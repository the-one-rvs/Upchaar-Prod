#!/bin/sh

echo -n 'API_KEY = "' > .env
echo -n QUl6YVN5RDY4TWV6RjFyTG8tT1pHb2xRQnNweTlWWmFyQTBieGhZCg== | base64 -d | tr -d '\n' >> .env
echo '"' >> .env

mv .env UpchaarTest/virtual_vaidhya/.env

echo -n "MONGO_URI='" >> .env
echo -n "bW9uZ29kYitzcnY6Ly8yMmNzYWltbDA0ODp1dGthcnNoQGNsdXN0ZXIwLmhkMmlmLm1vbmdvZGIubmV0Lz9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHkmYXBwTmFtZT1jbHVzdGVyMA==" | base64 -d | tr -d '\n' >> .env
echo "'" >> .env

echo -n "JWT_SECRET_KEY='" >> .env
echo -n "dXRrYXJzaA==" | base64 -d | tr -d '\n' >> .env
echo "'" >> .env

mv .env UpchaarTest/.env
