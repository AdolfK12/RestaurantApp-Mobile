# based image yang akan digunakan
FROM node:lts-hydrogen


ENV DATABASE_URL=postgresql://postgres:CT1VbjCEiPqszOyP@db.pbqrgtdvwqqnepbqfyuz.supabase.co:5432/postgres
ENV NODE_ENV=production
ENV PORT=3001

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /App

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]