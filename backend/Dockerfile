FROM node:19.7.0

WORKDIR /contenedor-mean-stack

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# docker build -t nombre-imagen .