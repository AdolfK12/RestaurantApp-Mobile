# based image yang akan digunakan
FROM node:lts-hydrogen

ENV MONGODB=mongodb+srv://adolfkevinb:4xU7inCyTfTjKLqg@cluster0.jrjt0tx.mongodb.net
ENV NODE_ENV=production
ENV PORT=3002

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /User

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]